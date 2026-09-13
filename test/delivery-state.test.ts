import { describe, expect, it } from "vitest";
import {
  computeDeliveryState,
  findReservedUntil,
  DELIVERED_WINDOW_MS,
  type DeliveryStateInput,
  type RecentDeliveryMemory,
} from "../src/cards/delivery-card/state";

const NOW = new Date("2026-09-13T12:00:00Z");

/** A fully-populated "no order" baseline — override only what a test cares about. */
function baseInput(overrides: Partial<DeliveryStateInput> = {}): DeliveryStateInput {
  return {
    isOrdered: false,
    since: null,
    till: null,
    eta: null,
    orderData: null,
    announcementText: null,
    announcementExtra: null,
    announcementUpdatedAt: null,
    lastOrderAt: null,
    lastOrderItems: null,
    lastOrderPrice: null,
    firstDeliveryText: null,
    isReserved: false,
    isExpressAvailable: false,
    recentDelivery: null,
    ...overrides,
  };
}

function memory(overrides: Partial<RecentDeliveryMemory> = {}): RecentDeliveryMemory {
  return { orderId: 1, till: null, endedAt: NOW, ...overrides };
}

describe("computeDeliveryState — state priority", () => {
  it("is 'arriving' when ordered and now is exactly at the window start", () => {
    const input = baseInput({ isOrdered: true, since: NOW, till: new Date("2026-09-13T14:00:00Z") });
    expect(computeDeliveryState(input, NOW).state).toBe("arriving");
  });

  it("is 'arriving' when ordered and now is past the window start", () => {
    const input = baseInput({
      isOrdered: true,
      since: new Date("2026-09-13T11:00:00Z"),
      till: new Date("2026-09-13T13:00:00Z"),
    });
    expect(computeDeliveryState(input, NOW).state).toBe("arriving");
  });

  it("is 'ordered' when ordered and now is before the window start", () => {
    const input = baseInput({
      isOrdered: true,
      since: new Date("2026-09-13T17:00:00Z"),
      till: new Date("2026-09-13T19:00:00Z"),
    });
    expect(computeDeliveryState(input, NOW).state).toBe("ordered");
  });

  it("is 'ordered' when ordered but the window start is unknown", () => {
    const input = baseInput({ isOrdered: true, since: null, till: null });
    expect(computeDeliveryState(input, NOW).state).toBe("ordered");
  });

  it("is 'delivered' when not ordered and the order ended just now (no till known)", () => {
    const input = baseInput({ isOrdered: false, recentDelivery: memory({ endedAt: NOW }) });
    expect(computeDeliveryState(input, NOW).state).toBe("delivered");
  });

  it("is 'delivered' right at the 6h boundary from endedAt (inclusive)", () => {
    const endedAt = new Date(NOW.getTime() - DELIVERED_WINDOW_MS);
    const input = baseInput({ isOrdered: false, recentDelivery: memory({ endedAt }) });
    expect(computeDeliveryState(input, NOW).state).toBe("delivered");
  });

  it("is 'none' just past the 6h boundary from endedAt", () => {
    const endedAt = new Date(NOW.getTime() - DELIVERED_WINDOW_MS - 1000);
    const input = baseInput({ isOrdered: false, recentDelivery: memory({ endedAt }) });
    expect(computeDeliveryState(input, NOW).state).toBe("none");
  });

  it("is 'delivered' using `till` (not `endedAt`) when till is the later of the two", () => {
    // Order placed and ended long ago, but its delivery window only just closed.
    const endedAt = new Date(NOW.getTime() - DELIVERED_WINDOW_MS - 1000);
    const till = new Date(NOW.getTime() - 1000);
    const input = baseInput({ isOrdered: false, recentDelivery: memory({ endedAt, till }) });
    expect(computeDeliveryState(input, NOW).state).toBe("delivered");
  });

  it("is 'none' when both till and endedAt are past the 6h window", () => {
    const endedAt = new Date(NOW.getTime() - DELIVERED_WINDOW_MS - 1000);
    const till = new Date(NOW.getTime() - DELIVERED_WINDOW_MS - 1000);
    const input = baseInput({ isOrdered: false, recentDelivery: memory({ endedAt, till }) });
    expect(computeDeliveryState(input, NOW).state).toBe("none");
  });

  it("is 'none' with no order and nothing remembered", () => {
    expect(computeDeliveryState(baseInput(), NOW).state).toBe("none");
  });

  it("is 'none' when not ordered even if `last_order` was placed recently (placement time doesn't count)", () => {
    // Regression: last_order.state is the order *placement* timestamp, not
    // the delivery timestamp — it must never drive the "delivered" state.
    const input = baseInput({ isOrdered: false, lastOrderAt: NOW, recentDelivery: null });
    expect(computeDeliveryState(input, NOW).state).toBe("none");
  });

  it("prefers 'arriving' over 'delivered' when somehow both conditions could apply", () => {
    // isOrdered=true always short-circuits before the recentDelivery check.
    const input = baseInput({
      isOrdered: true,
      since: new Date("2026-09-13T11:00:00Z"),
      recentDelivery: memory({ endedAt: new Date("2026-09-13T11:55:00Z") }),
    });
    expect(computeDeliveryState(input, NOW).state).toBe("arriving");
  });
});

