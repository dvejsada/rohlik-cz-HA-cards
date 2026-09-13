import type { HassEntity } from "../../core/types";

/**
 * Pure, Lit-free helpers for the spending card: mapping level/period to the
 * right sensor's `translation_key`, and reading + shaping the analytics
 * attributes those sensors carry. Kept isolated from Lit so they are cheap
 * to unit test (see test/spending-data.test.ts).
 */

export const LEVELS = ["l0", "l1", "l2", "l3", "items"] as const;

export type Level = (typeof LEVELS)[number];

/** UI period: `month` has no breakdown sensors of its own — see `breakdownPeriodFor`. */
export const PERIODS = ["month", "year", "all"] as const;
export type Period = (typeof PERIODS)[number];

export const CHART_MODES = ["auto", "years", "months", "none"] as const;
export type ChartMode = (typeof CHART_MODES)[number];

/** Period a category/items breakdown sensor actually exists for. */
export type BreakdownPeriod = "year" | "all";

/** The integration has no per-month breakdown sensors, so `month` borrows `year`'s. */
export function breakdownPeriodFor(period: Period): BreakdownPeriod {
  return period === "all" ? "all" : "year";
}

const SENSOR_KEYS: Record<Level, Record<BreakdownPeriod, string>> = {
  l0: { year: "categories_l0_this_year", all: "categories_l0_all_time" },
  l1: { year: "categories_this_year", all: "categories_all_time" },
  l2: { year: "categories_l2_this_year", all: "categories_l2_all_time" },
  l3: { year: "categories_l3_this_year", all: "categories_l3_all_time" },
  items: { year: "items_this_year", all: "items_all_time" },
};

/** `translation_key` of the sensor backing `level` at `period`. */
export function sensorKeyFor(level: Level, period: BreakdownPeriod): string {
  return SENSOR_KEYS[level][period];
}

/**
 * Levels (in `LEVELS` order) whose sensor exists at `period`, per `has`
 * (typically a `translation_key -> entity exists` lookup on the device).
 */
export function availableLevels(has: (key: string) => boolean, period: BreakdownPeriod): Level[] {
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

export interface MonthlyStat {
  month: Date;
  total: number;
}

/**
 * Reads a `recorder/statistics_during_period` response — `{ [entityId]:
 * [{ start, end, max }] }` — into a `{ month, total }[]` for `entityId`,
 * using each row's `max` as that month's total (the `monthly_spent` sensor
 * is TOTAL state_class: it climbs through the month and resets on the 1st,
 * so the month's max *is* its final total). Tolerant of `start` being a
 * number (ms epoch, as recorder sends by default) or an ISO string; rows
 * with an unparsable `start` or a non-numeric `max` are dropped rather than
 * throwing. Result is sorted ascending by month.
 */
export function readMonthlyStats(response: unknown, entityId: string): MonthlyStat[] {
  if (!response || typeof response !== "object") return [];
  const rows = (response as Record<string, unknown>)[entityId];
  if (!Array.isArray(rows)) return [];

  const out: MonthlyStat[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    const startRaw = r.start;
    const month =
      typeof startRaw === "number" || typeof startRaw === "string" ? new Date(startRaw) : null;
    if (!month || Number.isNaN(month.getTime())) continue;
    const total = toNumber(r.max);
    if (total === undefined) continue;
    out.push({ month, total });
  }

  out.sort((a, b) => a.month.getTime() - b.month.getTime());
  return out;
}

export interface MonthlyChartPoint {
  month: Date;
  total: number;
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

/**
 * Builds the last 12 months (oldest first, ending on `now`'s month) from
 * `stats`, filling any month `stats` has no row for with 0, and overriding
 * the current month's total with `currentMonthTotal` (the live
 * `monthly_spent` state) since the statistics API only sees the max as of
 * its last recorded hourly rollup, not the current running total.
 */
export function monthlyChartSeries(
  stats: MonthlyStat[],
  now: Date,
  currentMonthTotal?: number,
): MonthlyChartPoint[] {
  const byMonth = new Map<string, number>();
  for (const stat of stats) {
    byMonth.set(monthKey(stat.month), stat.total);
  }

  const points: MonthlyChartPoint[] = [];
  for (let i = 11; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const isCurrent = i === 0;
    const total =
      isCurrent && currentMonthTotal !== undefined && Number.isFinite(currentMonthTotal)
        ? currentMonthTotal
        : (byMonth.get(monthKey(month)) ?? 0);
    points.push({ month, total });
  }
  return points;
}
