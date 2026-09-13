import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { labels } from "./strings";

export interface DeliveryCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-delivery-card";
  show_announcement?: boolean;
  show_order_summary?: boolean;
  show_express_chip?: boolean;
  show_refresh?: boolean;
  show_slots?: boolean;
  show_shop_link?: boolean;
  compact?: boolean;
}

@customElement("rohlik-delivery-card-editor")
export class RohlikDeliveryCardEditor extends RohlikBaseEditor<DeliveryCardConfig> {
  protected readonly labels = labels;

  // Mirrors the card's own defaults (see `delivery-card.ts`'s `!== false`
  // checks) so the form shows real effective values instead of every
  // toggle starting unchecked.
  protected readonly defaults = {
    show_announcement: true,
    show_order_summary: true,
    show_express_chip: true,
    show_refresh: true,
    show_slots: true,
    show_shop_link: true,
    compact: false,
  };

  protected extraSchema(): HaFormSchema[] {
    return [
      { name: "show_announcement", selector: { boolean: {} } },
      { name: "show_order_summary", selector: { boolean: {} } },
      { name: "show_express_chip", selector: { boolean: {} } },
      { name: "show_refresh", selector: { boolean: {} } },
      { name: "show_slots", selector: { boolean: {} } },
      { name: "show_shop_link", selector: { boolean: {} } },
      { name: "compact", selector: { boolean: {} } },
    ];
  }
}
