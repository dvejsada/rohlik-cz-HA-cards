import { describe, expect, it } from "vitest";
import {
  groupByCategory,
  parseQuickAdd,
  parseTodoItem,
  type CartLine,
} from "../src/cards/cart-card/parse";

describe("parseTodoItem", () => {
  it("parses a normal summary + full description", () => {
    const line = parseTodoItem({
      uid: "item-1",
      summary: "Mléko polotučné 1l (2) - 39.8 Kč",
      description: "Category: Mléčné výrobky\nBrand: Rohlík\nProduct ID: 12345",
    });
    expect(line).toEqual({
      uid: "item-1",
      name: "Mléko polotučné 1l",
      quantity: 2,
      price: 39.8,
      category: "Mléčné výrobky",
      brand: "Rohlík",
      productId: 12345,
    });
  });

  it("uses the LAST (<int>) before ' - ' when the name itself has parentheses", () => {
    const line = parseTodoItem({
      uid: "item-2",
      summary: "Piškoty (BeBe Dobré Ráno) (3) - 89.7 Kč",
    });
    expect(line?.name).toBe("Piškoty (BeBe Dobré Ráno)");
    expect(line?.quantity).toBe(3);
    expect(line?.price).toBe(89.7);
  });

  it("parses a whole-number price like 349.0", () => {
    const line = parseTodoItem({ uid: "item-3", summary: "Víno (1) - 349.0 Kč" });
    expect(line?.price).toBe(349.0);
    expect(line?.quantity).toBe(1);
  });

  it("is lenient about description line order", () => {
    const line = parseTodoItem({
      uid: "item-4",
      summary: "Chleba (1) - 45.0 Kč",
      description: "Product ID: 999\nBrand: Penam\nCategory: Pečivo",
    });
    expect(line).toMatchObject({ category: "Pečivo", brand: "Penam", productId: 999 });
  });

  it("tolerates a missing description entirely", () => {
    const line = parseTodoItem({ uid: "item-5", summary: "Jogurt (4) - 15.6 Kč" });
    expect(line).toEqual({ uid: "item-5", name: "Jogurt", quantity: 4, price: 15.6 });
  });

  it("tolerates a description with only some lines present", () => {
    const line = parseTodoItem({
      uid: "item-6",
      summary: "Máslo (1) - 52.0 Kč",
      description: "Brand: Madeta",
    });
    expect(line?.brand).toBe("Madeta");
    expect(line?.category).toBeUndefined();
    expect(line?.productId).toBeUndefined();
  });

  it("returns null when the summary does not match the expected shape", () => {
    expect(parseTodoItem({ uid: "bad-1", summary: "not a cart line at all" })).toBeNull();
    expect(parseTodoItem({ uid: "bad-2", summary: "" })).toBeNull();
  });

  it("returns null for a malformed price or quantity", () => {
    expect(parseTodoItem({ uid: "bad-3", summary: "Rohlík (x) - 10 Kč" })).toBeNull();
  });

  it("ignores an unparsable Product ID line rather than throwing", () => {
    const line = parseTodoItem({
      uid: "item-7",
      summary: "Vejce (1) - 79.9 Kč",
      description: "Product ID: not-a-number",
    });
    expect(line?.productId).toBeUndefined();
  });
});

describe("parseQuickAdd", () => {
  it("parses a leading integer as the quantity", () => {
    expect(parseQuickAdd("3 Mléko")).toEqual({ quantity: 3, name: "Mléko" });
  });

  it("parses a trailing (<int>) as the quantity", () => {
    expect(parseQuickAdd("Mléko (3)")).toEqual({ quantity: 3, name: "Mléko" });
  });

  it("defaults to quantity 1 for plain text", () => {
    expect(parseQuickAdd("Mléko")).toEqual({ quantity: 1, name: "Mléko" });
  });

  it("defaults to quantity 1 for a multi-word name with no marker", () => {
    expect(parseQuickAdd("Mléko polotučné 1l")).toEqual({
      quantity: 1,
      name: "Mléko polotučné 1l",
    });
  });

  it("trims surrounding whitespace", () => {
    expect(parseQuickAdd("  2   Rohlík  ")).toEqual({ quantity: 2, name: "Rohlík" });
  });

  it("handles an empty string", () => {
    expect(parseQuickAdd("")).toEqual({ quantity: 1, name: "" });
  });
});

describe("groupByCategory", () => {
  const line = (overrides: Partial<CartLine>): CartLine => ({
    uid: overrides.uid ?? "u",
    name: overrides.name ?? "n",
    quantity: overrides.quantity ?? 1,
    price: overrides.price ?? 1,
    ...overrides,
  });

  it("sorts groups alphabetically by category name", () => {
    const lines = [
      line({ uid: "1", category: "Zelenina" }),
      line({ uid: "2", category: "Mléčné výrobky" }),
      line({ uid: "3", category: "Pečivo" }),
    ];
    expect(groupByCategory(lines).map((g) => g.category)).toEqual([
      "Mléčné výrobky",
      "Pečivo",
      "Zelenina",
    ]);
  });

  it("puts the uncategorised bucket last", () => {
    const lines = [
      line({ uid: "1", category: undefined }),
      line({ uid: "2", category: "Nápoje" }),
    ];
    const groups = groupByCategory(lines);
    expect(groups.map((g) => g.category)).toEqual(["Nápoje", undefined]);
    expect(groups[1].lines.map((l) => l.uid)).toEqual(["1"]);
  });

  it("keeps lines of the same category together and preserves their order", () => {
    const lines = [
      line({ uid: "1", category: "Pečivo" }),
      line({ uid: "2", category: "Nápoje" }),
      line({ uid: "3", category: "Pečivo" }),
    ];
    const groups = groupByCategory(lines);
    const pecivo = groups.find((g) => g.category === "Pečivo");
    expect(pecivo?.lines.map((l) => l.uid)).toEqual(["1", "3"]);
  });

  it("omits the uncategorised bucket entirely when every line has a category", () => {
    const lines = [line({ uid: "1", category: "Ovoce" })];
    expect(groupByCategory(lines).some((g) => g.category === undefined)).toBe(false);
  });

  it("returns an empty array for no lines", () => {
    expect(groupByCategory([])).toEqual([]);
  });
});