describe("computeDeliveryState — deliveredAt", () => {
  it("is null outside the 'delivered' state", () => {
    expect(computeDeliveryState(baseInput(), NOW).deliveredAt).toBeNull();
  });

  it("uses recentDelivery.till when known", () => {
    const till = new Date("2026-09-13T09:00:00Z");
    const view = computeDeliveryState(baseInput({ recentDelivery: memory({ till }) }), NOW);
    expect(view.deliveredAt).toBe(till);
  });

  it("falls back to recentDelivery.endedAt when till is unknown", () => {
    const endedAt = new Date("2026-09-13T09:30:00Z");
    const view = computeDeliveryState(baseInput({ recentDelivery: memory({ till: null, endedAt }) }), NOW);
    expect(view.deliveredAt).toBe(endedAt);
  });
});

describe("computeDeliveryState — progress", () => {
  const since = new Date("2026-09-13T11:00:00Z");
  const till = new Date("2026-09-13T13:00:00Z");

  it("is null outside the 'arriving' state", () => {
    const ordered = baseInput({ isOrdered: true, since: new Date("2026-09-14T11:00:00Z"), till });
    expect(computeDeliveryState(ordered, NOW).progress).toBeNull();
    expect(computeDeliveryState(baseInput(), NOW).progress).toBeNull();
  });

  it("is null when since/till are missing even while arriving", () => {
    const input = baseInput({ isOrdered: true, since: NOW, till: null });
    expect(computeDeliveryState(input, NOW).progress).toBeNull();
  });

  it("uses the ETA position between since and till when an ETA is known", () => {
    // since=11:00, till=13:00, eta=11:30 -> 25% through the window.
    const input = baseInput({ isOrdered: true, since, till, eta: new Date("2026-09-13T11:30:00Z") });
    expect(computeDeliveryState(input, NOW).progress).toBeCloseTo(0.25);
  });

  it("falls back to 'now' when no ETA is known", () => {
    // since=11:00, till=13:00, now=12:00 -> 50% through the window.
    const input = baseInput({ isOrdered: true, since, till, eta: null });
    expect(computeDeliveryState(input, NOW).progress).toBeCloseTo(0.5);
  });

  it("clamps to 1 when the ETA is past the window end", () => {
    const input = baseInput({ isOrdered: true, since, till, eta: new Date("2026-09-13T15:00:00Z") });
    expect(computeDeliveryState(input, NOW).progress).toBe(1);
  });

  it("clamps to 0 when the ETA is before the window start", () => {
    const input = baseInput({ isOrdered: true, since, till, eta: new Date("2026-09-13T09:00:00Z") });
    expect(computeDeliveryState(input, NOW).progress).toBe(0);
  });

  it("is null when till does not come after since (degenerate window)", () => {
    const input = baseInput({ isOrdered: true, since: till, till: since });
    expect(computeDeliveryState(input, NOW).progress).toBeNull();
  });
});

