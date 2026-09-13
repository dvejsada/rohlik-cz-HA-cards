import { html, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant } from "../../core/types";
import { registerCard } from "../../core/register";
import { strings } from "./strings";
import "./editor";

export interface PlaceholderCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-placeholder-card";
}

/**
 * Exercises the whole Phase 0 foundation (base card, editor, styles,
 * localization, freshness footer). Deleted once the real Phase 1 cards land.
 */
@customElement("rohlik-placeholder-card")
export class RohlikPlaceholderCard extends RohlikBaseCard<PlaceholderCardConfig> {
  protected readonly strings = strings;

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-placeholder-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<PlaceholderCardConfig> {
    return { ...RohlikBaseCard.getStubConfig(hass), type: "custom:rohlik-placeholder-card" };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    return html`
      <ha-card style=${this.styleMap()}>
        <div class="header">
          <ha-icon icon="mdi:truck-delivery"></ha-icon>
          <span class="title">${this.deviceName()}</span>
          <span class="chip ok">${this.t("status_ok")}</span>
        </div>
        ${this.renderFreshness()}
      </ha-card>
    `;
  }

  private styleMap(): string {
    return Object.entries(this.accentStyle)
      .map(([key, value]) => `${key}:${value}`)
      .join(";");
  }
}

registerCard({
  type: "rohlik-placeholder-card",
  name: "Rohlík.cz Placeholder",
  description: "Phase 0 foundation smoke test — replaced by the real cards.",
});
