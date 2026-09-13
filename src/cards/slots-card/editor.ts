import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { localize } from "../../core/localize";
import { labels, strings } from "./strings";
import type { SlotType } from "./slots";

export interface SlotsCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-slots-card";
  slots?: SlotType[];
  show_price?: boolean;
  show_location?: boolean;
  watch_interval?: number;
  layout?: "row" | "column";
}

@customElement("rohlik-slots-card-editor")
export class RohlikSlotsCardEditor extends RohlikBaseEditor<SlotsCardConfig> {
  protected readonly labels = labels;

  protected extraSchema(): HaFormSchema[] {
    const l = (key: string): string => localize(this.hass, strings, key);
    return [
      {
        name: "slots",
        selector: {
          select: {
            multiple: true,
            mode: "list",
            options: [
              { value: "express", label: l("slot_express") },
              { value: "standard", label: l("slot_standard") },
              { value: "eco", label: l("slot_eco") },
            ],
          },
        },
      },
      {
        name: "layout",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "row", label: l("layout_row") },
              { value: "column", label: l("layout_column") },
            ],
          },
        },
      },
      { name: "show_price", selector: { boolean: {} } },
      { name: "show_location", selector: { boolean: {} } },
      {
        name: "watch_interval",
        selector: { number: { mode: "box", min: 10, max: 300 } },
      },
    ];
  }
}
