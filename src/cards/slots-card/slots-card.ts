import { html, nothing, type TemplateResult, type CSSResultGroup, type PropertyValues } from "lit";
import { customElement, state as litState } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant, LovelaceGridOptions } from "../../core/types";
import { registerCard } from "../../core/register";
import { sharedStyles } from "../../core/styles";
import { getConfigEntryId, callRohlik } from "../../core/actions";
import { formatMoney, formatRelativeDay } from "../../core/format";
import {
  DEFAULT_SLOTS,
  SLOT_ICONS,
  capacityLevel,
  clampCapacityPercent,
  readSlot,
  type SlotData,
  type SlotType,
} from "./slots";
import { slotsCardStyles } from "./styles";
import { strings } from "./strings";
import "./editor";

export interface SlotsCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-slots-card";
  slots?: SlotType[];
  show_price?: boolean;
  show_location?: boolean;
  watch_interval?: number;
  layout?: "row" | "column";
}

const DEFAULT_WATCH_INTERVAL = 15;
const MIN_WATCH_INTERVAL = 10;

/**
 * "Delivery slots" card: express/standard/eco slot tiles (time, price,
 * remaining capacity) plus an opt-in "watch express" poller that calls
 * `refresh_slots` every few seconds while the tab is visible.
 */
@customElement("rohlik-slots-card")
export class RohlikSlotsCard extends RohlikBaseCard<SlotsCardConfig> {
  static styles: CSSResultGroup = [sharedStyles, slotsCardStyles];

  protected readonly strings = strings;

  @litState() private watching = false;

  @litState() private pollError: string | null = null;

  private pollTimer: ReturnType<typeof setInterval> | undefined;

  private pollSeconds: number | undefined;

  private readonly onVisibilityChange = (): void => this.syncPolling();

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-slots-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<SlotsCardConfig> {
    return {
      ...RohlikBaseCard.getStubConfig(hass),
      type: "custom:rohlik-slots-card",
      slots: [...DEFAULT_SLOTS],
      show_price: true,
      show_location: true,
      watch_interval: DEFAULT_WATCH_INTERVAL,
      layout: "row",
    };
  }

  public getGridOptions(): LovelaceGridOptions {
    if (this.config?.layout === "column") {
      return { columns: 4, rows: 4, min_columns: 3, min_rows: 3 };
    }
    return { columns: 12, rows: 2, min_columns: 6, min_rows: 2 };
  }

  public setConfig(config: SlotsCardConfig): void {
    super.setConfig(config);
    this.watching = this.loadWatchFlag();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.syncPolling();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.stopPolling();
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    // Cheap and idempotent: re-syncs the poll timer against the current
    // `watching` flag and `watch_interval` config on every update, since
    // both are private/protected fields `PropertyValueMap#has` can't key on.
    this.syncPolling();
  }

  private watchStorageKey(): string | null {
    const device = this.config?.device;
    return device ? `rohlik-slots-watch:${device}` : null;
  }

