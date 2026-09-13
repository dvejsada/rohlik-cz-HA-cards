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
  show_order_button?: boolean;
  checkout_url?: string;
}

@customElement("rohlik-cart-card-editor")
export class RohlikCartCardEditor extends RohlikBaseEditor<CartCardConfig> {
  protected readonly labels = labels;

  protected readonly defaults: Partial<CartCardConfig> = {
    show_search: true,
    show_brand: true,
    group_by_category: false,
    max_items: 6,
    show_order_button: true,
  };

  protected extraSchema(): HaFormSchema[] {
    return [
      { name: "show_search", selector: { boolean: {} } },
      { name: "group_by_category", selector: { boolean: {} } },
      { name: "show_brand", selector: { boolean: {} } },
      { name: "max_items", selector: { number: { min: 1, max: 50, mode: "box" } } },
      { name: "show_order_button", selector: { boolean: {} } },
      { name: "checkout_url", selector: { text: {} } },
    ];
  }
}
