import { describe, expect, it } from "vitest";
import {
  cartQuantities,
  filterFavourites,
  normalize,
  readFavourites,
} from "../src/cards/favourites-card/data";
import {
  freeCount,
  groupByDay,
  lengthsOf,
  pickDay,
  readWindows,
  windowsFor,
} from "../src/cards/slots-card/windows";
import type { HassEntity } from "../src/core/types";

function entity(attributes: Record<string, unknown>, state = "1"): HassEntity {
  return {
    entity_id: "sensor.test",
    state,
    last_changed: "2030-01-01T10:00:00Z",
    last_updated: "2030-01-01T10:00:00Z",
    attributes,
  };
}

const PRODUCTS = [
  { id: 1, name: "Bio Vollmilch", amount: "1 l", price: 1.49, in_stock: true, image: "https://cdn.example.test/1.jpg" },
  { id: 2, name: "Jogurt natur", amount: "500 g", price: 0.99, in_stock: false, on_sale: true, image: "relative.jpg" },
  { id: "x", name: "Kaputt" },
  { id: 3, name: "" },
  { id: 4, name: "Brot", amount: null, price: "2" },
];

describe("readFavourites", () => {
  it("reads valid products and drops broken ones", () => {
    const list = readFavourites(entity({ products: PRODUCTS }));
    expect(list.map((p) => p.id)).toEqual([1, 2, 4]);
    expect(list[0]).toEqual({
      id: 1, name: "Bio Vollmilch", amount: "1 l", price: 1.49,
      inStock: true, onSale: false, image: "https://cdn.example.test/1.jpg",
    });
    expect(list[1].inStock).toBe(false);
    expect(list[1].onSale).toBe(true);
    expect(list[1].image).toBeNull(); // only http(s) URLs
    expect(list[2].price).toBeNull();
    expect(list[2].amount).toBe("");
  });

  it("returns [] without the attribute", () => {
    expect(readFavourites(undefined)).toEqual([]);
    expect(readFavourites(entity({ products: "nope" }))).toEqual([]);
  });
});

describe("filterFavourites", () => {
  const list = readFavourites(entity({ products: PRODUCTS }));
  it("matches every word, case and accent insensitive", () => {
    expect(filterFavourites(list, "MILCH bio").map((p) => p.id)).toEqual([1]);
    expect(filterFavourites(list, "jögurt").map((p) => p.id)).toEqual([2]);
    expect(filterFavourites(list, "500").map((p) => p.id)).toEqual([2]);
  });
  it("returns everything for an empty query", () => {
    expect(filterFavourites(list, "  ")).toHaveLength(3);
  });
  it("normalize strips accents", () => {
    expect(normalize("  Rohlík  ")).toBe("rohlik");
  });
});

describe("cartQuantities", () => {
  it("sums quantities per product id", () => {
    const map = cartQuantities([
      { uid: "a", name: "A", quantity: 2, price: 1, productId: 1 },
      { uid: "b", name: "B", quantity: 1, price: 1 },
      { uid: "c", name: "A", quantity: 1, price: 1, productId: 1 },
    ]);
    expect(map.get(1)).toBe(3);
    expect(map.size).toBe(1);
  });
});

const SLOTS = [
  { id: 3, date: "2030-01-02", since: "2030-01-02T10:15:01+01:00", till: "2030-01-02T10:30:00+01:00", minutes: 15, free: 0, premium: true },
  { id: 1, date: "2030-01-02", since: "2030-01-02T10:00:00+01:00", till: "2030-01-02T11:00:00+01:00", minutes: 60, free: 40, eco: true },
  { id: 2, date: "2030-01-02", since: "2030-01-02T10:00:01+01:00", till: "2030-01-02T10:15:00+01:00", minutes: 15, free: 20, premium: true },
  { id: 4, date: "2030-01-03", since: "2030-01-03T08:00:00+01:00", till: "2030-01-03T09:00:00+01:00", minutes: 60, free: 0 },
  { id: 5, since: "kaputt" },
];

describe("delivery windows", () => {
  const windows = readWindows(entity({ slots: SLOTS }));

  it("reads and sorts windows, dropping bad ones", () => {
    expect(windows.map((w) => w.id)).toEqual([1, 2, 3, 4]);
    expect(windows[0].eco).toBe(true);
    expect(windows[1].premium).toBe(true);
  });

  it("groups by day and finds the lengths", () => {
    const days = groupByDay(windows);
    expect(days.map((d) => d.date)).toEqual(["2030-01-02", "2030-01-03"]);
    expect(lengthsOf(days[0])).toEqual([60, 15]);
    expect(lengthsOf(days[1])).toEqual([60]);
  });

  it("filters by length and booked state", () => {
    const [day] = groupByDay(windows);
    expect(windowsFor(day, 15).map((w) => w.id)).toEqual([2, 3]);
    expect(windowsFor(day, 15, true).map((w) => w.id)).toEqual([2]);
    expect(freeCount(day)).toBe(2);
    expect(freeCount(day, 60)).toBe(1);
  });

  it("picks the remembered day, else the first with room", () => {
    const days = groupByDay(windows);
    expect(pickDay(days, "2030-01-03")?.date).toBe("2030-01-03");
    expect(pickDay(days, "1999-01-01")?.date).toBe("2030-01-02");
    const allBooked = groupByDay(readWindows(entity({ slots: [SLOTS[0], SLOTS[3]] })));
    expect(pickDay(allBooked, null)?.date).toBe("2030-01-02");
    expect(pickDay([], null)).toBeUndefined();
  });

  it("returns [] without the attribute", () => {
    expect(readWindows(undefined)).toEqual([]);
  });
});
