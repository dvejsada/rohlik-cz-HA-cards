import type { Dict } from "../../core/localize";

export const strings: Dict = {
  cs: {
    title: "Termíny rozvozu",
    slot_express: "Expres",
    slot_standard: "Standard",
    slot_eco: "Eko",
    express_available: "Expres k dispozici",
    no_express: "Bez expresu",
    watch_toggle: "Sledovat expres",
    watch_error: "Aktualizace se nezdařila",
    no_entities: "Na tomto zařízení nebyly nalezeny entity Rohlík.cz",
    layout_auto: "Automaticky",
    layout_row: "Řádek",
    layout_column: "Sloupec",
  },
  en: {
    title: "Delivery slots",
    slot_express: "Express",
    slot_standard: "Standard",
    slot_eco: "Eco",
    express_available: "Express available",
    no_express: "No express",
    watch_toggle: "Watch express",
    watch_error: "Refresh failed",
    no_entities: "Rohlík.cz entities not found on this device",
    layout_auto: "Auto",
    layout_row: "Row",
    layout_column: "Column",
  },
};

export const labels: Dict = {
  cs: {
    device: "Zařízení",
    name: "Vlastní název",
    slots: "Zobrazené sloty",
    layout: "Rozložení",
    show_price: "Zobrazit cenu",
    show_location: "Zobrazit adresu",
    watch_interval: "Interval sledování (s)",
  },
  en: {
    device: "Device",
    name: "Custom name",
    slots: "Slots shown",
    layout: "Layout",
    show_price: "Show price",
    show_location: "Show location",
    watch_interval: "Watch interval (s)",
  },
};
