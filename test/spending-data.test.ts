import { describe, expect, it } from "vitest";
import {
  LEVELS,
  availableLevels,
  barWidths,
  breakdownPeriodFor,
  monthlyChartSeries,
  readBreakdown,
  readByYear,
  readMonthlyStats,
  sensorKeyFor,
} from "../src/cards/spending-card/data";
import type { HassEntity } from "../src/core/types";

function makeEntity(attributes: Record<string, unknown>, state = "123.4"): HassEntity {
  return {
    entity_id: "sensor.test",
    state,
    last_changed: "2026-09-13T00:00:00Z",
    last_updated: "2026-09-13T00:00:00Z",
    attributes,
  };
}

describe("sensorKeyFor", () => {
  it("maps every level x period to the right translation_key", () => {
    expect(sensorKeyFor("l0", "year")).toBe("categories_l0_this_year");
    expect(sensorKeyFor("l0", "all")).toBe("categories_l0_all_time");
    expect(sensorKeyFor("l1", "year")).toBe("categories_this_year");
    expect(sensorKeyFor("l1", "all")).toBe("categories_all_time");
    expect(sensorKeyFor("l2", "year")).toBe("categories_l2_this_year");
    expect(sensorKeyFor("l2", "all")).toBe("categories_l2_all_time");
    expect(sensorKeyFor("l3", "year")).toBe("categories_l3_this_year");
    expect(sensorKeyFor("l3", "all")).toBe("categories_l3_all_time");
    expect(sensorKeyFor("items", "year")).toBe("items_this_year");
    expect(sensorKeyFor("items", "all")).toBe("items_all_time");
  });
});

describe("availableLevels", () => {
  it("returns only levels whose sensor key is reported as existing, in LEVELS order", () => {
    const existing = new Set(["categories_this_year", "items_this_year"]);
    const result = availableLevels((key) => existing.has(key), "year");
    expect(result).toEqual(["l1", "items"]);
  });

  it("returns an empty array when nothing exists", () => {
    expect(availableLevels(() => false, "all")).toEqual([]);
  });

  it("returns all levels when every sensor exists", () => {
    expect(availableLevels(() => true, "year")).toEqual([...LEVELS]);
  });
});

describe("readBreakdown", () => {
  it("returns an empty result for an undefined entity", () => {
    const result = readBreakdown(undefined, 10);
    expect(result).toEqual({ entries: [], totalCount: 0, enrichedOrders: undefined, totalOrders: undefined });
  });

  it("reads, sorts desc by spent, and caps to topN", () => {
    const entity = makeEntity({
      total_count: 3,
      categories: [
        { name: "Dairy", spent: 200, units: 10, avg_unit_price: 20 },
        { name: "Bakery", spent: 500, units: 5, avg_unit_price: 100 },
        { name: "Drinks", spent: 350, units: 7, avg_unit_price: 50 },
      ],
    });

    const result = readBreakdown(entity, 2);
    expect(result.entries.map((e) => e.name)).toEqual(["Bakery", "Drinks"]);
    expect(result.entries[0]).toEqual({
      name: "Bakery",
      spent: 500,
      units: 5,
      avgUnitPrice: 100,
      id: undefined,
    });
    expect(result.totalCount).toBe(3);
  });

  it("falls back to the items attribute when categories is absent", () => {
    const entity = makeEntity({
      items: [{ name: "Milk", spent: 120, units: 4, avg_unit_price: 30, id: "p1" }],
    });
    const result = readBreakdown(entity, 10);
    expect(result.entries).toEqual([
      { name: "Milk", spent: 120, units: 4, avgUnitPrice: 30, id: "p1" },
    ]);
  });

  it("drops malformed rows instead of throwing", () => {
    const entity = makeEntity({
      categories: [
        null,
        "not an object",
        { name: "Missing spent" },
        { spent: 42 },
        { name: "OK", spent: 42, units: 1, avg_unit_price: 42 },
        42,
      ],
    });
    const result = readBreakdown(entity, 10);
    expect(result.entries).toEqual([{ name: "OK", spent: 42, units: 1, avgUnitPrice: 42, id: undefined }]);
  });

  it("is robust to a non-array categories attribute", () => {
    const entity = makeEntity({ categories: { not: "an array" } });
    const result = readBreakdown(entity, 10);
    expect(result.entries).toEqual([]);
    expect(result.totalCount).toBe(0);
  });

  it("uses total_count and enriched/total order counts when present", () => {
    const entity = makeEntity({
      total_count: 42,
      enriched_orders: 5,
      total_orders: 8,
      categories: [{ name: "A", spent: 1, units: 1, avg_unit_price: 1 }],
    });
    const result = readBreakdown(entity, 10);
    expect(result.totalCount).toBe(42);
    expect(result.enrichedOrders).toBe(5);
    expect(result.totalOrders).toBe(8);
  });

  it("defaults totalCount to the parsed entry count when total_count is missing", () => {
    const entity = makeEntity({
      categories: [
        { name: "A", spent: 1, units: 1, avg_unit_price: 1 },
        { name: "B", spent: 2, units: 1, avg_unit_price: 2 },
      ],
    });
    expect(readBreakdown(entity, 10).totalCount).toBe(2);
  });
});

