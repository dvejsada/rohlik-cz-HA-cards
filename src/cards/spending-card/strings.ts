import type { Dict } from "../../core/localize";

export const strings: Dict = {
  cs: {
    title: "Útraty",
    not_found: "Na tomto zařízení nebyly nalezeny entity Rohlík.cz",
    period_year: "Letos",
    period_all: "Celkem",
    avg_order: "průměrná objednávka",
    orders_count: "{n} objednávek",
    level_l0: "Hlavní",
    level_l1: "Kategorie",
    level_l2: "Podrobné",
    level_l3: "Nejpodrobnější",
    level_items: "Položky",
    expand_row: "{units} ks · {avg} za kus",
    enable_hint: "Rozpis zobrazíte zapnutím Analýzy útrat v nastavení integrace.",
    enriched: "obohaceno {enriched} z {total} objednávek",
  },
  en: {
    title: "Spending",
    not_found: "Rohlík.cz entities not found on this device",
    period_year: "This year",
    period_all: "All time",
    avg_order: "avg order",
    orders_count: "{n} orders",
    level_l0: "Top",
    level_l1: "Categories",
    level_l2: "Detailed",
    level_l3: "Specific",
    level_items: "Items",
    expand_row: "{units} units · {avg} per unit",
    enable_hint: "Enable Spending Analytics in the integration options to see a breakdown.",
    enriched: "{enriched} of {total} orders enriched",
  },
};

export const labels: Dict = {
  cs: {
    device: "Zařízení",
    name: "Vlastní název",
    default_period: "Výchozí období",
    default_level: "Výchozí úroveň",
    top_n: "Počet položek",
    show_years: "Zobrazit graf let",
    show_totals: "Zobrazit souhrn",
  },
  en: {
    device: "Device",
    name: "Custom name",
    default_period: "Default period",
    default_level: "Default level",
    top_n: "Row count",
    show_years: "Show year chart",
    show_totals: "Show totals",
  },
};
