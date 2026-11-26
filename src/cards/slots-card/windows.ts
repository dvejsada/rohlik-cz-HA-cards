import type { HassEntity } from "../../core/types";

/** One delivery window from the HA-RohlikCZ `delivery_slots` sensor. */
export interface DeliveryWindow {
  id: number | null;
  /** Delivery day, `YYYY-MM-DD`. */
  date: string;
  start: Date;
  end: Date | null;
  /** Window length: 60 (one hour) or 15 (quarter hour). */
  minutes: number;
  /** Free capacity in percent; 0 = booked out. */
  free: number;
  price: number;
  premium: boolean;
  eco: boolean;
}

/** One delivery day with its windows (both lengths). */
export interface DeliveryDay {
  date: string;
  windows: DeliveryWindow[];
}

function toDate(value: unknown): Date | null {
  if (typeof value !== "string" || !value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

/** Reads the `slots` attribute into windows sorted by start; bad entries are dropped. */
export function readWindows(entity: HassEntity | undefined): DeliveryWindow[] {
  const raw = entity?.attributes?.["slots"];
  if (!Array.isArray(raw)) return [];
  const out: DeliveryWindow[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const item = entry as Record<string, unknown>;
    const start = toDate(item["since"]);
    if (!start) continue;
    const date =
      typeof item["date"] === "string" && item["date"] ? item["date"] : localDay(start);
    out.push({
      id: typeof item["id"] === "number" ? item["id"] : null,
      date,
      start,
      end: toDate(item["till"]),
      minutes: toNumber(item["minutes"], 60) === 15 ? 15 : 60,
      free: Math.max(0, toNumber(item["free"])),
      price: toNumber(item["price"]),
      premium: item["premium"] === true,
      eco: item["eco"] === true,
    });
  }
  out.sort((a, b) => a.start.getTime() - b.start.getTime() || b.minutes - a.minutes);
  return out;
}

/** `YYYY-MM-DD` of a date in local time. */
export function localDay(date: Date): string {
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Groups windows by day, keeping the day order of the data. */
export function groupByDay(windows: DeliveryWindow[]): DeliveryDay[] {
  const days = new Map<string, DeliveryWindow[]>();
  for (const window of windows) {
    const list = days.get(window.date);
    if (list) list.push(window);
    else days.set(window.date, [window]);
  }
  return [...days.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, list]) => ({ date, windows: list }));
}

/** Window lengths present in a day, e.g. `[60, 15]`. */
export function lengthsOf(day: DeliveryDay | undefined): number[] {
  const set = new Set((day?.windows ?? []).map((w) => w.minutes));
  return [60, 15].filter((m) => set.has(m));
}

/** Windows of one length; booked-out ones dropped when `hideBooked`. */
export function windowsFor(
  day: DeliveryDay | undefined,
  minutes: number,
  hideBooked = false,
): DeliveryWindow[] {
  return (day?.windows ?? []).filter(
    (w) => w.minutes === minutes && (!hideBooked || w.free > 0),
  );
}

/** Number of windows of a day that still have room (any length). */
export function freeCount(day: DeliveryDay | undefined, minutes?: number): number {
  return (day?.windows ?? []).filter(
    (w) => w.free > 0 && (minutes === undefined || w.minutes === minutes),
  ).length;
}

/**
 * Picks the day to show: the remembered one if it still exists, otherwise the
 * first day with a free window, otherwise the first day.
 */
export function pickDay(days: DeliveryDay[], remembered: string | null): DeliveryDay | undefined {
  if (remembered) {
    const found = days.find((d) => d.date === remembered);
    if (found) return found;
  }
  return days.find((d) => freeCount(d) > 0) ?? days[0];
}
