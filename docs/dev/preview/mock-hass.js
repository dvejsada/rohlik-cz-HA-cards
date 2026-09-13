/**
 * Standalone mock of the Home Assistant frontend for previewing/screenshotting
 * the Rohlík.cz cards outside a real HA instance.
 *
 * Exposes:
 *   - installShims()   — defines <ha-card>, <ha-icon>, <ha-circular-progress>
 *   - installFixedClock() — freezes `Date.now()` / `new Date()` (no args) so
 *     every screenshot is deterministic regardless of when this script runs.
 *   - buildHass(options) — returns a `hass` object matching src/core/types.ts,
 *     shaped after docs/DESIGN.md's entity contract, for one of four delivery
 *     states ("arriving" | "ordered" | "none" | "delivered").
 *   - DEVICE_ID, writeDeliveredMemory(lang) — localStorage helper for the
 *     "delivered" state (see src/cards/delivery-card/memory.ts).
 *
 * No network access anywhere in this file — every icon/spinner is inline
 * markup, every "CDN" url below is illustrative text only, never fetched.
 */

// ---------------------------------------------------------------------------
// Fixed clock — 2026-09-13T17:42:00+02:00. Matches the "arriving" scenario's
// ETA exactly (so its progress bar sits at a clean 50%) and is reused as the
// reference instant for every other state.
// ---------------------------------------------------------------------------
export const FIXED_NOW_ISO = "2026-09-13T17:42:00+02:00";
const FIXED_NOW_MS = new Date(FIXED_NOW_ISO).getTime();

export function installFixedClock() {
  const RealDate = Date;
  class MockDate extends RealDate {
    constructor(...args) {
      if (args.length === 0) super(FIXED_NOW_MS);
      else super(...args);
    }
    static now() {
      return FIXED_NOW_MS;
    }
  }
  // eslint-disable-next-line no-global-assign
  window.Date = MockDate;
}

// ---------------------------------------------------------------------------
// Custom element shims. Each defines its own shadow root so its internal
// styles apply correctly even when placed inside another element's shadow
// DOM (exactly like the real ha-card/ha-icon/ha-circular-progress).
// ---------------------------------------------------------------------------

const GLYPHS = {
  "mdi:truck-delivery": "🚚",
  "mdi:truck-fast": "🚀",
  "mdi:cart": "🛒",
  "mdi:calendar-clock": "📅",
  "mdi:account-star": "★",
  "mdi:chart-timeline-variant": "📈",
  "mdi:refresh": "⟳",
  "mdi:magnify": "🔍",
  "mdi:heart": "♥",
  "mdi:heart-outline": "♡",
  "mdi:plus": "+",
  "mdi:close": "×",
  "mdi:map-marker": "📍",
  "mdi:eye": "👁",
  "mdi:eye-outline": "👁",
  "mdi:lightning-bolt": "⚡",
  "mdi:leaf": "🍃",
  "mdi:cash-multiple": "💰",
  "mdi:shopping": "🛍",
  "mdi:cash-100": "💵",
  "mdi:human-male-female-child": "👪",
  "mdi:recycle": "♻",
  "mdi:check": "✓",
};

