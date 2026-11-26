import type { HassEntity } from "../../core/types";
import type { CartLine } from "../cart-card/parse";

/** One favourite product as exposed by the HA-RohlikCZ `favourites` sensor. */
export interface FavouriteProduct {
  id: number;
  name: string;
  amount: string;
  price: number | null;
  inStock: boolean;
  onSale: boolean;
  image: string | null;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/**
 * Reads the `products` attribute of the favourites sensor. Entries without a
 * numeric `id` or a name are dropped; the shop's order is kept.
 */
export function readFavourites(entity: HassEntity | undefined): FavouriteProduct[] {
  const raw = entity?.attributes?.["products"];
  if (!Array.isArray(raw)) return [];
  const out: FavouriteProduct[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const item = entry as Record<string, unknown>;
    const id = num(item["id"]);
    const name = text(item["name"]);
    if (id === null || !name) continue;
    const image = text(item["image"]);
    out.push({
      id,
      name,
      amount: text(item["amount"]),
      price: num(item["price"]),
      inStock: item["in_stock"] !== false,
      onSale: item["on_sale"] === true,
      image: /^https?:\/\//i.test(image) ? image : null,
    });
  }
  return out;
}

/** Lower-cases and strips accents, so "Jogurt" finds "Jögurt" and vice versa. */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Keeps the favourites whose name or amount contains every word of `query`. */
export function filterFavourites(list: FavouriteProduct[], query: string): FavouriteProduct[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return list;
  return list.filter((item) => {
    const haystack = normalize(`${item.name} ${item.amount}`);
    return words.every((word) => haystack.includes(word));
  });
}

/** Product ID -> quantity currently in the cart. */
export function cartQuantities(lines: CartLine[]): Map<number, number> {
  const map = new Map<number, number>();
  for (const line of lines) {
    if (line.productId === undefined) continue;
    map.set(line.productId, (map.get(line.productId) ?? 0) + line.quantity);
  }
  return map;
}
