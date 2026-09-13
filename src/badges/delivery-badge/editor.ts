import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { badgeLabels } from "./strings";

export interface DeliveryBadgeConfig extends RohlikCardConfig {
  type: "custom:rohlik-delivery-badge";
  show_name?: boolean;
}

@customElement("rohlik-delivery-badge-editor")
export class RohlikDeliveryBadgeEditor extends RohlikBaseEditor<DeliveryBadgeConfig> {
  protected readonly labels = badgeLabels;

  protected extraSchema(): HaFormSchema[] {
    return [{ name: "show_name", selector: { boolean: {} } }];
  }
}
