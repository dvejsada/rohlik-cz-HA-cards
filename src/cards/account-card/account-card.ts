import { html, nothing, type TemplateResult, type CSSResultGroup } from "lit";
import { customElement, state as litState } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant, LovelaceGridOptions } from "../../core/types";
import { registerCard } from "../../core/register";
import { sharedStyles } from "../../core/styles";
import { getConfigEntryId, callRohlik } from "../../core/actions";
import { formatMoney, parseTs } from "../../core/format";
import { accountCardStyles } from "./styles";
import { strings } from "./strings";
import "./editor";

export type AccountStat = "credit" | "bags" | "no_limit" | "free_express" | "parents_club" | "reusable";

export interface AccountCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-account-card";
  stats?: AccountStat[];
  show_footer?: boolean;
}

const DEFAULT_STATS: AccountStat[] = [
  "credit",
  "bags",
  "no_limit",
  "free_express",
  "parents_club",
  "reusable",
];

interface StatContent {
  icon: string;
  labelKey: string;
  value: string;
  caption?: string;
}

function numberOrNull(value: string | undefined | null): number | null {
  if (value == null || value === "unknown" || value === "unavailable") return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

/**
 * "Account" card: Xtra membership chip, credit/bags/perk stat tiles and a
 * footer with the last order summary and a manual `update_data` refresh.
 */
@customElement("rohlik-account-card")
export class RohlikAccountCard extends RohlikBaseCard<AccountCardConfig> {
  static styles: CSSResultGroup = [sharedStyles, accountCardStyles];

  protected readonly strings = strings;

  @litState() private refreshing = false;

  @litState() private refreshError: string | null = null;

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-account-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<AccountCardConfig> {
    return {
      ...RohlikBaseCard.getStubConfig(hass),
      type: "custom:rohlik-account-card",
    };
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 5, min_columns: 4, min_rows: 3 };
  }

  private statsToShow(): AccountStat[] {
    const configured = this.config?.stats;
    return configured && configured.length > 0 ? configured : DEFAULT_STATS;
  }

  private remainingDays(): number | null {
    const fromSensor = numberOrNull(this.state("premium_days")?.state);
    if (fromSensor != null) return fromSensor;
    const attr = this.attr("is_premium", "remaining_days");
    return typeof attr === "number" ? attr : null;
  }

  private statContent(stat: AccountStat, premiumOn: boolean): StatContent | null {
    switch (stat) {
      case "credit": {
        if (!this.entityId("credit_amount")) return null;
        const amount = numberOrNull(this.state("credit_amount")?.state);
        if (amount == null) return null;
        return { icon: "mdi:cash-multiple", labelKey: "stat_credit", value: formatMoney(this.hass, amount) };
      }
      case "bags": {
        if (!this.entityId("bags_amount")) return null;
        const current = numberOrNull(this.state("bags_amount")?.state);
        if (current == null) return null;
        const max = this.attr("bags_amount", "Max Bags");
        const depositAmount = this.attr("bags_amount", "Deposit Amount");
        const depositCurrency = this.attr("bags_amount", "Deposit Currency");
        const value = typeof max === "number" ? `${current} / ${max}` : String(current);
        let caption: string | undefined;
        if (typeof depositAmount === "number" && depositAmount > 0) {
          const currency = typeof depositCurrency === "string" ? depositCurrency : "CZK";
          caption = this.t("deposit_caption", {
            amount: formatMoney(this.hass, depositAmount, currency),
          });
        }
        return { icon: "mdi:shopping", labelKey: "stat_bags", value, caption };
      }
      case "no_limit": {
        if (!premiumOn || !this.entityId("no_limit")) return null;
        const n = numberOrNull(this.state("no_limit")?.state);
        if (n == null) return null;
        return { icon: "mdi:cash-100", labelKey: "stat_no_limit", value: this.t("remaining", { n }) };
      }
      case "free_express": {
        if (!premiumOn || !this.entityId("free_express")) return null;
        const n = numberOrNull(this.state("free_express")?.state);
        if (n == null) return null;
        return {
          icon: "mdi:truck-fast",
          labelKey: "stat_free_express",
          value: this.t("remaining", { n }),
        };
      }
      case "parents_club": {
        if (!this.entityId("is_parent")) return null;
        return {
          icon: "mdi:human-male-female-child",
          labelKey: "stat_parents_club",
          value: this.isOn("is_parent") ? this.t("yes") : this.t("no"),
        };
      }
      case "reusable": {
        if (!this.entityId("is_reusable")) return null;
        return {
          icon: "mdi:recycle",
          labelKey: "stat_reusable",
          value: this.isOn("is_reusable") ? this.t("yes") : this.t("no"),
        };
      }
      default:
        return null;
    }
  }

  private onRefresh = async (): Promise<void> => {
    if (this.refreshing) return;
    const entityId = this.entityId("credit_amount");
    if (!entityId || !this.hass) return;
    this.refreshing = true;
    this.refreshError = null;
    try {
      const configEntryId = await getConfigEntryId(this.hass, entityId);
      if (!configEntryId) throw new Error("no config entry");
      await callRohlik(this.hass, configEntryId, "update_data");
    } catch {
      this.refreshError = this.t("refresh_failed");
    } finally {
      this.refreshing = false;
    }
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;

    if (this.entities.size === 0) {
      return html`
        <ha-card style=${styleMap(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;
    }

    const premiumOn = this.isOn("is_premium");
    const stats = this.statsToShow();

    return html`
      <ha-card style=${styleMap(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:account-star"></ha-icon>
          <span class="title">${this.deviceName()}</span>
          ${this.renderHeaderChip(premiumOn)}
        </div>

        <div class="stats-grid">${stats.map((stat) => this.renderStat(stat, premiumOn))}</div>

        ${this.config.show_footer !== false ? this.renderFooter() : nothing}
      </ha-card>
    `;
  }

  private renderHeaderChip(premiumOn: boolean): TemplateResult {
    if (!premiumOn) {
      return html`<span class="chip neutral">${this.t("no_xtra")}</span>`;
    }
    const days = this.remainingDays();
    const warn = days != null && days < 7;
    return html`
      <span class="chip ${warn ? "warn" : "ok"}">${this.t("xtra_days", { days: days ?? "—" })}</span>
    `;
  }

  private renderStat(stat: AccountStat, premiumOn: boolean): TemplateResult | typeof nothing {
    const content = this.statContent(stat, premiumOn);
    if (!content) return nothing;
    return html`
      <div class="stat">
        <div class="stat-icon"><ha-icon icon=${content.icon}></ha-icon></div>
        <div class="stat-body">
          <span class="stat-value">${content.value}</span>
          ${content.caption ? html`<span class="stat-caption">${content.caption}</span>` : nothing}
          <span class="stat-label">${this.t(content.labelKey)}</span>
        </div>
      </div>
    `;
  }

  private renderFooter(): TemplateResult {
    return html`
      <div class="account-footer">
        ${this.renderLastOrderLine()}
        <div class="footer-row">
          ${this.renderFreshness()}
          <button
            class="btn ghost icon-btn"
            ?disabled=${this.refreshing}
            @click=${this.onRefresh}
            title=${this.t("refresh")}
          >
            <ha-icon icon="mdi:refresh" class=${classMap({ spin: this.refreshing })}></ha-icon>
          </button>
        </div>
      </div>
      ${this.refreshError ? this.renderError(this.refreshError) : nothing}
    `;
  }

  private renderLastOrderLine(): TemplateResult | typeof nothing {
    const date = parseTs(this.state("last_order")?.state);
    if (!date) return nothing;
    const items = this.attr("last_order", "Items");
    const price = this.attr("last_order", "Price");
    const dateLabel = new Intl.DateTimeFormat(this.hass.locale?.language || "en", {
      day: "numeric",
      month: "short",
    }).format(date);
    const parts = [`${this.t("last_order")} ${dateLabel}`];
    if (typeof items === "number") parts.push(this.t("items_count", { count: items }));
    if (typeof price === "number") parts.push(formatMoney(this.hass, price));
    return html`<div class="last-order">${parts.join(" · ")}</div>`;
  }
}

registerCard({
  type: "rohlik-account-card",
  name: "Rohlík.cz Account",
  description: "Xtra membership status, credit, bags and account perks at a glance.",
  preview: true,
});
