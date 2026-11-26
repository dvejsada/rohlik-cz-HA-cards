import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { labels } from "./strings";

export interface FavouritesCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-favourites-card";
  show_search?: boolean;
  show_price?: boolean;
  hide_out_of_stock?: boolean;
  /** Rows shown before "Show all" (0 = all). */
  max_items?: number;
}

@customElement("rohlik-favourites-card-editor")
export class RohlikFavouritesCardEditor extends RohlikBaseEditor<FavouritesCardConfig> {
  protected readonly labels = labels;

  protected readonly defaults: Partial<FavouritesCardConfig> = {
    show_search: true,
    show_price: true,
    hide_out_of_stock: false,
    max_items: 12,
  };

  protected extraSchema(): HaFormSchema[] {
    return [
      { name: "show_search", selector: { boolean: {} } },
      { name: "show_price", selector: { boolean: {} } },
      { name: "hide_out_of_stock", selector: { boolean: {} } },
      { name: "max_items", selector: { number: { min: 0, max: 200, mode: "box" } } },
    ];
  }
}
