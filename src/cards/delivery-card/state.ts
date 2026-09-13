/**
 * Pure state machine for `rohlik-delivery-card` / `rohlik-delivery-badge`.
 *
 * No Lit, no `hass`, no `Date.now()` — every time-dependent decision takes
 * `now` as an explicit argument so it can be unit tested with fixed clocks.
 * All locale-aware formatting (relative day words, `Intl` time/money) stays
 * in the card/badge, which has access to `hass.locale`; this module only
 * decides *which* state applies and hands back the raw data (plus a couple
 * of locale-independent derived values: `progress` and `windowLabel`).
 */

export type DeliveryStateKind = "arriving" | "ordered" | "delivered" | "none";

/** A "delivered" state is only shown for this long after the order ended. */
export const DELIVERED_WINDOW_MS = 6 * 60 * 60 * 1000;

/**
 * Shape of the `order_data` attribute on `binary_sensor.is_ordered` (see
 * docs/DESIGN.md — Entity contract). Only the fields this card reads.
 */
export interface DeliveryOrderData {
  id?: string | number;
  orderTime?: string;
  itemsCount?: number;
  priceComposition?: { total?: { amount?: number } };
  deliverySlot?: { since?: string; till?: string };
  status?: string;
  [key: string]: unknown;
}

/**
 * A locally-remembered "this order just finished" marker — `is_ordered`
 * itself has no "delivered" state, and `last_order`'s timestamp is the
 * order's *placement* time, not its delivery time, so it can't drive the
 * "delivered" state on its own (see `src/cards/delivery-card/memory.ts`,
 * which builds this from watching `is_ordered` flip off).
 */
export interface RecentDeliveryMemory {
  orderId: string | number | null;
  till: Date | null;
  endedAt: Date;
}

/**
 * Plain-data input for `computeDeliveryState`, built by the card from its
 * entity getters. Every timestamp is a pre-parsed `Date | null` (see
 * `core/format.ts#parseTs`) — this module never touches raw entity state
 * strings.
 */
export interface DeliveryStateInput {
  isOrdered: boolean;
  since: Date | null;
  till: Date | null;
  eta: Date | null;
  orderData?: DeliveryOrderData | null;
  announcementText?: string | null;
  announcementExtra?: string | null;
  announcementUpdatedAt: Date | null;
  /** `last_order`'s state/attributes — order *placement* time, kept only for the order summary row (item count / price). Does not drive the "delivered" state or its headline; see `recentDelivery` for that. */
  lastOrderAt: Date | null;
  lastOrderItems?: number | null;
  lastOrderPrice?: number | null;
  firstDeliveryText?: string | null;
  isReserved: boolean;
  isExpressAvailable: boolean;
  /** From `memory.ts`: the most recent order to finish (its `is_ordered` flip off), if any is remembered. Drives the "delivered" state. */
  recentDelivery?: RecentDeliveryMemory | null;
}

export interface DeliveryView {
  state: DeliveryStateKind;
  since: Date | null;
  till: Date | null;
  eta: Date | null;
  /** 0..1 position of the ETA (or `now`, if no ETA) between since/till. Only set while `arriving`. */
  progress: number | null;
  /** Locale-independent "HH:MM–HH:MM" window label, when since/till are both known. */
  windowLabel: string | null;
  orderId: string | number | null;
  /** Item count for the order summary row: `order_data.itemsCount` normally, `last_order`'s `Items` once delivered. */
  summaryItems: number | null;
  /** Price for the order summary row: `order_data` total normally, `last_order`'s `Price` once delivered. */
  summaryPrice: number | null;
  announcementText: string | null;
  announcementExtra: string | null;
  announcementUpdatedAt: Date | null;
  lastOrderAt: Date | null;
  firstDeliveryText: string | null;
  isReserved: boolean;
  isExpressAvailable: boolean;
  /** Delivery-window-end time to show as the "delivered" headline: `recentDelivery.till`, falling back to `recentDelivery.endedAt`. Null outside the "delivered" state (and when nothing is remembered). */
  deliveredAt: Date | null;
}

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

/** "HH:MM" in the timestamp's own local time — no `Intl`, so it's identical in every locale (matches `formatTime`'s `hour12: false`). */
function clock(date: Date): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function resolveState(input: DeliveryStateInput, now: Date): DeliveryStateKind {
  if (input.isOrdered) {
    if (input.since && now.getTime() >= input.since.getTime()) return "arriving";
    return "ordered";
  }
  const recent = input.recentDelivery;
  if (recent) {
    const tillOrEnded = recent.till ?? recent.endedAt;
    const ref = Math.max(tillOrEnded.getTime(), recent.endedAt.getTime());
    const age = now.getTime() - ref;
    if (age <= DELIVERED_WINDOW_MS) return "delivered";
  }
  return "none";
}

export function computeDeliveryState(input: DeliveryStateInput, now: Date): DeliveryView {
  const state = resolveState(input, now);

  let windowLabel: string | null = null;
  if (input.since && input.till) {
    windowLabel = `${clock(input.since)}–${clock(input.till)}`;
  }

  let progress: number | null = null;
  if (
    state === "arriving" &&
    input.since &&
    input.till &&
    input.till.getTime() > input.since.getTime()
  ) {
    const point = input.eta ?? now;
    progress = clamp01(
      (point.getTime() - input.since.getTime()) / (input.till.getTime() - input.since.getTime()),
    );
  }

  const summaryItems =
    state === "delivered" ? (input.lastOrderItems ?? null) : (input.orderData?.itemsCount ?? null);
  const summaryPrice =
    state === "delivered"
      ? (input.lastOrderPrice ?? null)
      : (input.orderData?.priceComposition?.total?.amount ?? null);

  const deliveredAt = input.recentDelivery
    ? (input.recentDelivery.till ?? input.recentDelivery.endedAt)
    : null;

  return {
    state,
    since: input.since,
    till: input.till,
    eta: input.eta,
    progress,
    windowLabel,
    orderId: input.orderData?.id ?? null,
    summaryItems,
    summaryPrice,
    announcementText: input.announcementText ?? null,
    announcementExtra: input.announcementExtra ?? null,
    announcementUpdatedAt: input.announcementUpdatedAt ?? null,
    lastOrderAt: input.lastOrderAt ?? null,
    firstDeliveryText: input.firstDeliveryText ?? null,
    isReserved: input.isReserved,
    isExpressAvailable: input.isExpressAvailable,
    deliveredAt,
  };
}