describe("computeDeliveryState — windowLabel", () => {
  it("formats since/till as a locale-independent HH:MM–HH:MM range", () => {
    const since = new Date(2026, 8, 13, 17, 0);
    const till = new Date(2026, 8, 13, 19, 5);
    const view = computeDeliveryState(baseInput({ since, till }), NOW);
    expect(view.windowLabel).toBe("17:00–19:05");
  });

  it("pads single-digit hours and minutes", () => {
    const since = new Date(2026, 8, 13, 8, 0);
    const till = new Date(2026, 8, 13, 8, 5);
    const view = computeDeliveryState(baseInput({ since, till }), NOW);
    expect(view.windowLabel).toBe("08:00–08:05");
  });

  it("is null when either side of the window is missing", () => {
    expect(computeDeliveryState(baseInput({ since: NOW, till: null }), NOW).windowLabel).toBeNull();
    expect(computeDeliveryState(baseInput({ since: null, till: NOW }), NOW).windowLabel).toBeNull();
    expect(computeDeliveryState(baseInput(), NOW).windowLabel).toBeNull();
  });
});

describe("computeDeliveryState — order summary passthrough", () => {
  it("reads items/price from order_data while arriving or ordered", () => {
    const orderData = {
      id: 123456789,
      itemsCount: 23,
      priceComposition: { total: { amount: 1486 } },
    };
    const ordered = computeDeliveryState(
      baseInput({ isOrdered: true, since: new Date("2026-09-14T00:00:00Z"), orderData }),
      NOW,
    );
    expect(ordered.orderId).toBe(123456789);
    expect(ordered.summaryItems).toBe(23);
    expect(ordered.summaryPrice).toBe(1486);

    const arriving = computeDeliveryState(
      baseInput({ isOrdered: true, since: NOW, orderData }),
      NOW,
    );
    expect(arriving.summaryItems).toBe(23);
    expect(arriving.summaryPrice).toBe(1486);
  });

  it("reads items/price from last_order attributes once delivered", () => {
    const view = computeDeliveryState(
      baseInput({
        isOrdered: false,
        recentDelivery: memory({ endedAt: NOW }),
        lastOrderItems: 5,
        lastOrderPrice: 399.5,
        // order_data should be ignored in the delivered state even if present (stale data).
        orderData: { itemsCount: 999, priceComposition: { total: { amount: 999 } } },
      }),
      NOW,
    );
    expect(view.state).toBe("delivered");
    expect(view.summaryItems).toBe(5);
    expect(view.summaryPrice).toBe(399.5);
  });

  it("is null/null with no order data anywhere", () => {
    const view = computeDeliveryState(baseInput(), NOW);
    expect(view.summaryItems).toBeNull();
    expect(view.summaryPrice).toBeNull();
    expect(view.orderId).toBeNull();
  });

  it("handles a missing order_data.priceComposition without throwing", () => {
    const view = computeDeliveryState(
      baseInput({ isOrdered: true, since: NOW, orderData: { id: 1, itemsCount: 4 } }),
      NOW,
    );
    expect(view.summaryItems).toBe(4);
    expect(view.summaryPrice).toBeNull();
  });
});

