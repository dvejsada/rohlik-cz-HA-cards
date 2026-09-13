import type { HassEntity } from "../../core/types";

/**
 * Pure, Lit-free helpers for the spending card: mapping level/period to the
 * right sensor's `translation_key`, and reading + shaping the analytics
 * attributes those sensors carry. Kept isolated from Lit so they are cheap
 * to unit test (see test/spending-data.test.ts).
 */

export const LEVELS = ["l0", "l1", "l2", "l3", "items"] as const;

export type Level = (typeof LEVELS)[number];
export type Period = "year" | "all";

const SENSOR_KEYS: Record<Level, Record<Period, string>> = {
  l0: { year: "categories_l0_this_year", all: "categories_l0_all_time" },
  l1: { year: "categories_this_year", all: "categories_all_time" },
  l2: { year: "categories_l2_this_year", all: "categories_l2_all_time" },
  l3: { year: "categories_l3_this_year", all: "categories_l3_all_time" },
  items: { year: "items_this_year", all: "items_all_time" },
};

/** `translation_key` of the sensor backing `level` at `period`. */
export function sensorKeyFor(level: Level, period: Period): string {
  return SENSOR_KEYS[level][period];
}

/**
 * Levels (in `LEVELS` order) whose sensor exists at `period`, per `has`
 * (typically a `translation_key -> entity exists` lookup on the device).
 */
export function availableLevels(has: (key: string) => boolean, period: Period): Level[] {
  return LEVELS.filter((level) => has(sensorKeyFor(level, period)));
}

export interface BreakdownEntry {
  name: string;
  spent: number;
  units: number;
  avgUnitPrice: number;
  id?: string | number;
}

export interface BreakdownResult {
  entries: BreakdownEntry[];
  totalCount: number;
  enrichedOrders?: number;
  totalOrders?: number;
}

export interface YearTotal {
  year: number;
  total: number;
  orderCount: number;
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

/**
 * Reads the `categories` or `items` attribute of a category/items sensor
 * into a sorted (desc by spend), top-`topN` list. Robust to a missing
 * entity, a missing/non-array attribute, and malformed rows (each row is
 * dropped rather than throwing, unless it lacks a usable name or spend).
 */
export function readBreakdown(entity: HassEntity | undefined, topN: number): BreakdownResult {
  const attrs = entity?.attributes ?? {};
  const raw = attrs.categories ?? attrs.items;
  const list: unknown[] = Array.isArray(raw) ? raw : [];

  const entries: BreakdownEntry[] = [];
  for (const row of list) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    const name = typeof r.name === "string" && r.name.trim() !== "" ? r.name : undefined;
    const spent = toNumber(r.spent);
    if (!name || spent === undefined) continue;
    entries.push({
      name,
      spent,
      units: toNumber(r.units) ?? 0,
      avgUnitPrice: toNumber(r.avg_unit_price) ?? 0,
      id: typeof r.id === "string" || typeof r.id === "number" ? r.id : undefined,
    });
  }

  entries.sort((a, b) => b.spent - a.spent);

  const totalCount = toNumber(attrs.total_count) ?? entries.length;
  const enrichedOrders = toNumber(attrs.enriched_orders);
  const totalOrders = toNumber(attrs.total_orders);

  return {
    entries: entries.slice(0, Math.max(0, topN)),
    totalCount,
    enrichedOrders,
    totalOrders,
  };
}

/**
 * Reads the `alltime_spent.by_year` attribute — `{ "2024": { total,
 * order_count }, ... }` — into a list sorted ascending by year. Robust to a
 * missing/malformed attribute or entries.
 */
export function readByYear(attr: unknown): YearTotal[] {
  if (!attr || typeof attr !== "object") return [];

  const out: YearTotal[] = [];
  for (const [key, value] of Object.entries(attr as Record<string, unknown>)) {
    const year = Number(key);
    if (!Number.isFinite(year)) continue;
    if (!value || typeof value !== "object") continue;
    const v = value as Record<string, unknown>;
    out.push({
      year,
      total: toNumber(v.total) ?? 0,
      orderCount: toNumber(v.order_count) ?? 0,
    });
  }

  out.sort((a, b) => a.year - b.year);
  return out;
}

/**
 * Bar widths as percentages relative to the largest `spent` in `entries`
 * (the largest entry gets 100). Empty/all-zero input yields all-zero widths.
 */
export function barWidths(entries: BreakdownEntry[]): number[] {
  const max = entries.reduce((m, e) => Math.max(m, e.spent), 0);
  if (max <= 0) return entries.map(() => 0);
  return entries.map((e) => Math.max(0, Math.min(100, (e.spent / max) * 100)));
}