  private loadWatchFlag(): boolean {
    const key = this.watchStorageKey();
    if (!key) return false;
    try {
      return localStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  }

  private saveWatchFlag(value: boolean): void {
    const key = this.watchStorageKey();
    if (!key) return;
    try {
      localStorage.setItem(key, value ? "1" : "0");
    } catch {
      /* ignore: private mode / disabled storage */
    }
  }

  /**
   * Starts/stops/reschedules the poll timer to match the current watching
   * flag and `watch_interval`. Safe to call on every `willUpdate` — it only
   * touches the timer when something relevant actually changed, so a stream
   * of unrelated `hass` updates never resets an in-flight countdown.
   */
  private syncPolling(): void {
    const shouldPoll = this.watching && document.visibilityState === "visible" && !!this.config;
    const seconds = Math.max(
      MIN_WATCH_INTERVAL,
      this.config?.watch_interval ?? DEFAULT_WATCH_INTERVAL,
    );
    if (shouldPoll) {
      if (this.pollTimer === undefined || this.pollSeconds !== seconds) {
        this.stopPolling();
        this.pollTimer = setInterval(() => void this.poll(), seconds * 1000);
        this.pollSeconds = seconds;
      }
    } else {
      this.stopPolling();
    }
  }

  private stopPolling(): void {
    if (this.pollTimer !== undefined) {
      clearInterval(this.pollTimer);
      this.pollTimer = undefined;
    }
    this.pollSeconds = undefined;
  }

  private async poll(): Promise<void> {
    const entityId =
      this.entityId("express_slot") ?? this.entityId("standard_slot") ?? this.entityId("eco_slot");
    if (!entityId || !this.hass) return;
    try {
      const configEntryId = await getConfigEntryId(this.hass, entityId);
      if (!configEntryId) throw new Error("no config entry");
      await callRohlik(this.hass, configEntryId, "refresh_slots");
      this.pollError = null;
    } catch {
      this.pollError = this.t("watch_error");
    }
  }

  private toggleWatch = (): void => {
    this.watching = !this.watching;
    this.saveWatchFlag(this.watching);
    if (this.watching) this.pollError = null;
  };

  private slotsToShow(): SlotType[] {
    const configured = this.config?.slots;
    return configured && configured.length > 0 ? configured : DEFAULT_SLOTS;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;

    if (this.entities.size === 0) {
      return html`
        <ha-card style=${styleMap(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;
    }

    const slots = this.slotsToShow();
    const expressAvailable = this.isOn("is_express_available");
    const showLocation = this.config.show_location !== false;
    const location = this.attr("first_delivery", "delivery_location");

    return html`
      <ha-card style=${styleMap(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span class="title">${this.config.name || this.t("title")}</span>
          <button
            class=${classMap({ chip: true, neutral: !this.watching, "watch-btn": true, watching: this.watching })}
            @click=${this.toggleWatch}
            aria-pressed=${this.watching}
          >
            <ha-icon icon=${this.watching ? "mdi:eye" : "mdi:eye-outline"}></ha-icon>
            ${this.t("watch_toggle")}
            ${this.watching ? html`<span class="pulse-dot"></span>` : nothing}
          </button>
          <span class="chip ${expressAvailable ? "warn" : "neutral"}">
            ${expressAvailable ? this.t("express_available") : this.t("no_express")}
          </span>
        </div>

        ${showLocation && typeof location === "string" && location
          ? html`
              <div class="location">
                <ha-icon icon="mdi:map-marker"></ha-icon>
                <span>${location}</span>
              </div>
            `
          : nothing}
        ${this.pollError ? this.renderError(this.pollError) : nothing}

        <div
          class=${classMap({ "slots-grid": true, column: this.config.layout === "column" })}
          style=${styleMap({ "--rohlik-slot-count": String(slots.length) })}
        >
          ${slots.map((type) => this.renderTile(type))}
        </div>

        ${this.renderFreshness()}
      </ha-card>
    `;
  }

  private renderTile(type: SlotType): TemplateResult {
    const slot = readSlot(type, this.state(`${type}_slot`));
    const icon = SLOT_ICONS[type];
    const label = slot.title || this.t(`slot_${type}`);

    if (!slot.available) {
      return html`
        <div class="tile muted">
          <div class="tile-head"><ha-icon icon=${icon}></ha-icon><span>${label}</span></div>
          <div class="tile-unavailable">${this.t("unavailable")}</div>
        </div>
      `;
    }

    return html`
      <div class="tile">
        <div class="tile-head"><ha-icon icon=${icon}></ha-icon><span>${label}</span></div>
        <div class="tile-time">${formatRelativeDay(this.hass, slot.start as Date, {
          today: this.t("today"),
          tomorrow: this.t("tomorrow"),
        })}</div>
        ${slot.subtitle ? html`<div class="tile-subtitle">${slot.subtitle}</div>` : nothing}
        ${this.renderPrice(slot)}
        ${this.renderCapacity(slot)}
      </div>
    `;
  }

  private renderPrice(slot: SlotData): TemplateResult | typeof nothing {
    if (this.config.show_price === false || slot.price == null) return nothing;
    const label = slot.price === 0 ? this.t("free") : formatMoney(this.hass, slot.price);
    return html`<div class="tile-caption">${label}</div>`;
  }

  private renderCapacity(slot: SlotData): TemplateResult | typeof nothing {
    if (slot.capacityPercent == null) return nothing;
    const level = capacityLevel(slot.capacityPercent);
    return html`
      <div class="capacity-bar">
        <div
          class=${classMap({ "capacity-fill": true, [level]: true })}
          style=${styleMap({ width: `${clampCapacityPercent(slot.capacityPercent)}%` })}
        ></div>
      </div>
      ${slot.capacityMessage ? html`<div class="capacity-msg">${slot.capacityMessage}</div>` : nothing}
    `;
  }
}

registerCard({
  type: "rohlik-slots-card",
  name: "Rohlík.cz Delivery Slots",
  description: "Express, standard and eco delivery slot times, prices and remaining capacity.",
  preview: true,
});
