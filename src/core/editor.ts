import { LitElement, html, nothing, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "./types";
import type { RohlikCardConfig } from "./base-card";
import { fireEvent } from "./actions";
import { localize, type Dict } from "./localize";

export interface HaFormSchema {
  name: string;
  required?: boolean;
  selector: Record<string, unknown>;
  [key: string]: unknown;
}

const BASE_SCHEMA: HaFormSchema[] = [
  { name: "device", required: true, selector: { device: { integration: "rohlikcz" } } },
  { name: "name", selector: { text: {} } },
];

/**
 * `ha-form` wrapper shared by every card editor: device selector + optional
 * name, plus whatever `extraSchema()` a subclass adds. Emits `config-changed`
 * with the merged config on every `value-changed` from the form.
 */
export abstract class RohlikBaseEditor<C extends RohlikCardConfig = RohlikCardConfig>
  extends LitElement
  implements LovelaceCardEditor
{
  @state() public hass!: HomeAssistant;

  @state() protected config!: C;

  /** Extra `ha-form` schema entries appended after the base device/name fields. */
  protected abstract extraSchema(): HaFormSchema[];

  /** Per-field label dictionary used by `computeLabel`. */
  protected abstract readonly labels: Dict;

  setConfig(config: C): void {
    this.config = config;
  }

  private get schema(): HaFormSchema[] {
    return [...BASE_SCHEMA, ...this.extraSchema()];
  }

  private computeLabel = (schema: HaFormSchema): string => {
    return localize(this.hass, this.labels, schema.name) || schema.name;
  };

  private onValueChanged = (ev: CustomEvent<{ value: Record<string, unknown> }>): void => {
    ev.stopPropagation();
    fireEvent(this, "config-changed", { config: { ...this.config, ...ev.detail.value } });
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    `;
  }
}