export function installShims() {
  if (!customElements.get("ha-card")) {
    customElements.define(
      "ha-card",
      class extends HTMLElement {
        constructor() {
          super();
          const root = this.attachShadow({ mode: "open" });
          root.innerHTML = `
            <style>
              :host {
                display: block;
                border-radius: var(--ha-card-border-radius, 12px);
                background: var(--ha-card-background, var(--card-background-color, #fff));
                box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.14));
                color: var(--primary-text-color, #212121);
                box-sizing: border-box;
                overflow: hidden;
              }
              .wrap { padding: 16px; box-sizing: border-box; }
            </style>
            <div class="wrap"><slot></slot></div>
          `;
        }
      },
    );
  }

  if (!customElements.get("ha-icon")) {
    customElements.define(
      "ha-icon",
      class extends HTMLElement {
        static get observedAttributes() {
          return ["icon"];
        }
        constructor() {
          super();
          this._root = this.attachShadow({ mode: "open" });
        }
        connectedCallback() {
          this._render();
        }
        attributeChangedCallback() {
          this._render();
        }
        _render() {
          const icon = this.getAttribute("icon") || "";
          const glyph = GLYPHS[icon] || (icon.split(":")[1] || "?").slice(0, 1).toUpperCase();
          this._root.innerHTML = `
            <style>
              :host {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: var(--mdc-icon-size, 24px);
                height: var(--mdc-icon-size, 24px);
                color: var(--icon-primary-color, inherit);
                flex-shrink: 0;
              }
              svg { display: block; width: 100%; height: 100%; }
              text { font-family: -apple-system, "Segoe UI Emoji", sans-serif; }
            </style>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.14"></circle>
              <text x="12" y="16.5" text-anchor="middle" font-size="12" fill="currentColor">${glyph}</text>
            </svg>
          `;
        }
      },
    );
  }

  if (!customElements.get("ha-circular-progress")) {
    customElements.define(
      "ha-circular-progress",
      class extends HTMLElement {
        constructor() {
          super();
          const size = this.getAttribute("size") === "small" ? 16 : 28;
          const root = this.attachShadow({ mode: "open" });
          root.innerHTML = `
            <style>
              :host { display: inline-block; width: ${size}px; height: ${size}px; }
              .ring {
                width: 100%; height: 100%; border-radius: 50%;
                border: 2px solid color-mix(in srgb, var(--primary-color, #03a9f4) 25%, transparent);
                border-top-color: var(--primary-color, #03a9f4);
                animation: spin 0.8s linear infinite;
                box-sizing: border-box;
              }
              @keyframes spin { to { transform: rotate(360deg); } }
            </style>
            <div class="ring"></div>
          `;
        }
      },
    );
  }
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

export const DEVICE_ID = "3fae1c2b7d8e4f5a9b0c1d2e3f4a5b6c";
export const DEVICE_NAME = "Dan Vejsada";
export const CONFIG_ENTRY_ID = "01HXAMPLECONFIGENTRYID0000000001";

function eid(domain, key) {
  return `${domain}.dan_vejsada_${key}`;
}
const CART_ENTITY_ID = "todo.dan_vejsada_rohlik_shopping_cart";

/** Builds one `hass.states[x]` entry. */
function st(state, attributes = {}) {
  return {
    state: String(state),
    attributes,
    last_changed: FIXED_NOW_ISO,
    last_updated: FIXED_NOW_ISO,
  };
}

// ---- Delivery-slot capacities: express 22 % (warn), standard 78 % (ok), eco 90 % (ok) ----
const SLOTS = {
  express_slot: {
    start: "2026-09-13T18:00:00+02:00",
    end: "2026-09-13T18:20:00+02:00",
    price: 49,
    capacityPercent: 22,
    capacityMessage: "Rychle mizí",
    title: "Expres",
    subtitle: "Doručení do 20 minut",
  },
  standard_slot: {
    start: "2026-09-14T10:00:00+02:00",
    end: "2026-09-14T12:00:00+02:00",
    price: 0,
    capacityPercent: 78,
    capacityMessage: "Dostatek kapacity",
    title: "Standard",
    subtitle: null,
  },
  eco_slot: {
    start: "2026-09-14T14:00:00+02:00",
    end: "2026-09-14T18:00:00+02:00",
    price: 29,
    capacityPercent: 90,
    capacityMessage: "Volno",
    title: "Eko",
    subtitle: "4hodinové okno",
  },
};

// ---- 11 realistic Czech grocery cart items ----
const CART_ITEMS = [
  { name: "Mléko polotučné 1l", qty: 2, price: 43.8, category: "Mléčné výrobky", brand: "Rohlík", id: 100234 },
  { name: "Rohlíky tukové 4ks", qty: 3, price: 38.7, category: "Pečivo", brand: "Penam", id: 100456 },
  { name: "Vejce M 10ks", qty: 1, price: 59.9, category: "Mléčné výrobky", brand: "Rohlík", id: 100789 },
  { name: "Banány 1kg", qty: 1, price: 34.9, category: "Ovoce a zelenina", brand: "Rohlík", id: 101011 },
  { name: "Kuřecí prsa 500g", qty: 2, price: 179.8, category: "Maso a ryby", brand: "Vodňanské kuře", id: 101234 },
  { name: "Jogurt bílý 150g", qty: 4, price: 39.6, category: "Mléčné výrobky", brand: "Danone", id: 101456 },
  { name: "Toaletní papír 8ks", qty: 1, price: 149.0, category: "Drogerie", brand: "Zewa", id: 101678 },
  { name: "Minerální voda 1.5l", qty: 6, price: 101.4, category: "Nápoje", brand: "Mattoni", id: 101890 },
  { name: "Máslo 250g", qty: 2, price: 109.8, category: "Mléčné výrobky", brand: "Madeta", id: 102012 },
  { name: "Mražená zelenina mix 450g", qty: 2, price: 79.8, category: "Mražené potraviny", brand: "Bonduelle", id: 102234 },
  { name: "Těstoviny špagety 500g", qty: 3, price: 98.7, category: "Trvanlivé potraviny", brand: "Barilla", id: 102456 },
];
const CART_TOTAL = CART_ITEMS.reduce((sum, i) => sum + i.price, 0); // 935.4

// ---- Spending analytics ----
const BY_YEAR = {
  2023: { total: 18320.5, order_count: 40 },
  2024: { total: 24870.15, order_count: 55 },
  2025: { total: 24659.0, order_count: 53 },
  2026: { total: 28450.75, order_count: 62 },
};
const ALLTIME_TOTAL = Object.values(BY_YEAR).reduce((s, y) => s + y.total, 0);
const ALLTIME_ORDERS = Object.values(BY_YEAR).reduce((s, y) => s + y.order_count, 0);

const CATEGORIES_L0_YEAR = [
  { name: "Potraviny", spent: 19870.4, units: 612, avg_unit_price: 32.5 },
  { name: "Drogerie", spent: 4120.3, units: 58, avg_unit_price: 71.05 },
  { name: "Nápoje", spent: 2860.05, units: 140, avg_unit_price: 20.43 },
  { name: "Ostatní", spent: 1600.0, units: 34, avg_unit_price: 47.06 },
];
const CATEGORIES_L0_ALL = [
  { name: "Potraviny", spent: 68210.9, units: 2340, avg_unit_price: 29.15 },
  { name: "Drogerie", spent: 14320.5, units: 210, avg_unit_price: 68.19 },
  { name: "Nápoje", spent: 9840.0, units: 505, avg_unit_price: 19.49 },
  { name: "Ostatní", spent: 3929.0, units: 88, avg_unit_price: 44.65 },
];

const CATEGORIES_L1_YEAR = [
  { name: "Mléčné výrobky", spent: 6820.4, units: 410, avg_unit_price: 16.6 },
  { name: "Pečivo", spent: 3120.9, units: 380, avg_unit_price: 8.2 },
  { name: "Ovoce a zelenina", spent: 4980.2, units: 290, avg_unit_price: 17.17 },
  { name: "Maso a ryby", spent: 6210.75, units: 130, avg_unit_price: 47.77 },
  { name: "Nápoje", spent: 2860.05, units: 140, avg_unit_price: 20.43 },
  { name: "Drogerie", spent: 2340.3, units: 45, avg_unit_price: 52.01 },
  { name: "Mražené potraviny", spent: 1380.4, units: 62, avg_unit_price: 22.26 },
  { name: "Trvanlivé potraviny", spent: 737.75, units: 55, avg_unit_price: 13.41 },
];
const CATEGORIES_L1_ALL = [
  { name: "Mléčné výrobky", spent: 23100.6, units: 1520, avg_unit_price: 15.2 },
  { name: "Ovoce a zelenina", spent: 17840.1, units: 1080, avg_unit_price: 16.52 },
  { name: "Maso a ryby", spent: 15920.4, units: 340, avg_unit_price: 46.82 },
  { name: "Pečivo", spent: 10870.3, units: 1290, avg_unit_price: 8.43 },
  { name: "Nápoje", spent: 9840.0, units: 505, avg_unit_price: 19.49 },
  { name: "Drogerie", spent: 8420.6, units: 165, avg_unit_price: 51.03 },
  { name: "Mražené potraviny", spent: 5900.2, units: 240, avg_unit_price: 24.58 },
  { name: "Trvanlivé potraviny", spent: 4340.4, units: 310, avg_unit_price: 14.0 },
  { name: "Domácnost", spent: 3568.4, units: 70, avg_unit_price: 50.98 },
];

const CATEGORIES_L2_YEAR = [
  { name: "Trvanlivé mléko", spent: 2410.3, units: 180, avg_unit_price: 13.39 },
  { name: "Jogurty", spent: 1980.4, units: 210, avg_unit_price: 9.43 },
  { name: "Sýry", spent: 2429.7, units: 90, avg_unit_price: 27.0 },
  { name: "Kuřecí maso", spent: 3120.6, units: 68, avg_unit_price: 45.89 },
  { name: "Hovězí maso", spent: 1890.15, units: 22, avg_unit_price: 85.92 },
  { name: "Čerstvé pečivo", spent: 2210.5, units: 260, avg_unit_price: 8.5 },
  { name: "Balené pečivo", spent: 910.4, units: 120, avg_unit_price: 7.59 },
  { name: "Zelenina", spent: 3120.2, units: 190, avg_unit_price: 16.42 },
  { name: "Ovoce", spent: 1860.0, units: 100, avg_unit_price: 18.6 },
  { name: "Minerálky", spent: 1640.4, units: 88, avg_unit_price: 18.64 },
];
const CATEGORIES_L2_ALL = CATEGORIES_L2_YEAR.map((c) => ({
  ...c,
  spent: Math.round(c.spent * 3.6 * 100) / 100,
  units: Math.round(c.units * 3.6),
}));

const CATEGORIES_L3_YEAR = [
  { name: "Mléko polotučné", spent: 1210.4, units: 90, avg_unit_price: 13.45 },
  { name: "Mléko plnotučné", spent: 890.3, units: 62, avg_unit_price: 14.36 },
  { name: "Jogurt bílý", spent: 980.2, units: 110, avg_unit_price: 8.91 },
  { name: "Jogurt ochucený", spent: 1000.2, units: 100, avg_unit_price: 10.0 },
  { name: "Eidam", spent: 1420.1, units: 55, avg_unit_price: 25.82 },
  { name: "Kuřecí prsa", spent: 1980.4, units: 40, avg_unit_price: 49.51 },
  { name: "Kuřecí stehna", spent: 1140.2, units: 28, avg_unit_price: 40.72 },
  { name: "Rohlíky", spent: 1310.5, units: 180, avg_unit_price: 7.28 },
  { name: "Toustový chléb", spent: 900.0, units: 80, avg_unit_price: 11.25 },
  { name: "Banány", spent: 980.3, units: 60, avg_unit_price: 16.34 },
];
const CATEGORIES_L3_ALL = CATEGORIES_L3_YEAR.map((c) => ({
  ...c,
  spent: Math.round(c.spent * 3.6 * 100) / 100,
  units: Math.round(c.units * 3.6),
}));

const ITEMS_YEAR = [
  { name: "Mléko polotučné 1l Rohlík", id: 100234, spent: 610.2, units: 42, avg_unit_price: 14.53 },
  { name: "Rohlík tukový", id: 100456, spent: 480.9, units: 220, avg_unit_price: 2.19 },
  { name: "Vejce M 10ks", id: 100789, spent: 899.9, units: 15, avg_unit_price: 59.99 },
  { name: "Banány 1kg", id: 101011, spent: 780.4, units: 42, avg_unit_price: 18.58 },
  { name: "Kuřecí prsa 500g", id: 101234, spent: 1350.6, units: 15, avg_unit_price: 90.04 },
  { name: "Jogurt bílý 150g Danone", id: 101456, spent: 594.0, units: 60, avg_unit_price: 9.9 },
  { name: "Minerální voda 1.5l Mattoni", id: 101890, spent: 811.2, units: 48, avg_unit_price: 16.9 },
  { name: "Máslo 250g Madeta", id: 102012, spent: 933.3, units: 17, avg_unit_price: 54.9 },
];
const ITEMS_ALL = ITEMS_YEAR.map((c) => ({
  ...c,
  spent: Math.round(c.spent * 3.6 * 100) / 100,
  units: Math.round(c.units * 3.6),
}));

// ---- Monthly history for the spending card's "Month" period chart ----
// 12 months ending on the current (fixed-clock) month; the last entry's
// `max` matches `monthly_spent`'s live state below, since the real sensor
// keeps climbing through the month and the card overrides the current
// month with the live state anyway.
const MONTHLY_SPENT_ENTITY_ID = eid("sensor", "monthly_spent");
const MONTHLY_HISTORY = [
  { monthsAgo: 11, max: 1980.4 },
  { monthsAgo: 10, max: 2410.9 },
  { monthsAgo: 9, max: 1875.2 },
  { monthsAgo: 8, max: 2660.75 },
  { monthsAgo: 7, max: 2110.3 },
  { monthsAgo: 6, max: 1790.6 },
  { monthsAgo: 5, max: 2950.15 },
  { monthsAgo: 4, max: 2205.4 },
  { monthsAgo: 3, max: 2480.9 },
  { monthsAgo: 2, max: 1690.25 },
  { monthsAgo: 1, max: 2870.6 },
  { monthsAgo: 0, max: 2340.5 },
];

// ---------------------------------------------------------------------------

/**
 * Builds a full mock `hass` object for `state` ("arriving" | "ordered" |
 * "none" | "delivered") in `lang` ("cs" | "en").
 */
export function buildHass({ lang = "cs", state = "arriving" } = {}) {
  const states = {};
  const entities = {};

  function add(domain, key, entityState, attributes) {
    const entityId = key === "shopping_cart" ? CART_ENTITY_ID : eid(domain, key);
    states[entityId] = st(entityState, attributes);
    entities[entityId] = {
      entity_id: entityId,
      device_id: DEVICE_ID,
      platform: "rohlikcz",
      translation_key: key,
      name: null,
    };
  }

  // ---- binary_sensor ----
  const isOrdered = state === "arriving" || state === "ordered";
  let orderData = null;
  if (state === "arriving") {
    orderData = {
      id: "24681012",
      orderTime: "2026-09-13T09:05:00+02:00",
      itemsCount: 23,
      priceComposition: { total: { amount: 1486 } },
      deliverySlot: { since: "2026-09-13T17:00:00+02:00", till: "2026-09-13T19:00:00+02:00" },
      status: "on_the_way",
    };
  } else if (state === "ordered") {
    orderData = {
      id: "24681099",
      orderTime: "2026-09-13T17:10:00+02:00",
      itemsCount: 11,
      priceComposition: { total: { amount: 935.4 } },
      deliverySlot: { since: "2026-09-14T08:00:00+02:00", till: "2026-09-14T10:00:00+02:00" },
      status: "confirmed",
    };
  }
  add("binary_sensor", "is_ordered", isOrdered ? "on" : "off", orderData ? { order_data: orderData } : {});

  add(
    "binary_sensor",
    "is_reserved",
    state === "none" ? "on" : "off",
    state === "none"
      ? {
          since: "2026-09-14T08:00:00+02:00",
          till: "2026-09-14T10:00:00+02:00",
          expiresAt: "2026-09-13T20:00:00+02:00",
        }
      : {},
  );
  add("binary_sensor", "is_express_available", "on", {});
  add("binary_sensor", "is_premium", "on", {
    type: "Xtra",
    payment_type: "yearly",
    expiration_date: "2027-04-12T00:00:00+02:00",
    remaining_days: 214,
    start_date: "2025-04-12T00:00:00+02:00",
    end_date: "2027-04-12T00:00:00+02:00",
    remaining_orders_without_limit: 3,
    remaining_free_express: 2,
  });
  add("binary_sensor", "is_reusable", "on", {});
  add("binary_sensor", "is_parent", "on", {});

  // ---- sensor: delivery timing ----
  add("sensor", "first_delivery", "Zítra 8:00", {
    delivery_location: "Praha 5 - Smíchov, Plzeňská 8",
    delivery_type: "Rozvoz",
  });

  const since = state === "arriving" ? "2026-09-13T17:00:00+02:00" : state === "ordered" ? "2026-09-14T08:00:00+02:00" : "unknown";
  const till = state === "arriving" ? "2026-09-13T19:00:00+02:00" : state === "ordered" ? "2026-09-14T10:00:00+02:00" : "unknown";
  const eta = state === "arriving" ? "2026-09-13T17:42:00+02:00" : "unknown";
  add("sensor", "next_order_since", since, {});
  add("sensor", "next_order_till", till, {});
  add("sensor", "delivery_time", eta, {});

  if (state === "arriving") {
    add("sensor", "delivery_info", "Kurýr je 3 zastávky od vás", {
      "Order Id": "24681012",
      "Updated At": "2026-09-13T17:39:00+02:00",
      Title: "Doručení",
      "Additional Content": "Řidič: Petr K. · SPZ 5A1 2345",
    });
  } else if (state === "ordered") {
    add("sensor", "delivery_info", "Objednávka byla přijata a připravuje se", {
      "Order Id": "24681099",
      "Updated At": "2026-09-13T17:32:00+02:00",
      Title: "Stav objednávky",
      "Additional Content": "",
    });
  } else {
    add("sensor", "delivery_info", "unknown", {});
  }

  // "last_order" baseline vs. the "delivered" scenario's own order.
  if (state === "delivered") {
    add("sensor", "last_order", "2026-09-13T12:15:00+02:00", { Items: 9, Price: 612.5 });
  } else {
    add("sensor", "last_order", "2026-09-11T19:20:00+02:00", { Items: 18, Price: 845.5 });
  }

  // ---- sensor: delivery slots ----
  for (const [key, slot] of Object.entries(SLOTS)) {
    add("sensor", key, slot.start, {
      "Delivery Slot End": slot.end,
      "Remaining Capacity Percent": slot.capacityPercent,
      "Remaining Capacity Message": slot.capacityMessage,
      Price: slot.price,
      Title: slot.title,
      Subtitle: slot.subtitle,
      entity_picture: `https://cdn.example-rohlik-assets.test/icons/${key}.png`,
    });
  }

  // ---- sensor: cart ----
  add("sensor", "cart_price", CART_TOTAL, { "Total items": CART_ITEMS.length, "Can Order": false });

  // ---- sensor: account ----
  add("sensor", "credit_amount", 312, {});
  add("sensor", "bags_amount", 6, { "Max Bags": 10, "Deposit Amount": 300, "Deposit Currency": "CZK" });
  add("sensor", "premium_days", 214, {
    "Premium Type": "Xtra Yearly",
    "Payment Date": "2025-04-12T00:00:00+02:00",
    "Start Date": "2025-04-12T00:00:00+02:00",
    "End Date": "2027-04-12T00:00:00+02:00",
  });
  add("sensor", "no_limit", 3, {});
  add("sensor", "free_express", 2, {});
  add("sensor", "updated", "2026-09-13T17:38:00+02:00", {});

  // ---- sensor: spending ----
  add("sensor", "monthly_spent", 2340.5, {
    monthly_total: 2340.5,
    processed_count: 7,
    average_order_value: 334.35,
    current_month: "2026-09",
  });
  add("sensor", "yearly_spent", BY_YEAR[2026].total, {
    year: 2026,
    order_count: BY_YEAR[2026].order_count,
    average_order_value: Math.round((BY_YEAR[2026].total / BY_YEAR[2026].order_count) * 100) / 100,
  });
  add("sensor", "alltime_spent", Math.round(ALLTIME_TOTAL * 100) / 100, {
    order_count: ALLTIME_ORDERS,
    average_order_value: Math.round((ALLTIME_TOTAL / ALLTIME_ORDERS) * 100) / 100,
    first_order_date: "2023-01-15T10:00:00+01:00",
    tracking_since: "2023-01-15T10:00:00+01:00",
    by_year: BY_YEAR,
  });

  function addBreakdown(key, categories, { year } = {}) {
    const total = Math.round(categories.reduce((s, c) => s + c.spent, 0) * 100) / 100;
    add("sensor", key, total, {
      total_count: categories.length,
      categories,
      ...(year !== undefined ? { year } : {}),
      enriched_orders: Math.round((year ? BY_YEAR[2026].order_count : ALLTIME_ORDERS) * 0.92),
      total_orders: year ? BY_YEAR[2026].order_count : ALLTIME_ORDERS,
    });
  }
  addBreakdown("categories_l0_this_year", CATEGORIES_L0_YEAR, { year: 2026 });
  addBreakdown("categories_l0_all_time", CATEGORIES_L0_ALL);
  addBreakdown("categories_this_year", CATEGORIES_L1_YEAR, { year: 2026 });
  addBreakdown("categories_all_time", CATEGORIES_L1_ALL);
  addBreakdown("categories_l2_this_year", CATEGORIES_L2_YEAR, { year: 2026 });
  addBreakdown("categories_l2_all_time", CATEGORIES_L2_ALL);
  addBreakdown("categories_l3_this_year", CATEGORIES_L3_YEAR, { year: 2026 });
  addBreakdown("categories_l3_all_time", CATEGORIES_L3_ALL);

  function addItems(key, items, { year } = {}) {
    const total = Math.round(items.reduce((s, c) => s + c.spent, 0) * 100) / 100;
    add("sensor", key, total, {
      total_count: items.length,
      items,
      ...(year !== undefined ? { year } : {}),
    });
  }
  addItems("items_this_year", ITEMS_YEAR, { year: 2026 });
  addItems("items_all_time", ITEMS_ALL);

  // ---- todo ----
  states[CART_ENTITY_ID] = st(CART_ITEMS.length, {});
  entities[CART_ENTITY_ID] = {
    entity_id: CART_ENTITY_ID,
    device_id: DEVICE_ID,
    platform: "rohlikcz",
    translation_key: "shopping_cart",
    name: null,
  };

  const callLog = [];

  const hass = {
    states,
    entities,
    devices: {
      [DEVICE_ID]: { id: DEVICE_ID, name: DEVICE_NAME, name_by_user: null, manufacturer: "Rohlík.cz" },
    },
    language: lang,
    locale: { language: lang },
    themes: {},
    connection: {},
    __calls: callLog,

    async callWS(msg) {
      callLog.push({ type: "callWS", msg });
      if (msg.type === "config/entity_registry/get") {
        return { config_entry_id: CONFIG_ENTRY_ID };
      }
      if (msg.type === "todo/item/list") {
        return {
          items: CART_ITEMS.map((item, i) => ({
            uid: `cart-item-${i + 1}`,
            summary: `${item.name} (${item.qty}) - ${item.price} Kč`,
            status: "needs_action",
            description: `Category: ${item.category}\nBrand: ${item.brand}\nProduct ID: ${item.id}`,
          })),
        };
      }
      if (msg.type === "recorder/statistics_during_period") {
        const entityId = (msg.statistic_ids || [])[0];
        if (entityId !== MONTHLY_SPENT_ENTITY_ID) return {};
        const now = new Date();
        const rows = MONTHLY_HISTORY.map(({ monthsAgo, max }) => {
          const start = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
          const end = new Date(now.getFullYear(), now.getMonth() - monthsAgo + 1, 1);
          return { start: start.getTime(), end: end.getTime(), state: max, sum: max };
        });
        return { [entityId]: rows };
      }
      return {};
    },

    async callService(domain, service, data, target, notifyOnError, returnResponse) {
      callLog.push({ type: "callService", domain, service, data, target, returnResponse });
      if (domain === "rohlikcz" && service === "search_product") {
        return {
          context: {},
          response: {
            search_results: [
              { id: 200001, name: "Mléko polotučné 1l", price: "21.90 Kč", brand: "Rohlík", amount: "1 l" },
              { id: 200002, name: "Mléko plnotučné 1l", price: "22.90 Kč", brand: "Rohlík", amount: "1 l" },
              { id: 200003, name: "Mléko bez laktózy 1l", price: "34.90 Kč", brand: "Zott", amount: "1 l" },
            ],
          },
        };
      }
      if (returnResponse) {
        return { context: {}, response: {} };
      }
      return { context: {} };
    },
  };

  return hass;
}

/** Writes the "an order finished ~1h ago" memory the delivery card/badge read for the "delivered" state. */
export function writeDeliveredMemory() {
  try {
    window.localStorage.setItem(
      `rohlik-delivery-last:${DEVICE_ID}`,
      JSON.stringify({
        orderId: "24681000",
        till: "2026-09-13T13:00:00+02:00",
        endedAt: "2026-09-13T16:50:00+02:00",
      }),
    );
  } catch {
    // ignore — private browsing / disabled storage
  }
}

export function clearDeliveryMemory() {
  try {
    window.localStorage.removeItem(`rohlik-delivery-last:${DEVICE_ID}`);
  } catch {
    // ignore
  }
}
