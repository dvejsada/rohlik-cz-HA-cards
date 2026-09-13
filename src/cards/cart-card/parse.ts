/**
 * Pure parsing helpers for the shopping cart card. No Lit, no `hass` — kept
 * separate so they're trivial to unit test (see `test/cart-parse.test.ts`).
 */

/** Shape of one `todo/item/list` websocket item, as emitted by HA-RohlikCZ. */
export interface TodoItemInput {
  uid: string;
  summary: string;
  description?: string | null;
  status?: string;
  [key: string]: unknown;
}

/** One parsed cart line, ready for rendering. */
export interface CartLine {
  uid: string;
  name: string;
  quantity: number;
  price: number;
  category?: string;
  brand?: string;
  productId?: number;
}

// Matches "<name> (<qty>) - <price> Kč". The name portion is captured greedily
// so that, when the name itself contains parenthesised text (e.g. a pack
// size), the regex backtracks to the *last* "(<int>)" before " - <price> Kč" —
// which is always the real quantity marker HA-RohlikCZ appends.
const SUMMARY_RE = /^(.+)\s*\((\d+)\)\s*-\s*(\d+(?:[.,]\d+)?)\s*Kč\s*$/;

/**
 * Parses a single `todo` item into a `CartLine`, or `null` when `summary`
 * doesn't match the expected `"<name> (<qty>) - <price> Kč"` shape.
 */
export function parseTodoItem(item: TodoItemInput): CartLine | null {
  if (!item || typeof item.summary !== "string") return null;

  const match = SUMMARY_RE.exec(item.summary.trim());
  if (!match) return null;

  const [, rawName, rawQty, rawPrice] = match;
  const name = rawName.trim();
  const quantity = parseInt(rawQty, 10);
  const price = parseFloat(rawPrice.replace(",", "."));
  if (!name || !Number.isFinite(quantity) || !Number.isFinite(price)) return null;

  const line: CartLine = { uid: item.uid, name, quantity, price };
  const { category, brand, productId } = parseDescription(item.description);
  if (category !== undefined) line.category = category;
  if (brand !== undefined) line.brand = brand;
  if (productId !== undefined) line.productId = productId;
  return line;
}

interface ParsedDescription {
  category?: string;
  brand?: string;
  productId?: number;
}

/**
 * Parses the `"Category: X\nBrand: Y\nProduct ID: 123"` description block.
 * Every line is optional and order-independent; unknown lines are ignored.
 */
function parseDescription(description: string | null | undefined): ParsedDescription {
  const result: ParsedDescription = {};
  if (!description) return result;

  for (const rawLine of description.split(/\r?\n/)) {
    const idx = rawLine.indexOf(":");
    if (idx === -1) continue;
    const key = rawLine
      .slice(0, idx)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const value = rawLine.slice(idx + 1).trim();
    if (!value) continue;

    if (key === "category") result.category = value;
    else if (key === "brand") result.brand = value;
    else if (key === "productid") {
      const id = parseInt(value, 10);
      if (Number.isFinite(id)) result.productId = id;
    }
  }
  return result;
}

/** Result of parsing free-form quick-add text. */
export interface QuickAdd {
  quantity: number;
  name: string;
}

// "<qty> <name>", e.g. "3 Mléko".
const LEADING_QTY_RE = /^(\d+)\s+(.+)$/;
// "<name> (<qty>)", e.g. "Mléko (3)".
const TRAILING_QTY_RE = /^(.+?)\s*\((\d+)\)\s*$/;

/**
 * Parses free-form quick-add text into a quantity + product name. A leading
 * integer followed by a space is treated as the quantity ("3 Mléko"); failing
 * that, a trailing "(<int>)" is treated as the quantity ("Mléko (3)"); with
 * neither, the quantity defaults to 1 and the whole text is the name.
 */
export function parseQuickAdd(text: string): QuickAdd {
  const trimmed = (text ?? "").trim();

  const leading = LEADING_QTY_RE.exec(trimmed);
  if (leading) {
    const name = leading[2].trim();
    if (name) return { quantity: parseInt(leading[1], 10), name };
  }

  const trailing = TRAILING_QTY_RE.exec(trimmed);
  if (trailing) {
    const name = trailing[1].trim();
    if (name) return { quantity: parseInt(trailing[2], 10), name };
  }

  return { quantity: 1, name: trimmed };
}

/** Cart lines grouped by category, for `group_by_category` rendering. */
export interface CategoryGroup {
  /** `undefined` for the "uncategorised" bucket, always sorted last. */
  category?: string;
  lines: CartLine[];
}

/**
 * Groups cart lines by `category`, sorted alphabetically by category name.
 * Lines with no category are collected into one bucket at the end.
 */
export function groupByCategory(lines: CartLine[]): CategoryGroup[] {
  const byCategory = new Map<string, CartLine[]>();
  const uncategorised: CartLine[] = [];

  for (const line of lines) {
    if (!line.category) {
      uncategorised.push(line);
      continue;
    }
    const bucket = byCategory.get(line.category);
    if (bucket) bucket.push(line);
    else byCategory.set(line.category, [line]);
  }

  const groups: CategoryGroup[] = Array.from(byCategory.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, groupLines]) => ({ category, lines: groupLines }));

  if (uncategorised.length) groups.push({ category: undefined, lines: uncategorised });
  return groups;
}
