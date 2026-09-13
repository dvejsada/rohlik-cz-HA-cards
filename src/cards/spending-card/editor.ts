import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { localize, type Dict } from "../../core/localize";
import { LEVELS, type Level, type Period } from "./data";
import { labels } from "./strings";

export interface SpendingCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-spending-card";
  default_period?: Period;
  default_level?: Level;
  top_n?: number;
  show_years?: boolean;
  show_totals?: boolean;
}

const PERIOD_OPTION_LABELS: Dict = {
  cs: { year: "Letos", all: "Celkem" },
  en: { year: "This year", all: "All time" },
};

const LEVEL_OPTION_LABELS: Dict = {
  cs: { l0: "Hlavní", l1: "Kategorie", l2: "Podrobné", l3: "Nejpodrobnější", items: "Položky" },
  en: { l0: "Top", l1: "Categories", l2: "Detailed", l3: "Specific", items: "Items" },
};

@customElement("rohlik-spending-card-editor")
export class RohlikSpendingCardEditor extends RohlikBaseEditor<SpendingCardConfig> {
  protected readonly labels = labels;

  protected extraSchema(): HaFormSchema[] {
    const periods: Period[] = ["year", "all"];
    return [
      {
        name: "default_period",
        selector: {
          select: {
            mode: "dropdown",
            options: periods.map((value) => ({
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
      { name: "show_years", selector: { boolean: {} } },
      { name: "show_totals", selector: { boolean: {} } },
    ];
  }
}
