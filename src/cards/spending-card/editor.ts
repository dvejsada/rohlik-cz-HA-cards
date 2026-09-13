import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { localize, type Dict } from "../../core/localize";
import { CHART_MODES, LEVELS, PERIODS, type ChartMode, type Level, type Period } from "./data";
import { labels } from "./strings";

export interface SpendingCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-spending-card";
  default_period?: Period;
  default_level?: Level;
  top_n?: number;
  chart?: ChartMode;
  /** @deprecated replaced by `chart`; `show_years: false` still means `chart: "none"`. */
  show_years?: boolean;
  show_totals?: boolean;
}

const PERIOD_OPTION_LABELS: Dict = {
  cs: { month: "Tento měsíc", year: "Letos", all: "Celkem" },
  en: { month: "This month", year: "This year", all: "All time" },
};

const LEVEL_OPTION_LABELS: Dict = {
  cs: { l0: "Hlavní", l1: "Kategorie", l2: "Podrobné", l3: "Nejpodrobnější", items: "Položky" },
  en: { l0: "Top", l1: "Categories", l2: "Detailed", l3: "Specific", items: "Items" },
};

const CHART_OPTION_LABELS: Dict = {
  cs: { auto: "Automaticky", years: "Roky", months: "Měsíce", none: "Žádný" },
  en: { auto: "Automatic", years: "Years", months: "Months", none: "None" },
};

@customElement("rohlik-spending-card-editor")
export class RohlikSpendingCardEditor extends RohlikBaseEditor<SpendingCardConfig> {
  protected readonly labels = labels;

  protected readonly defaults: Partial<SpendingCardConfig> = {
    default_period: "year",
    default_level: "l1",
    top_n: 10,
    chart: "auto",
    show_totals: true,
  };

  protected extraSchema(): HaFormSchema[] {
    return [
      {
        name: "default_period",
        selector: {
          select: {
            mode: "dropdown",
            options: PERIODS.map((value) => ({
              value,
              label: localize(this.hass, PERIOD_OPTION_LABELS, value),
            })),
          },
        },
      },
      {
        name: "default_level",
        selector: {
          select: {
            mode: "dropdown",
            options: LEVELS.map((value) => ({
              value,
              label: localize(this.hass, LEVEL_OPTION_LABELS, value),
            })),
          },
        },
      },
      { name: "top_n", selector: { number: { min: 1, max: 50, mode: "box" } } },
      {
        name: "chart",
        selector: {
          select: {
            mode: "dropdown",
            options: CHART_MODES.map((value) => ({
              value,
              label: localize(this.hass, CHART_OPTION_LABELS, value),
            })),
          },
        },
      },
      { name: "show_totals", selector: { boolean: {} } },
    ];
  }
}
