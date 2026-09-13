import type { Dict } from "../../core/localize";

export const strings: Dict = {
  cs: {
    title: "Nákupní košík",
    can_order: "Lze objednat",
    below_minimum: "Pod minimem",
    empty_cart: "Košík je prázdný",
    last_order_hint: "Váš poslední nákup měl {count} položek",
    search_placeholder: "Hledat na Rohlíku…",
    favourite_only: "Jen oblíbené",
    add: "Přidat",
    remove: "Odebrat",
    uncategorised: "Bez kategorie",
    missing_entities: "Chybí entity nákupního košíku — zkontrolujte integraci HA-RohlikCZ.",
    load_error: "Nepodařilo se načíst obsah košíku.",
    action_error: "Akci se nepodařilo dokončit, zkuste to prosím znovu.",
    search_error: "Vyhledávání selhalo.",
    search_add_error: "Přidání do košíku selhalo.",
  },
  en: {
    title: "Shopping cart",
    can_order: "Can order",
    below_minimum: "Below minimum",
    empty_cart: "Cart is empty",
    last_order_hint: "Your last order had {count} items",
    search_placeholder: "Search Rohlík…",
    favourite_only: "Favourites only",
    add: "Add",
    remove: "Remove",
    uncategorised: "Uncategorised",
    missing_entities: "Shopping cart entities are missing — check the HA-RohlikCZ integration.",
    load_error: "Failed to load the cart contents.",
    action_error: "Couldn't complete that action, please try again.",
    search_error: "Search failed.",
    search_add_error: "Adding to cart failed.",
  },
};

export const labels: Dict = {
  cs: {
    device: "Zařízení",
    name: "Vlastní název",
    show_search: "Zobrazit vyhledávání",
    group_by_category: "Seskupit podle kategorie",
    show_brand: "Zobrazit značku",
    max_items: "Max. počet zobrazených položek",
  },
  en: {
    device: "Device",
    name: "Custom name",
    show_search: "Show search",
    group_by_category: "Group by category",
    show_brand: "Show brand",
    max_items: "Max. items shown",
  },
};
