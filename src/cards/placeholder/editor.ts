import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { labels } from "./strings";

export interface PlaceholderCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-placeholder-card";
}

@customElement("rohlik-placeholder-card-editor")
export class RohlikPlaceholderCardEditor extends RohlikBaseEditor<PlaceholderCardConfig> {
  protected readonly labels = labels;

  protected extraSchema(): HaFormSchema[] {
    return [];
  }
}
