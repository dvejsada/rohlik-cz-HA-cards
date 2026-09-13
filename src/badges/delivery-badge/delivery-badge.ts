import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HassEntity, HomeAssistant, LovelaceCardConfig } from "../../core/types";
import { findRohlikDevices, resolveEntities } from "../../core/discovery";
import { openMoreInfo } from "../../core/actions";
import { formatRelativeDay, formatTime, parseTs } from "../../core/format";
import { coreStrings, localize, withLanguage, type CardLanguage } from "../../core/localize";
import { registerBadge } from "../../core/register";
import { computeDeliveryState, type DeliveryOrderData, type DeliveryStateInput, type DeliveryView } from "../../cards/delivery-card/state";
import { clearMemory, getBrowserStorage, loadRecentDelivery, rememberActiveOrder, resolveDelivery, type RecentDeliveryMemory } from "../../cards/delivery-card/memory";
import { strings } from "./strings";
import "./editor";

export interface DeliveryBadgeConfig extends LovelaceCardConfig {
  type: "custom:rohlik-delivery-badge";
  device: string;
  name?: string;
  accent?: string;
  show_name?: boolean;
  /** Badge language; unset or `auto` follows the Home Assistant UI language. */
  language?: CardLanguage | "auto";
}

/**
 * Compact badge counterpart of `rohlik-delivery-card`: same
 * `computeDeliveryState` machine, rendered as a small HA-style pill. Does
 * not extend `RohlikBaseCard` (badges have a much smaller lifecycle than
 * cards) but reuses every other core helper.
 */