describe("computeDeliveryState — passthrough fields", () => {
  it("carries announcement fields through untouched", () => {
    const announcementUpdatedAt = new Date("2026-09-13T11:50:00Z");
    const view = computeDeliveryState(
      baseInput({
        isOrdered: true,
        since: NOW,
        announcementText: "Váš kurýr je na cestě",
        announcementExtra: "Prosím mějte připravenou hotovost.",
        announcementUpdatedAt,
      }),
      NOW,
    );
    expect(view.announcementText).toBe("Váš kurýr je na cestě");
    expect(view.announcementExtra).toBe("Prosím mějte připravenou hotovost.");
    expect(view.announcementUpdatedAt).toBe(announcementUpdatedAt);
  });

  it("carries isReserved/isExpressAvailable through regardless of state", () => {
    const view = computeDeliveryState(baseInput({ isReserved: true, isExpressAvailable: true }), NOW);
    expect(view.state).toBe("none");
    expect(view.isReserved).toBe(true);
    expect(view.isExpressAvailable).toBe(true);
  });

  it("carries firstDeliveryText and since/till/eta through unchanged", () => {
    const since = new Date("2026-09-14T08:00:00Z");
    const till = new Date("2026-09-14T10:00:00Z");
    const eta = new Date("2026-09-14T09:15:00Z");
    const view = computeDeliveryState(
      baseInput({ firstDeliveryText: "Zítra 8:00", since, till, eta }),
      NOW,
    );
    expect(view.firstDeliveryText).toBe("Zítra 8:00");
    expect(view.since).toBe(since);
    expect(view.till).toBe(till);
    expect(view.eta).toBe(eta);
  });
});

describe("computeDeliveryState — slots", () => {
  it("keeps slots with a known start, in input order", () => {
    const express = new Date("2026-09-13T13:00:00Z");
    const eco = new Date("2026-09-14T08:00:00Z");
    const view = computeDeliveryState(
      baseInput({
        slots: [
          { key: "express", start: express, price: 49 },
          { key: "standard", start: null, price: 0 },
          { key: "eco", start: eco, price: 0 },
        ],
      }),
      NOW,
    );
    expect(view.slots).toEqual([
      { key: "express", start: express, price: 49 },
      { key: "eco", start: eco, price: 0 },
    ]);
  });

  it("drops slots with no start (unknown/unavailable sensor)", () => {
    const view = computeDeliveryState(
      baseInput({
        slots: [
          { key: "express", start: null, price: null },
          { key: "standard", start: null, price: null },
          { key: "eco", start: null, price: null },
        ],
      }),
      NOW,
    );
    expect(view.slots).toEqual([]);
  });

  it("is an empty array when no slots are given at all", () => {
    expect(computeDeliveryState(baseInput(), NOW).slots).toEqual([]);
  });

  it("normalises a missing price to null", () => {
    const start = new Date("2026-09-13T13:00:00Z");
    const view = computeDeliveryState(
      baseInput({ slots: [{ key: "express", start, price: undefined as unknown as null }] }),
      NOW,
    );
    expect(view.slots[0].price).toBeNull();
  });
});

describe("findReservedUntil", () => {
  it("finds an ISO timestamp under a 'till'-like key, case-insensitively", () => {
    expect(findReservedUntil({ ReservedTill: "2026-09-13T18:00:00Z" })).toEqual(
      new Date("2026-09-13T18:00:00Z"),
    );
    expect(findReservedUntil({ expiresAt: "2026-09-13T18:30:00" })).toEqual(
      new Date("2026-09-13T18:30:00"),
    );
    expect(findReservedUntil({ reservation_end: "2026-09-13 19:00:00" })).toEqual(
      new Date("2026-09-13 19:00:00"),
    );
  });

  it("ignores keys that merely contain 'end' as a substring match coincidence but hold non-timestamp values", () => {
    expect(findReservedUntil({ sender: "warehouse" })).toBeNull();
  });

  it("ignores matching keys whose value isn't ISO-timestamp-looking", () => {
    expect(findReservedUntil({ until: "soon" })).toBeNull();
    expect(findReservedUntil({ until: 12345 })).toBeNull();
  });

  it("is null for missing/empty attributes", () => {
    expect(findReservedUntil(null)).toBeNull();
    expect(findReservedUntil(undefined)).toBeNull();
    expect(findReservedUntil({})).toBeNull();
  });
});
