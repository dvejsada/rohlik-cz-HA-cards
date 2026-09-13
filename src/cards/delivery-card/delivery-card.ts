import { html, nothing, type TemplateResult, type CSSResultGroup } from "lit";
import { customElement, state as litState } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant, LovelaceGridOptions } from "../../core/types";
import { registerCard } from "../../core/register";
import { sharedStyles } from "../../core/styles";
import { getConfigEntryId, callRohlik, openMoreInfo } from "../../core/actions";
import { formatTime, formatMoney, formatRelativeDay, formatCountdown, parseTs } from "../../core/format";
import {
  computeDeliveryState,
  findReservedUntil,
  type DeliveryOrderData,
  type DeliverySlotKey,
  type DeliverySlotView,
  type DeliveryStateInput,
  type DeliveryView,
} from "./state";
import { clearMemory, getBrowserStorage, loadRecentDelivery, rememberActiveOrder, resolveDelivery, type RecentDeliveryMemory } from "./memory";
import { deliveryCardStyles } from "./styles";
import { strings } from "./strings";
import "./editor";

export interface DeliveryCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-delivery-card";
  show_announcement?: boolean;
  show_order_summary?: boolean;
  show_express_chip?: boolean;
  show_refresh?: boolean;
  /** Show up to three compact upcoming-slot rows in the "no order" state. */
  show_slots?: boolean;
  /** Show the "Order again on rohlik.cz" link in the "delivered" state. */
  show_shop_link?: boolean;
  compact?: boolean;
  tap_action?: string | { action?: string };
}

const CHIP_KIND: Record<DeliveryView["state"], "ok" | "neutral"> = {
  arriving: "ok",
  ordered: "neutral",
  delivered: "ok",
  none: "neutral",
};

const SLOT_KEYS: readonly DeliverySlotKey[] = ["express", "standard", "eco"];

const SLOT_ICON: Record<DeliverySlotKey, string> = {
  express: "mdi:lightning-bolt",
  standard: "mdi:truck-delivery",
  eco: "mdi:leaf",
};

/**
 * "Next delivery" card: renders `computeDeliveryState`'s output for the
 * `is_ordered` / `next_order_*` / `delivery_time` / `delivery_info` /
 * `last_order` / `first_delivery` / `is_reserved` / `is_express_available`
 * entities on the configured device.
 */
@customElement("rohlik-delivery-card")
export class RohlikDeliveryCard extends RohlikBaseCard<DeliveryCardConfig> {
  static styles: CSSResultGroup = [sharedStyles, deliveryCardStyles];

  protected readonly strings = strings;

  @litState() private refreshing = false;

  @litState() private refreshError: string | null = null;