@customElement("rohlik-delivery-badge")
export class RohlikDeliveryBadge extends LitElement {
  static styles = css`
    :host {
      --rohlik-accent: var(--primary-color);
      display: inline-flex;
      max-width: 100%;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 36px;
      padding: 0 12px 0 6px;
      box-sizing: border-box;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color));
      cursor: pointer;
      max-width: 100%;
    }

    .badge:focus-visible {
      outline: 2px solid var(--rohlik-accent);
      outline-offset: 2px;
    }

    .icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      flex-shrink: 0;
      background: color-mix(in srgb, var(--rohlik-icon-color, var(--rohlik-accent)) 15%, transparent);
    }

    ha-icon {
      color: var(--rohlik-icon-color, var(--rohlik-accent));
      --mdc-icon-size: 16px;
    }

    .text {
      display: flex;
      flex: 1;
      min-width: 0;
      flex-direction: column;
      overflow: hidden;
      line-height: 1.2;
    }

    .label {
      color: var(--secondary-text-color);
      font-size: 0.65rem;
      text-transform: uppercase;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      color: var(--primary-text-color);
      font-size: 0.8rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  private _hass!: HomeAssistant;

  private _localeHass?: HomeAssistant;

  /**
   * `hass` as seen by the badge. When `config.language` is set to `cs`/`en`
   * this is a shallow copy whose locale speaks that language, so every
   * formatter and `t()` call follows the option without extra plumbing —
   * same pattern as `RohlikBaseCard` (the badge doesn't extend it, since
   * badges have a much smaller lifecycle than cards).
   */
  @property({ attribute: false })
  public get hass(): HomeAssistant {
    return this._localeHass ?? this._hass;
  }

  public set hass(value: HomeAssistant) {
    const old = this.hass;
    this._hass = value;
    this._localeHass = this.applyLanguage(value);
    this.requestUpdate("hass", old);
  }

  private applyLanguage(hass: HomeAssistant | undefined): HomeAssistant | undefined {
    if (!hass || !this.config?.language || this.config.language === "auto") return undefined;
    const localized = withLanguage(hass, this.config.language);
    return localized === hass ? undefined : localized;
  }

  @state() private config!: DeliveryBadgeConfig;

  @state() private entities: Map<string, string> = new Map();

  public setConfig(config: DeliveryBadgeConfig): void {
    if (!config?.device) {
      throw new Error(
        "Rohlík badge: 'device' is required — pick the Rohlík.cz device in the badge editor.",
      );
    }
    this.config = config;
    this._localeHass = this.applyLanguage(this._hass);
    if (this.hass) {
      this.entities = resolveEntities(this.hass, this.config.device);
    }
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("hass") && this.hass && this.config) {
      this.entities = resolveEntities(this.hass, this.config.device);
    }
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-delivery-badge-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<DeliveryBadgeConfig> {
    const devices = findRohlikDevices(hass);
    return { device: devices[0]?.id ?? "" };
  }

  private entityId(key: string): string | undefined {
    return this.entities.get(key);
  }

  private entityState(key: string): HassEntity | undefined {
    const entityId = this.entityId(key);
    return entityId ? this.hass?.states?.[entityId] : undefined;
  }

  private attr(key: string, name: string): unknown {
    return this.entityState(key)?.attributes?.[name];
  }

  private isOn(key: string): boolean {
    return this.entityState(key)?.state === "on";
  }

  private textState(key: string): string | null {
    const value = this.entityState(key)?.state;
    if (!value || value === "unknown" || value === "unavailable") return null;
    return value;
  }

  private t(key: string, vars?: Record<string, string | number>): string {
    return localize(this.hass, { ...coreStrings, ...strings }, key, vars);
  }

  private deviceName(): string {
    if (this.config?.name) return this.config.name;
    const device = this.hass?.devices?.[this.config?.device];
    return device?.name_by_user || device?.name || "Rohlík.cz";
  }

  /** Same "watch `is_ordered` flip off" memory the card keeps — see `cards/delivery-card/memory.ts`. */
  private syncMemory(orderData: DeliveryOrderData | null): RecentDeliveryMemory | null {
    const device = this.config?.device;
    if (!device) return null;
    const storage = getBrowserStorage();

    // While the sensor is unknown/unavailable (HA startup, integration
    // reloading) nothing can be concluded: read the memory, never resolve it.
    const orderedState = this.entityState("is_ordered")?.state;
    if (orderedState !== "on" && orderedState !== "off") {
      return loadRecentDelivery(storage, device);
    }

    if (this.isOn("is_ordered")) {
      const orderId = orderData?.id ?? null;
      const previous = loadRecentDelivery(storage, device);
      if (previous && orderId != null && previous.orderId !== orderId) {
        clearMemory(storage, device);
      }
      rememberActiveOrder(storage, device, {
        orderId,
        till: parseTs(this.entityState("next_order_till")?.state),
      });
      return null;
    }

    return resolveDelivery(storage, device, new Date());
  }

  private buildInput(): DeliveryStateInput {
    const orderData = (this.attr("is_ordered", "order_data") as DeliveryOrderData | undefined) ?? null;
    return {
      isOrdered: this.isOn("is_ordered"),
      since: parseTs(this.entityState("next_order_since")?.state),
      till: parseTs(this.entityState("next_order_till")?.state),
      eta: parseTs(this.entityState("delivery_time")?.state),
      orderData,
      announcementText: this.textState("delivery_info"),
      announcementExtra: (this.attr("delivery_info", "Additional Content") as string | undefined) ?? null,
      announcementUpdatedAt: parseTs(this.attr("delivery_info", "Updated At") as string | undefined),
      lastOrderAt: parseTs(this.entityState("last_order")?.state),
      lastOrderItems: (this.attr("last_order", "Items") as number | undefined) ?? null,
      lastOrderPrice: (this.attr("last_order", "Price") as number | undefined) ?? null,
      firstDeliveryText: this.textState("first_delivery"),
      isReserved: this.isOn("is_reserved"),
      isExpressAvailable: this.isOn("is_express_available"),
      recentDelivery: this.syncMemory(orderData),
    };
  }

  private onClick = (): void => {
    const entityId = this.entityId("is_ordered");
    if (entityId) openMoreInfo(this, entityId);
  };

  private onKeydown = (ev: KeyboardEvent): void => {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    ev.preventDefault();
    this.onClick();
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass || !this.entityId("is_ordered")) return nothing;

    const view = computeDeliveryState(this.buildInput(), new Date());
    const warn = view.state === "none" && view.isExpressAvailable;
    const hostStyle = {
      ...(this.config.accent ? { "--rohlik-accent": this.config.accent } : {}),
      ...(warn ? { "--rohlik-icon-color": "var(--warning-color)" } : {}),
    };
    const label = this.config.show_name
      ? `${this.deviceName()} · ${this.t(`chip_${view.state}`)}`
      : this.t(`chip_${view.state}`);

    return html`
      <div
        class="badge"
        style=${styleMap(hostStyle)}
        @click=${this.onClick}
        @keydown=${this.onKeydown}
        role="button"
        tabindex="0"
      >
        <div class="icon-circle">
          <ha-icon icon=${view.state === "delivered" ? "mdi:check" : "mdi:truck-delivery"}></ha-icon>
        </div>
        <div class="text">
          <span class="label">${label}</span>
          <span class="value">${this.value(view)}</span>
        </div>
      </div>
    `;
  }

  private value(view: DeliveryView): string {
    switch (view.state) {
      case "arriving":
        return view.eta
          ? formatTime(this.hass, view.eta)
          : view.till
            ? formatTime(this.hass, view.till)
            : "—";
      case "ordered":
        return view.since
          ? formatRelativeDay(this.hass, view.since, { today: this.t("today"), tomorrow: this.t("tomorrow") })
          : "—";
      case "delivered":
        return view.deliveredAt ? formatTime(this.hass, view.deliveredAt) : "—";
      case "none":
      default:
        return view.firstDeliveryText ?? "—";
    }
  }
}

registerBadge({
  type: "rohlik-delivery-badge",
  name: "Rohlík.cz Delivery Badge",
  description: "Compact status pill for your next Rohlík.cz delivery.",
  preview: true,
});
