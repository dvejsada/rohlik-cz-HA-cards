import { html, nothing, type TemplateResult, type CSSResultGroup, type PropertyValues } from "lit";
import { customElement, state as litState } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant, LovelaceGridOptions } from "../../core/types";
import { registerCard, suggestForKeys } from "../../core/register";
import { sharedStyles } from "../../core/styles";
import { getConfigEntryId, callRohlik } from "../../core/actions";
import { formatRelativeDay, formatTime, lang } from "../../core/format";
import {
  DEFAULT_SLOTS,
  SLOT_ICONS,
  capacityLevel,
  clampCapacityPercent,
  readSlot,
  type SlotData,
  type SlotType,
} from "./slots";
import {
  freeCount,
  groupByDay,
  lengthsOf,
  pickDay,
  readWindows,
  windowsFor,
  type DeliveryDay,
  type DeliveryWindow,
} from "./windows";
import { slotsCardStyles } from "./styles";
import { strings } from "./strings";
import "./editor";

export interface SlotsCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-slots-card";
  slots?: SlotType[];
  show_price?: boolean;
  show_location?: boolean;
  watch_interval?: number;
  layout?: "auto" | "row" | "column";
  /** Show the express/standard/eco tiles (default true). */
  show_tiles?: boolean;
  /** Show every delivery window with a day picker (needs HA-RohlikCZ 1.3+). */
  show_windows?: boolean;
  /** Leave out booked-out windows in the window list. */
  hide_booked?: boolean;
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

  /** Day shown in the window list (`YYYY-MM-DD`), remembered per device. */
  @litState() private selectedDay: string | null = null;

  /** Window length shown in the window list: 60 or 15 minutes. */
  @litState() private selectedLength = 60;

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
    };
  }

  public getGridOptions(): LovelaceGridOptions {
    if (this.config?.show_windows) {
      return { columns: 12, rows: "auto", min_columns: 6 };
    }
    if (this.config?.layout === "column") {
      return { columns: 4, rows: "auto", min_columns: 3, min_rows: 4 };
    }
    return { columns: 12, rows: "auto", min_columns: 6, min_rows: 2 };
  }

  protected estimatedCardSize(): number {
    return this.config?.layout === "column" ? 9 : 6;
  }

  public setConfig(config: SlotsCardConfig): void {
    super.setConfig(config);
    this.watching = this.loadWatchFlag();
    const choice = this.loadChoice();
    this.selectedDay = choice.day;
    this.selectedLength = choice.length;
  }

  private choiceStorageKey(): string | null {
    const device = this.config?.device;
    return device ? `rohlik-slots-choice:${device}` : null;
  }

  private loadChoice(): { day: string | null; length: number } {
    const key = this.choiceStorageKey();
    try {
      const raw = key ? localStorage.getItem(key) : null;
      const parsed = raw ? (JSON.parse(raw) as { day?: unknown; length?: unknown }) : {};
      return {
        day: typeof parsed.day === "string" ? parsed.day : null,
        length: parsed.length === 15 ? 15 : 60,
      };
    } catch {
      return { day: null, length: 60 };
    }
  }

  private saveChoice(): void {
    const key = this.choiceStorageKey();
    if (!key) return;
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ day: this.selectedDay, length: this.selectedLength }),
      );
    } catch {
      /* ignore: private mode / disabled storage */
    }
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
    const layout = this.config.layout ?? "auto";

    return html`
      <ha-card style=${styleMap(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span class="title">${this.config.name || this.t("title")}</span>
          <div class="header-actions">
            <button
              class=${classMap({ "icon-toggle": true, on: this.watching })}
              @click=${this.toggleWatch}
              aria-pressed=${this.watching}
              aria-label=${this.t("watch_toggle")}
              title=${this.t("watch_toggle")}
            >
              <ha-icon icon=${this.watching ? "mdi:eye" : "mdi:eye-outline"}></ha-icon>
              ${this.watching ? html`<span class="pulse-dot"></span>` : nothing}
            </button>
            <span class="chip ${expressAvailable ? "warn" : "neutral"}">
              ${expressAvailable ? this.t("express_available") : this.t("no_express")}
            </span>
          </div>
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

        ${this.config.show_tiles === false
          ? nothing
          : html`
              <div
                class=${classMap({ "slots-grid": true, column: layout === "column", auto: layout === "auto" })}
                style=${styleMap({ "--rohlik-slot-count": String(slots.length) })}
              >
                ${slots.map((type) => this.renderTile(type))}
              </div>
            `}
        ${this.config.show_windows ? this.renderWindows() : nothing}

        ${this.renderFreshness()}
      </ha-card>
    `;
  }

  private selectDay(date: string): void {
    this.selectedDay = date;
    this.saveChoice();
  }

  private selectLength(minutes: number): void {
    this.selectedLength = minutes;
    this.saveChoice();
  }

  /** "Heute" / "Morgen" / "Fr. 27.11." for a `YYYY-MM-DD` day. */
  private dayLabel(date: string): string {
    const [y, m, d] = date.split("-").map(Number);
    const day = new Date(y, (m ?? 1) - 1, d ?? 1);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const same = (a: Date, b: Date): boolean => a.toDateString() === b.toDateString();
    if (same(day, today)) return this.t("today");
    if (same(day, tomorrow)) return this.t("tomorrow");
    return new Intl.DateTimeFormat(lang(this.hass), {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    }).format(day);
  }

  private renderWindows(): TemplateResult {
    if (!this.entityId("delivery_slots")) {
      return html`<div class="windows-hint">${this.t("windows_needs_update")}</div>`;
    }
    const days = groupByDay(readWindows(this.state("delivery_slots")));
    if (days.length === 0) {
      return html`<div class="windows-hint">${this.t("windows_empty")}</div>`;
    }
    const day = pickDay(days, this.selectedDay);
    const lengths = lengthsOf(day);
    const length = lengths.includes(this.selectedLength) ? this.selectedLength : (lengths[0] ?? 60);
    const windows = windowsFor(day, length, this.config.hide_booked === true);

    return html`
      <div class="windows">
        <div class="day-chips" role="tablist" aria-label=${this.t("windows_days")}>
          ${days.map((d) => this.renderDayChip(d, d.date === day?.date))}
        </div>
        ${lengths.length > 1
          ? html`
              <div class="segmented" role="group" aria-label=${this.t("windows_length")}>
                ${lengths.map(
                  (m) => html`
                    <button
                      class=${classMap({ seg: true, on: m === length })}
                      aria-pressed=${m === length}
                      @click=${() => this.selectLength(m)}
                    >
                      ${m === 15 ? this.t("windows_quarter") : this.t("windows_hour")}
                      <span class="seg-count">${freeCount(day, m)}</span>
                    </button>
                  `,
                )}
              </div>
            `
          : nothing}
        ${windows.length === 0
          ? html`<div class="windows-hint">${this.t("windows_none_free")}</div>`
          : html`<div class=${classMap({ "window-grid": true, quarter: length === 15 })}>
              ${windows.map((w) => this.renderWindow(w))}
            </div>`}
      </div>
    `;
  }

  private renderDayChip(day: DeliveryDay, selected: boolean): TemplateResult {
    const free = freeCount(day);
    return html`
      <button
        class=${classMap({ "day-chip": true, on: selected, none: free === 0 })}
        role="tab"
        aria-selected=${selected}
        @click=${() => this.selectDay(day.date)}
      >
        <span class="day-name">${this.dayLabel(day.date)}</span>
        <span class="day-free">
          ${free === 0 ? this.t("windows_booked") : this.t("windows_free_count", { count: free })}
        </span>
      </button>
    `;
  }

  private renderWindow(w: DeliveryWindow): TemplateResult {
    const booked = w.free <= 0;
    const time = w.end
      ? `${formatTime(this.hass, w.start)} – ${formatTime(this.hass, w.end)}`
      : formatTime(this.hass, w.start);
    const extra: string[] = [];
    if (booked) extra.push(this.t("windows_booked"));
    else extra.push(this.t("windows_free_percent", { percent: Math.round(w.free) }));
    if (!booked && this.config.show_price !== false && w.price > 0) extra.push(this.money(w.price));
    // Red is kept for errors: little room left is amber, booked out is grey.
    const level = booked ? "none" : w.free >= 50 ? "ok" : "warn";

    return html`
      <div class=${classMap({ window: true, booked })} title=${`${time} · ${extra.join(" · ")}`}>
        <div class="window-time">
          ${time}
          ${w.eco && !booked ? html`<ha-icon icon="mdi:leaf" class="eco"></ha-icon>` : nothing}
        </div>
        <div class="window-meta">${extra.join(" · ")}</div>
        ${booked
          ? nothing
          : html`<div class="capacity-bar"><div
              class=${classMap({ "capacity-fill": true, [level]: true })}
              style=${styleMap({ width: `${clampCapacityPercent(w.free)}%` })}
            ></div></div>`}
      </div>
    `;
  }

  private renderTile(type: SlotType): TemplateResult {
    const slot = readSlot(type, this.state(`${type}_slot`));
    const icon = SLOT_ICONS[type];
    const label = this.t(`slot_${type}`);
    const message = slot.capacityMessage ?? slot.subtitle ?? "";

    return html`
      <div class="tile">
        <div class="tile-head"><ha-icon icon=${icon}></ha-icon><span>${label}</span></div>
        ${this.renderTileTime(slot)}
        <div class="tile-meta">${this.renderMeta(slot)}</div>
        ${this.renderCapacityBar(slot)}
        <div class="tile-msg">${message}</div>
      </div>
    `;
  }

  private renderTileTime(slot: SlotData): TemplateResult {
    if (!slot.available || !slot.start) {
      return html`<div class="tile-time muted">${this.t("unavailable")}</div>`;
    }
    return html`
      <div class="tile-time">
        ${formatRelativeDay(this.hass, slot.start, {
          today: this.t("today"),
          tomorrow: this.t("tomorrow"),
        })}
      </div>
    `;
  }

  /** "06:00 – 07:00 · 49 Kč" meta line: exact slot window plus price/"free". */
  private renderMeta(slot: SlotData): string {
    if (!slot.available || !slot.start) return "";
    const parts: string[] = [];
    const startLabel = formatTime(this.hass, slot.start);
    parts.push(slot.end ? `${startLabel} – ${formatTime(this.hass, slot.end)}` : startLabel);
    if (this.config.show_price !== false && slot.price != null) {
      parts.push(slot.price === 0 ? this.t("free") : this.money(slot.price));
    }
    return parts.join(" · ");
  }

  private renderCapacityBar(slot: SlotData): TemplateResult {
    if (!slot.available || slot.capacityPercent == null) {
      return html`
        <div class="capacity-bar empty"><div class="capacity-fill muted"></div></div>
      `;
    }
    const level = capacityLevel(slot.capacityPercent);
    return html`
      <div class="capacity-bar">
        <div
          class=${classMap({ "capacity-fill": true, [level]: true })}
          style=${styleMap({ width: `${clampCapacityPercent(slot.capacityPercent)}%` })}
        ></div>
      </div>
    `;
  }
}

registerCard({
  type: "rohlik-slots-card",
  documentationURL: "https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/slots-card.md",
  getEntitySuggestion: suggestForKeys("rohlik-slots-card", [
    "express_slot", "standard_slot", "eco_slot", "first_delivery", "is_express_available",
    "is_reserved", "delivery_slots",
  ]),
  name: "Rohlík.cz Delivery Slots",
  description: "Express, standard and eco delivery slot times, prices and remaining capacity.",
  preview: true,
});
