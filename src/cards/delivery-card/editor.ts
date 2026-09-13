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
  compact?: boolean;
}

@customElement("rohlik-delivery-card-editor")
export class RohlikDeliveryCardEditor extends RohlikBaseEditor<DeliveryCardConfig> {
  protected readonly labels = labels;

  protected extraSchema(): HaFormSchema[] {
    return [
      { name: "show_announcement", selector: { boolean: {} } },
      { name: "show_order_summary", selector: { boolean: {} } },
      { name: "show_express_chip", selector: { boolean: {} } },
      { name: "show_refresh", selector: { boolean: {} } },
      { name: "compact", selector: { boolean: {} } },
    ];
  }
}