  private tickTimer: ReturnType<typeof setInterval> | undefined;

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-delivery-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<DeliveryCardConfig> {
    return { ...RohlikBaseCard.getStubConfig(hass), type: "custom:rohlik-delivery-card" };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Countdowns, the ETA progress marker and "delivered" ageing all move on
    // their own — re-render periodically so they stay accurate without
    // requiring a `hass` update.
    this.tickTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.tickTimer !== undefined) {
      clearInterval(this.tickTimer);
      this.tickTimer = undefined;
    }
  }

  public getCardSize(): number {
    return this.config?.compact ? 2 : 4;
  }

  public getGridOptions(): LovelaceGridOptions {
    return this.config?.compact
      ? { columns: 6, rows: 2, min_columns: 6, min_rows: 2 }
      : { columns: 12, rows: 6, min_columns: 6, min_rows: 3 };
  }

  private textState(key: string): string | null {
    const value = this.state(key)?.state;
    if (!value || value === "unknown" || value === "unavailable") return null;
    return value;
  }

  /**
   * Watches `is_ordered` and persists the "an order just finished" marker
   * across reloads (see `./memory.ts`). Called once per `buildInput()`, so
   * once per render — cheap `localStorage` reads/writes, at most every 30s
   * while the card is idle.
   */
  private syncMemory(orderData: DeliveryOrderData | null): RecentDeliveryMemory | null {
    const device = this.config?.device;
    if (!device) return null;
    const storage = getBrowserStorage();

    // While the sensor is unknown/unavailable (HA startup, integration
    // reloading) nothing can be concluded: read the memory, never resolve it.
    const orderedState = this.state("is_ordered")?.state;
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
        till: parseTs(this.state("next_order_till")?.state),
      });
      return null;
    }

    return resolveDelivery(storage, device, new Date());
  }

  private buildInput(): DeliveryStateInput {
    const orderData = (this.attr("is_ordered", "order_data") as DeliveryOrderData | undefined) ?? null;
    return {
      isOrdered: this.isOn("is_ordered"),
      since: parseTs(this.state("next_order_since")?.state),
      till: parseTs(this.state("next_order_till")?.state),
      eta: parseTs(this.state("delivery_time")?.state),
      orderData,
      announcementText: this.textState("delivery_info"),
      announcementExtra: (this.attr("delivery_info", "Additional Content") as string | undefined) ?? null,
      announcementUpdatedAt: parseTs(this.attr("delivery_info", "Updated At") as string | undefined),
      lastOrderAt: parseTs(this.state("last_order")?.state),
      lastOrderItems: (this.attr("last_order", "Items") as number | undefined) ?? null,
      lastOrderPrice: (this.attr("last_order", "Price") as number | undefined) ?? null,
      firstDeliveryText: this.textState("first_delivery"),
      isReserved: this.isOn("is_reserved"),
      isExpressAvailable: this.isOn("is_express_available"),
      recentDelivery: this.syncMemory(orderData),
      slots: SLOT_KEYS.map((key) => ({
        key,
        start: parseTs(this.state(`${key}_slot`)?.state),
        price: (this.attr(`${key}_slot`, "Price") as number | undefined) ?? null,
      })),
    };
  }

  private getView(): DeliveryView {
    return computeDeliveryState(this.buildInput(), new Date());
  }

  private get tapDisabled(): boolean {
    const action = this.config?.tap_action;
    if (action === "none") return true;
    if (action && typeof action === "object" && action.action === "none") return true;
    return false;
  }

  private onHeaderTap = (): void => {
    if (this.tapDisabled) return;
    const entityId = this.entityId("is_ordered");
    if (entityId) openMoreInfo(this, entityId);
  };

  private onHeaderKeydown = (ev: KeyboardEvent): void => {
    if (this.tapDisabled) return;
    if (ev.key !== "Enter" && ev.key !== " ") return;
    ev.preventDefault();
    this.onHeaderTap();
  };

  private onRefresh = async (ev: Event): Promise<void> => {
    ev.stopPropagation();
    if (this.refreshing) return;
    const entityId = this.entityId("is_ordered");
    if (!entityId) return;
    this.refreshing = true;
    this.refreshError = null;
    try {
      const configEntryId = await getConfigEntryId(this.hass, entityId);
      if (!configEntryId) throw new Error("no config entry");
      const view = this.getView();
      const service = view.state === "arriving" || view.state === "ordered"
        ? "update_delivery_times"
        : "refresh_slots";
      await callRohlik(this.hass, configEntryId, service);
    } catch {
      this.refreshError = this.t("refresh_failed");
    } finally {
      this.refreshing = false;
    }
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;

    if (!this.entityId("is_ordered")) {
      return html`
        <ha-card style=${styleMap(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;
    }

    const view = this.getView();

    return html`
      <ha-card style=${styleMap(this.accentStyle)}>
        ${this.config.compact ? this.renderCompact(view) : this.renderFull(view)}
      </ha-card>
    `;
  }

  private renderChips(view: DeliveryView): TemplateResult {
    const showExpress = this.config.show_express_chip !== false && view.isExpressAvailable;
    const showReserved = view.state === "none" && view.isReserved;
    return html`
      <div class="chips">
        <span class="chip ${CHIP_KIND[view.state]}">${this.t(`chip_${view.state}`)}</span>
        ${showExpress ? html`<span class="chip warn">${this.t("chip_express")}</span>` : nothing}
        ${showReserved ? html`<span class="chip neutral">${this.t("chip_reserved")}</span>` : nothing}
      </div>
    `;
  }

  private renderCompact(view: DeliveryView): TemplateResult {
    return html`
      <div
        class="compact-row"
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled ? nothing : "button"}
        tabindex=${this.tapDisabled ? nothing : "0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <div class="headline">
          <span class="big">${this.headlineMain(view)}</span>
        </div>
        <span class="chip ${CHIP_KIND[view.state]}">${this.t(`chip_${view.state}`)}</span>
      </div>
    `;
  }

  private renderFull(view: DeliveryView): TemplateResult {
    const showAnnouncement =
      this.config.show_announcement !== false &&
      (view.state === "arriving" || view.state === "ordered") &&
      !!view.announcementText;
    const showSummary = this.config.show_order_summary !== false && view.summaryItems != null;
    const showRefresh = this.config.show_refresh !== false;
    const showSub =
      (view.state === "arriving" || view.state === "ordered") && !!view.since && !!view.till;
    const showSlots = this.config.show_slots !== false && view.state === "none" && view.slots.length > 0;
    const showShopLink = this.config.show_shop_link !== false && view.state === "delivered";
    const reservedUntil =
      view.state === "none" && view.isReserved
        ? findReservedUntil(this.state("is_reserved")?.attributes)
        : null;
    const caption = this.headlineCaption(view);

    return html`
      <div
        class=${classMap({ header: true, static: this.tapDisabled })}
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled ? nothing : "button"}
        tabindex=${this.tapDisabled ? nothing : "0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <span class="title">${this.config.name || this.t("title")}</span>
        ${this.renderChips(view)}
      </div>

      <div class="headline">
        <span class="big">${this.headlineMain(view)}</span>
      </div>
      ${caption ? html`<div class="caption">${caption}</div>` : nothing}

      ${showSub ? html`<div class="sub">${this.renderSub(view)}</div>` : nothing}
      ${view.state === "arriving" ? this.renderTrack(view) : nothing}
      ${reservedUntil
        ? html`<div class="reserved-line">${this.t("reserved_until", { time: formatTime(this.hass, reservedUntil) })}</div>`
        : nothing}
      ${showSlots ? this.renderSlots(view) : nothing}
      ${showAnnouncement ? html`<div class="row">${this.renderAnnouncement(view)}</div>` : nothing}
      ${showSummary ? html`<div class="row">${this.renderSummary(view)}</div>` : nothing}
      ${this.refreshError ? html`<div class="error">${this.refreshError}</div>` : nothing}
      ${showRefresh || showShopLink
        ? html`
            <div class="actions">
              ${showShopLink
                ? html`
                    <a class="btn ghost" href="https://www.rohlik.cz" target="_blank" rel="noopener">
                      ${this.t("shop_link")}
                    </a>
                  `
                : nothing}
              ${showRefresh
                ? html`
                    <button class="btn ghost" ?disabled=${this.refreshing} @click=${this.onRefresh}>
                      <ha-icon
                        icon="mdi:refresh"
                        class=${classMap({ spin: this.refreshing })}
                      ></ha-icon>
                      ${this.t("refresh")}
                    </button>
                  `
                : nothing}
            </div>
          `
        : nothing}
      ${this.renderFreshness()}
    `;
  }

  private renderSlots(view: DeliveryView): TemplateResult {
    return html`<div class="slots">${view.slots.map((slot) => this.renderSlotRow(slot))}</div>`;
  }

  private renderSlotRow(slot: DeliverySlotView): TemplateResult {
    const day = formatRelativeDay(this.hass, slot.start, {
      today: this.t("today"),
      tomorrow: this.t("tomorrow"),
    });
    const price = slot.price === 0 ? this.t("free") : slot.price != null ? formatMoney(this.hass, slot.price) : "";
    return html`
      <div class="slot-row">
        <ha-icon icon=${SLOT_ICON[slot.key]}></ha-icon>
        <span class="slot-label">${this.t(`slot_${slot.key}`)}</span>
        <span class="slot-day">${day}</span>
        <span class="slot-price">${price}</span>
      </div>
    `;
  }

  private headlineMain(view: DeliveryView): string {
    switch (view.state) {
      case "arriving":
        return view.eta ? formatTime(this.hass, view.eta) : view.till ? formatTime(this.hass, view.till) : "—";
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

  private headlineCaption(view: DeliveryView): string {
    switch (view.state) {
      case "arriving":
        return this.t(view.eta ? "estimated" : "by");
      case "ordered":
        return view.since ? formatCountdown(this.hass, view.since) : "";
      case "delivered":
        return this.t("delivered_caption");
      case "none":
      default:
        return this.t("nearest_slot");
    }
  }

  private renderSub(view: DeliveryView): TemplateResult | typeof nothing {
    if (!view.since || !view.till) return nothing;
    const dayLabel = formatRelativeDay(this.hass, view.since, {
      today: this.t("today"),
      tomorrow: this.t("tomorrow"),
    });
    const parts = [`${this.t("window")} ${dayLabel} – ${formatTime(this.hass, view.till)}`];
    if (view.orderId != null) parts.push(`${this.t("order")} ${view.orderId}`);
    return html`${parts.join(" · ")}`;
  }

  private renderTrack(view: DeliveryView): TemplateResult | typeof nothing {
    if (!view.since || !view.till || view.progress == null) return nothing;
    const mid = new Date((view.since.getTime() + view.till.getTime()) / 2);
    return html`
      <div class="track-wrap">
        <div class="track">
          <div class="track-fill" style=${styleMap({ width: `${view.progress * 100}%` })}></div>
          <div class="track-marker" style=${styleMap({ left: `${view.progress * 100}%` })}></div>
        </div>
        <div class="ticks">
          <span>${formatTime(this.hass, view.since)}</span>
          <span>${formatTime(this.hass, mid)}</span>
          <span>${formatTime(this.hass, view.till)}</span>
        </div>
      </div>
    `;
  }

  private renderAnnouncement(view: DeliveryView): TemplateResult {
    return html`
      <div class="announce">
        <span class="text">${view.announcementText}</span>
        <span class="meta">
          ${view.announcementUpdatedAt
            ? this.t("announcement_updated", { time: formatTime(this.hass, view.announcementUpdatedAt) })
            : nothing}
          ${view.announcementExtra ? ` · ${view.announcementExtra}` : nothing}
        </span>
      </div>
    `;
  }

  private renderSummary(view: DeliveryView): TemplateResult {
    const itemsLabel = this.t("items_count", { count: view.summaryItems ?? 0 });
    const priceLabel = view.summaryPrice != null ? formatMoney(this.hass, view.summaryPrice) : "";
    return html`<span>${[itemsLabel, priceLabel].filter(Boolean).join(" · ")}</span>`;
  }
}

registerCard({
  type: "rohlik-delivery-card",
  name: "Rohlík.cz Next Delivery",
  description: "Shows the state of your next Rohlík.cz order: ordered, on its way, or delivered.",
  preview: true,
});