describe("readByYear", () => {
  it("returns an empty array for missing/malformed input", () => {
    expect(readByYear(undefined)).toEqual([]);
    expect(readByYear(null)).toEqual([]);
    expect(readByYear("nope")).toEqual([]);
    expect(readByYear(42)).toEqual([]);
  });

  it("parses a by_year map into a year-ascending list", () => {
    const result = readByYear({
      "2025": { total: 5000, order_count: 12 },
      "2023": { total: 1000, order_count: 3 },
      "2024": { total: 3000, order_count: 8 },
    });
    expect(result).toEqual([
      { year: 2023, total: 1000, orderCount: 3 },
      { year: 2024, total: 3000, orderCount: 8 },
      { year: 2025, total: 5000, orderCount: 12 },
    ]);
  });

  it("skips non-numeric keys and malformed entries", () => {
    const result = readByYear({
      "2024": { total: 100, order_count: 1 },
      not_a_year: { total: 999, order_count: 99 },
      "2025": "not an object",
    });
    expect(result).toEqual([{ year: 2024, total: 100, orderCount: 1 }]);
  });
});

describe("breakdownPeriodFor", () => {
  it("maps month and year to year, and all to all", () => {
    expect(breakdownPeriodFor("month")).toBe("year");
    expect(breakdownPeriodFor("year")).toBe("year");
    expect(breakdownPeriodFor("all")).toBe("all");
  });
});

describe("readMonthlyStats", () => {
  const entityId = "sensor.dan_vejsada_monthly_spent";

  it("returns an empty array for missing/malformed responses", () => {
    expect(readMonthlyStats(undefined, entityId)).toEqual([]);
    expect(readMonthlyStats(null, entityId)).toEqual([]);
    expect(readMonthlyStats({}, entityId)).toEqual([]);
    expect(readMonthlyStats({ [entityId]: "not an array" }, entityId)).toEqual([]);
  });

  it("reads a numeric (ms epoch) start", () => {
    const ms = Date.UTC(2026, 5, 1); // 2026-06-01
    const result = readMonthlyStats({ [entityId]: [{ start: ms, end: ms, max: 1234.5 }] }, entityId);
    expect(result).toEqual([{ month: new Date(ms), total: 1234.5 }]);
  });

  it("reads an ISO string start", () => {
    const result = readMonthlyStats(
      { [entityId]: [{ start: "2026-07-01T00:00:00Z", end: "2026-08-01T00:00:00Z", max: "987.6" }] },
      entityId,
    );
    expect(result).toEqual([{ month: new Date("2026-07-01T00:00:00Z"), total: 987.6 }]);
  });

  it("drops rows with an unparsable start or non-numeric max, sorts ascending by month", () => {
    const result = readMonthlyStats(
      {
        [entityId]: [
          { start: "2026-03-01T00:00:00Z", max: 300 },
          { start: "not a date", max: 999 },
          { start: "2026-01-01T00:00:00Z", max: null },
          { start: "2026-02-01T00:00:00Z", max: 200 },
        ],
      },
      entityId,
    );
    expect(result).toEqual([
      { month: new Date("2026-02-01T00:00:00Z"), total: 200 },
      { month: new Date("2026-03-01T00:00:00Z"), total: 300 },
    ]);
  });

  it("ignores rows for other entity_ids", () => {
    const result = readMonthlyStats(
      { "sensor.other": [{ start: "2026-01-01T00:00:00Z", max: 42 }] },
      entityId,
    );
    expect(result).toEqual([]);
  });
});

