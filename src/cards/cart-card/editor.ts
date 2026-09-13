import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { labels } from "./strings";

export interface CartCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-cart-card";
  show_search?: boolean;
  group_by_category?: boolean;
  show_brand?: boolean;
  max_items?: number;
}

@customElement("rohlik-cart-card-editor")
export class RohlikCartCardEditor extends RohlikBaseEditor<CartCardConfig> {
  protected readonly labels = labels;

  protected extraSchema(): HaFormSchema[] {
    return [
      { name: "show_search", selector: { boolean: {} } },
      { name: "group_by_category", selector: { boolean: {} } },
      { name: "show_brand", selector: { boolean: {} } },
      { name: "max_items", selector: { number: { min: 1, max: 50, mode: "box" } } },
    ];
  }
}
