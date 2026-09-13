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
  {
    name: "language",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "auto", label: "Auto (Home Assistant)" },
          { value: "cs", label: "Čeština" },
          { value: "en", label: "English" },
        ],
      },
    },
  },
];

/** Labels for the base fields, merged under every editor's own `labels`. */
const BASE_LABELS: Dict = {
  cs: { device: "Zařízení (účet Rohlík.cz)", name: "Vlastní název", language: "Jazyk karty" },
  en: { device: "Device (Rohlík.cz account)", name: "Custom name", language: "Card language" },
};

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

  /**
   * Option defaults the card applies when a key is absent. They are merged
   * into the form data so toggles show the real effective value instead of
   * an unchecked box for an option that is actually on.
   */
  protected readonly defaults: Partial<C> = {};

  setConfig(config: C): void {
    this.config = config;
  }

  private get schema(): HaFormSchema[] {
    return [...BASE_SCHEMA, ...this.extraSchema()];
  }

  private computeLabel = (schema: HaFormSchema): string => {
    const merged: Dict = {};
    for (const lng of new Set([...Object.keys(BASE_LABELS), ...Object.keys(this.labels)])) {
      merged[lng] = { ...BASE_LABELS[lng], ...this.labels[lng] };
    }
    return localize(this.hass, merged, schema.name) || schema.name;
  };

  private get formData(): Record<string, unknown> {
    return { language: "auto", ...this.defaults, ...this.config };
  }

  private onValueChanged = (ev: CustomEvent<{ value: Record<string, unknown> }>): void => {
    ev.stopPropagation();
    const next: Record<string, unknown> = { ...this.config, ...ev.detail.value };
    // Keep the stored YAML minimal: drop keys that equal the defaults and
    // the "auto" language sentinel.
    if (next.language === "auto" || next.language === "") delete next.language;
    for (const [key, value] of Object.entries(this.defaults)) {
      if (key in next && next[key] === value) delete next[key];
    }
    fireEvent(this, "config-changed", { config: next });
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    `;
  }
}