describe("monthlyChartSeries", () => {
  it("returns 12 months ending on `now`'s month, filling gaps with 0", () => {
    const now = new Date(2026, 8, 13); // 2026-09-13
    const stats = [
      { month: new Date(2026, 6, 1), total: 100 }, // July
      { month: new Date(2026, 7, 1), total: 200 }, // August
    ];
    const series = monthlyChartSeries(stats, now, undefined);
    expect(series).toHaveLength(12);
    expect(series[0].month).toEqual(new Date(2025, 9, 1)); // 11 months before Sept 2026 => Oct 2025
    expect(series[series.length - 1].month).toEqual(new Date(2026, 8, 1));
    expect(series.find((p) => p.month.getTime() === new Date(2026, 6, 1).getTime())?.total).toBe(100);
    expect(series.find((p) => p.month.getTime() === new Date(2026, 7, 1).getTime())?.total).toBe(200);
    // Every other month (including the current one, with no live override
    // given here) has no matching stat row -> filled with 0.
    expect(series.filter((p) => p.total === 0)).toHaveLength(10);
  });

  it("overrides the current month's total with the live sensor state", () => {
    const now = new Date(2026, 8, 13);
    const stats = [{ month: new Date(2026, 8, 1), total: 50 }]; // stale/partial statistics row
    const series = monthlyChartSeries(stats, now, 999.9);
    expect(series[series.length - 1]).toEqual({ month: new Date(2026, 8, 1), total: 999.9 });
  });

  it("falls back to the statistics row when no live total is given", () => {
    const now = new Date(2026, 8, 13);
    const stats = [{ month: new Date(2026, 8, 1), total: 50 }];
    const series = monthlyChartSeries(stats, now, undefined);
    expect(series[series.length - 1].total).toBe(50);
  });

  it("falls back to 0 for the current month when there is neither a live total nor a stats row", () => {
    const now = new Date(2026, 8, 13);
    const series = monthlyChartSeries([], now, undefined);
    expect(series[series.length - 1]).toEqual({ month: new Date(2026, 8, 1), total: 0 });
  });
});

describe("barWidths", () => {
  it("scales the largest entry to 100 and others proportionally", () => {
    const entries = [
      { name: "A", spent: 50, units: 0, avgUnitPrice: 0 },
      { name: "B", spent: 100, units: 0, avgUnitPrice: 0 },
      { name: "C", spent: 25, units: 0, avgUnitPrice: 0 },
    ];
    expect(barWidths(entries)).toEqual([50, 100, 25]);
  });

  it("returns an empty array for no entries", () => {
    expect(barWidths([])).toEqual([]);
  });

  it("returns all zeros when every entry has zero (or negative) spend", () => {
    const entries = [
      { name: "A", spent: 0, units: 0, avgUnitPrice: 0 },
      { name: "B", spent: 0, units: 0, avgUnitPrice: 0 },
    ];
    expect(barWidths(entries)).toEqual([0, 0]);
  });
});
