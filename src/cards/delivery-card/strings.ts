import type { Dict } from "../../core/localize";

/**
 * `rohlik-delivery-card` / `rohlik-delivery-badge` strings. The badge
 * re-exports this dict (see `src/badges/delivery-badge/strings.ts`) so both
 * surfaces read the exact same state words.
 */
export const strings: Dict = {
  cs: {
    title: "Příští rozvoz",
    chip_arriving: "Na cestě",
    chip_ordered: "Objednáno",
    chip_delivered: "Doručeno",
    chip_none: "Bez objednávky",
    chip_express: "Expres k dispozici",
    chip_reserved: "Rezervovaný termín",
    estimated: "odhad",
    by: "do",
    delivered_caption: "doručeno",
    nearest_slot: "Nejbližší termín",
    window: "Okno",
    order: "objednávka",
    announcement_updated: "Aktualizováno {time}",
    refresh_failed: "Obnovení se nezdařilo",
    no_entities: "Na tomto zařízení nebyly nalezeny entity Rohlík.cz",
  },
  en: {
    title: "Next delivery",
    chip_arriving: "Arriving",
    chip_ordered: "Ordered",
    chip_delivered: "Delivered",
    chip_none: "No order",
    chip_express: "Express available",
    chip_reserved: "Slot reserved",
    estimated: "estimated",
    by: "by",
    delivered_caption: "delivered",
    nearest_slot: "nearest slot",
    window: "Window",
    order: "order",
    announcement_updated: "Updated {time}",
    refresh_failed: "Refresh failed",
    no_entities: "Rohlík.cz entities not found on this device",
  },
};

export const labels: Dict = {
  cs: {
    device: "Zařízení",
    name: "Vlastní název",
    show_announcement: "Zobrazit oznámení kurýra",
    show_order_summary: "Zobrazit shrnutí objednávky",
    show_express_chip: "Zobrazit chip Expres",
    show_refresh: "Zobrazit tlačítko Obnovit",
    compact: "Kompaktní zobrazení",
  },
  en: {
    device: "Device",
    name: "Custom name",
    show_announcement: "Show courier announcement",
    show_order_summary: "Show order summary",
    show_express_chip: "Show express chip",
    show_refresh: "Show refresh button",
    compact: "Compact layout",
  },
};
