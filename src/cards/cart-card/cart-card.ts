import { html, nothing, type TemplateResult, type PropertyValues } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant, LovelaceGridOptions } from "../../core/types";
import { registerCard } from "../../core/register";
import { getConfigEntryId, callRohlik } from "../../core/actions";
import { formatMoney } from "../../core/format";
import { sharedStyles } from "../../core/styles";
import { cartStyles } from "./styles";
import { strings } from "./strings";
import {
  parseTodoItem,
  parseQuickAdd,
  groupByCategory,
  resolveCheckoutUrl,
  moveHighlight,
  type CartLine,
  type TodoItemInput,
} from "./parse";
import "./editor";

export interface CartCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-cart-card";
  show_search?: boolean;
  group_by_category?: boolean;
  show_brand?: boolean;
  max_items?: number;
  /** Max height of the item list in px before it scrolls; 0 = unlimited. */
  list_max_height?: number;
  /** Minimum order value in CZK used for the "below minimum" hint; 0 = do not judge. */
  min_order?: number;
  show_order_button?: boolean;
  checkout_url?: string;
}

interface SearchResult {
  id: number;
  name: string;
  price: string;
  brand?: string;
  amount?: string;
}

interface SearchProductResponse {
  search_results?: SearchResult[];
}

interface SearchAndAddResponse {
  success?: boolean;
  message?: string;
  added_to_cart?: unknown;
}

const DEFAULT_MAX_ITEMS = 0; // 0 = show every line; the list scrolls instead
const DEFAULT_LIST_MAX_HEIGHT = 360;
const SEARCH_DEBOUNCE_MS = 400;
const SEARCH_MIN_CHARS = 2;

/**
 * Shopping cart card: reads live cart contents off the `shopping_cart` todo
 * entity, lets the user tweak quantities (delete + re-add — the integration
 * has no update-item action), remove lines, and search + add products.
 */
@customElement("rohlik-cart-card")
export class RohlikCartCard extends RohlikBaseCard<CartCardConfig> {
  static styles = [sharedStyles, cartStyles];

  protected readonly strings = strings;

  @state() private lines: CartLine[] = [];
  @state() private loading = false;
  @state() private error: string | null = null;
  @state() private expanded = false;

  @state() private searchQuery = "";
  @state() private searchResults: SearchResult[] = [];
  @state() private searching = false;
  @state() private searchError: string | null = null;
  @state() private searchAttempted = false;
  @state() private favouriteOnly = false;

  /** Name of the product currently being added from search, shown as a status line. */
  @state() private addingName: string | null = null;

  @state() private popoverOpen = false;
  @state() private popoverRect: { left: number; top: number; width: number } | null = null;
  @state() private highlightedIndex = -1;

  @state() private pendingUids: Set<string> = new Set();

  @query(".search-box") private searchBoxEl?: HTMLElement;

  private configEntryId?: string;
  private loadedKey?: string;

  /** True when a hass update asked for a reload while an edit was in flight; served once the edit ends. */
  private reloadDeferred = false;

  /** Optimistic cart total / distinct-item count shown while an edit is in flight. */
  @state() private totalOverride: number | null = null;

  @state() private itemsOverride: number | null = null;
  private searchDebounce?: ReturnType<typeof setTimeout>;
  private searchSeq = 0;
  private loadSeq = 0;
  private popoverListenersAttached = false;
  private repositionRaf?: number;

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-cart-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<CartCardConfig> {
    return { ...RohlikBaseCard.getStubConfig(hass), type: "custom:rohlik-cart-card" };
  }

  getCardSize(): number {
    return 5;
  }

  getGridOptions(): LovelaceGridOptions {
    // Fixed row count in the sections layout (resizable in the editor); the
    // item list scrolls inside the card, so a long cart never overflows it.
    return { columns: 12, rows: 8, min_columns: 6, min_rows: 4 };
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.searchDebounce) clearTimeout(this.searchDebounce);
    this.detachPopoverListeners();
  }

  // --- Search popover: position, open/close, keyboard navigation ---------

  private readonly onWindowReposition = (): void => {
    if (this.repositionRaf !== undefined) return;
    this.repositionRaf = requestAnimationFrame(() => {
      this.repositionRaf = undefined;
      this.positionPopover();
    });
  };

  private readonly onDocumentPointerDown = (ev: PointerEvent): void => {
    if (ev.composedPath().includes(this)) return;
    this.closePopover();
  };

  private attachPopoverListeners(): void {
    if (this.popoverListenersAttached) return;
    this.popoverListenersAttached = true;
    window.addEventListener("scroll", this.onWindowReposition, true);
    window.addEventListener("resize", this.onWindowReposition);
    document.addEventListener("pointerdown", this.onDocumentPointerDown);
  }

  private detachPopoverListeners(): void {
    if (!this.popoverListenersAttached) return;
    this.popoverListenersAttached = false;
    window.removeEventListener("scroll", this.onWindowReposition, true);
    window.removeEventListener("resize", this.onWindowReposition);
    document.removeEventListener("pointerdown", this.onDocumentPointerDown);
    if (this.repositionRaf !== undefined) {
      cancelAnimationFrame(this.repositionRaf);
      this.repositionRaf = undefined;
    }
  }

  private positionPopover(): void {
    const box = this.searchBoxEl;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    this.popoverRect = { left: rect.left, top: rect.bottom + 4, width: rect.width };
  }

  /** Opens the popover and (re)computes its position — safe to call repeatedly. */
  private openPopover(): void {
    this.attachPopoverListeners();
    this.popoverOpen = true;
    this.positionPopover();
  }

  private closePopover(): void {
    this.detachPopoverListeners();
    if (!this.popoverOpen && this.highlightedIndex === -1) return;
    this.popoverOpen = false;
    this.highlightedIndex = -1;
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    if (!changed.has("hass") || !this.hass || !this.config) return;

    const todoState = this.state("shopping_cart");
    const cartPriceState = this.state("cart_price");
    if (!todoState || !cartPriceState) return;

    const key = `${todoState.state}|${todoState.last_updated}|${cartPriceState.state}`;
    if (key === this.loadedKey) return;
    this.loadedKey = key;
    // A quantity change is remove + add, and the integration refreshes after
    // each step; reloading in between would flash the line (and the total)
    // as gone. Hold the optimistic state and reload once the edit is done.
    if (this.pendingUids.size > 0) {
      this.reloadDeferred = true;
      return;
    }
    void this.loadItems();
  }

  /** Current cart total from the sensor (0 when unknown). */
  private sensorTotal(): number {
    const value = parseFloat(this.state("cart_price")?.state ?? "");
    return Number.isFinite(value) ? value : 0;
  }

  /** Current distinct-item count from the sensor, falling back to the loaded lines. */
  private sensorItems(): number {
    const attr = this.attr("cart_price", "Total items");
    return typeof attr === "number" ? attr : this.lines.length;
  }

  /** Ends an in-flight edit: clears the optimistic overrides and serves a deferred reload. */
  private finishEdit(uid: string): void {
    const next = new Set(this.pendingUids);
    next.delete(uid);
    this.pendingUids = next;
    if (next.size === 0) {
      this.totalOverride = null;
      this.itemsOverride = null;
      if (this.reloadDeferred) {
        this.reloadDeferred = false;
        void this.loadItems();
      }
    }
  }

  /**
   * Height cap for the item list, in px (0 = uncapped).
   *
   * Always 0 on touch devices: an inner scroll region there swallows the
   * swipe meant for the dashboard view, so the list grows instead and the
   * page scrolls as usual.
   */
  private listMaxHeight(): number {
    const configured = this.config.list_max_height ?? DEFAULT_LIST_MAX_HEIGHT;
    if (configured <= 0) return 0;
    try {
      if (window.matchMedia?.("(pointer: coarse)").matches) return 0;
    } catch {
      // matchMedia unavailable (non-browser env): keep the configured cap.
    }
    return configured;
  }

  private async ensureConfigEntryId(): Promise<string | undefined> {
    if (this.configEntryId) return this.configEntryId;
    const entityId = this.entityId("cart_price");
    if (!entityId) return undefined;
    this.configEntryId = await getConfigEntryId(this.hass, entityId);
    return this.configEntryId;
  }

  private async loadItems(): Promise<void> {
    const entityId = this.entityId("shopping_cart");
    if (!entityId) return;
    const seq = ++this.loadSeq;
    this.loading = true;
    this.error = null;
    try {
      const result = await this.hass.callWS<{ items: TodoItemInput[] }>({
        type: "todo/item/list",
        entity_id: entityId,
      });
      if (seq !== this.loadSeq) return;
      this.lines = (result.items ?? [])
        .map((item) => parseTodoItem(item))
        .filter((line): line is CartLine => line !== null);
    } catch {
      if (seq !== this.loadSeq) return;
      this.error = this.t("load_error");
    } finally {
      if (seq === this.loadSeq) this.loading = false;
    }
  }

  private async removeItem(uid: string): Promise<void> {
    const entityId = this.entityId("shopping_cart");
    if (!entityId || this.pendingUids.has(uid)) return;

    const previousLines = this.lines;
    const removed = this.lines.find((line) => line.uid === uid);
    this.pendingUids = new Set(this.pendingUids).add(uid);
    this.lines = this.lines.filter((line) => line.uid !== uid);
    this.totalOverride = Math.max(0, (this.totalOverride ?? this.sensorTotal()) - (removed?.price ?? 0));
    this.itemsOverride = Math.max(0, (this.itemsOverride ?? this.sensorItems()) - 1);
    this.error = null;
    try {
      await this.hass.callService("todo", "remove_item", { item: uid }, { entity_id: entityId });
    } catch {
      this.lines = previousLines;
      this.error = this.t("action_error");
    } finally {
      this.finishEdit(uid);
    }
  }

  private async changeQuantity(line: CartLine, newQuantity: number): Promise<void> {
    if (this.pendingUids.has(line.uid)) return;
    if (newQuantity <= 0) {
      await this.removeItem(line.uid);
      return;
    }

    const entityId = this.entityId("shopping_cart");
    if (!entityId || line.productId === undefined) return;

    const previousLines = this.lines;
    const unitPrice = line.quantity > 0 ? line.price / line.quantity : 0;
    const newPrice = Math.round(unitPrice * newQuantity * 100) / 100;
    this.pendingUids = new Set(this.pendingUids).add(line.uid);
    this.lines = this.lines.map((l) =>
      l.uid === line.uid ? { ...l, quantity: newQuantity, price: newPrice } : l,
    );
    this.totalOverride = Math.max(0, (this.totalOverride ?? this.sensorTotal()) + (newPrice - line.price));
    this.error = null;

    try {
      await this.hass.callService(
        "todo",
        "remove_item",
        { item: line.uid },
        { entity_id: entityId },
      );
      const configEntryId = await this.ensureConfigEntryId();
      if (!configEntryId) throw new Error("no config_entry_id for shopping_cart device");
      await callRohlik(this.hass, configEntryId, "add_to_cart", {
        product_id: line.productId,
        quantity: newQuantity,
      });
    } catch {
      this.lines = previousLines;
      this.error = this.t("action_error");
    } finally {
      // The remove succeeded but the re-add may not have: always reload at
      // the end so the card shows the cart as it really is.
      this.reloadDeferred = true;
      this.finishEdit(line.uid);
    }
  }

  private onSearchInput = (ev: InputEvent): void => {
    const value = (ev.target as HTMLInputElement).value;
    this.searchQuery = value;
    this.searchError = null;
    this.highlightedIndex = -1;
    if (this.searchDebounce) clearTimeout(this.searchDebounce);

    const trimmed = value.trim();
    if (trimmed.length < SEARCH_MIN_CHARS) {
      this.searchResults = [];
      this.searching = false;
      this.searchAttempted = false;
      this.closePopover();
      return;
    }
    this.openPopover();
    this.searchDebounce = setTimeout(() => void this.runSearch(trimmed), SEARCH_DEBOUNCE_MS);
  };

  private onSearchFocus = (): void => {
    if (this.searchQuery.trim().length >= SEARCH_MIN_CHARS) this.openPopover();
  };

  private onSearchKeydown = (ev: KeyboardEvent): void => {
    if (ev.key === "Escape") {
      if (this.popoverOpen) ev.preventDefault();
      this.clearSearch();
      return;
    }
    if (ev.key === "ArrowDown") {
      if (!this.popoverOpen || !this.searchResults.length) return;
      ev.preventDefault();
      this.highlightedIndex = moveHighlight(this.highlightedIndex, 1, this.searchResults.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      if (!this.popoverOpen || !this.searchResults.length) return;
      ev.preventDefault();
      this.highlightedIndex = moveHighlight(this.highlightedIndex, -1, this.searchResults.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      const highlighted =
        this.highlightedIndex >= 0 ? this.searchResults[this.highlightedIndex] : undefined;
      if (highlighted) {
        void this.addSearchResult(highlighted);
        return;
      }
      void this.searchAndAdd();
    }
  };

  private async runSearch(query: string): Promise<void> {
    const configEntryId = await this.ensureConfigEntryId();
    if (!configEntryId) return;

    const seq = ++this.searchSeq;
    this.searching = true;
    try {
      const response = await callRohlik<SearchProductResponse>(
        this.hass,
        configEntryId,
        "search_product",
        { product_name: query, limit: 8, favourite: this.favouriteOnly },
        true,
      );
      if (seq !== this.searchSeq) return;
      this.searchResults = response?.search_results ?? [];
      this.highlightedIndex = -1;
      this.searchAttempted = true;
      if (this.searchQuery.trim().length >= SEARCH_MIN_CHARS) this.openPopover();
    } catch {
      if (seq !== this.searchSeq) return;
      this.searchResults = [];
      this.searchError = this.t("search_error");
      this.searchAttempted = true;
      if (this.searchQuery.trim().length >= SEARCH_MIN_CHARS) this.openPopover();
    } finally {
      if (seq === this.searchSeq) this.searching = false;
    }
  }

  private async searchAndAdd(): Promise<void> {
    const text = this.searchQuery.trim();
    if (!text) return;

    const configEntryId = await this.ensureConfigEntryId();
    if (!configEntryId) return;

    const { quantity, name } = parseQuickAdd(text);
    // Same immediate feedback as the "+" button: close the popover, clear
    // the box and show an "Adding…" line while the integration refreshes.
    this.clearSearch();
    this.addingName = name;
    this.error = null;
    try {
      const response = await callRohlik<SearchAndAddResponse>(
        this.hass,
        configEntryId,
        "search_and_add_to_cart",
        { product_name: name, quantity, favourite: this.favouriteOnly },
        true,
      );
      if (response && response.success === false) {
        this.error = response.message || this.t("search_add_error");
        return;
      }
      await this.loadItems();
    } catch {
      this.error = this.t("search_add_error");
    } finally {
      this.addingName = null;
    }
  }

  private async addSearchResult(result: SearchResult): Promise<void> {
    const configEntryId = await this.ensureConfigEntryId();
    if (!configEntryId) return;
    const { quantity } = parseQuickAdd(this.searchQuery.trim());
    // add_to_cart triggers a full integration refresh before it returns, so
    // give feedback right away: close the popover, clear the box and show an
    // "Adding…" status line until the cart reloads.
    this.clearSearch();
    this.addingName = result.name ?? "";
    this.error = null;
    try {
      await callRohlik(this.hass, configEntryId, "add_to_cart", {
        product_id: result.id,
        quantity,
      });
      await this.loadItems();
    } catch {
      this.error = this.t("search_add_error");
    } finally {
      this.addingName = null;
    }
  }

  private toggleFavouriteOnly = (): void => {
    this.favouriteOnly = !this.favouriteOnly;
    const trimmed = this.searchQuery.trim();
    if (trimmed.length >= SEARCH_MIN_CHARS) void this.runSearch(trimmed);
  };

  private clearSearch(): void {
    if (this.searchDebounce) clearTimeout(this.searchDebounce);
    this.searchQuery = "";
    this.searchResults = [];
    this.searchError = null;
    this.searching = false;
    this.searchAttempted = false;
    this.closePopover();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;

    const cartEntityId = this.entityId("shopping_cart");
    const priceEntityId = this.entityId("cart_price");
    if (!cartEntityId || !priceEntityId) {
      return html`<ha-card>${this.renderError(this.t("missing_entities"))}</ha-card>`;
    }

    const priceState = this.state("cart_price");
    const total = this.totalOverride ?? (priceState ? parseFloat(priceState.state) : 0);
    // `Can Order` mirrors Rohlík's submitConditionPassed, which is only true
    // once slot, address and payment are all set at checkout — it says
    // nothing about the minimum order value. Judge the minimum ourselves.
    const readyToSubmit = Boolean(this.attr("cart_price", "Can Order"));
    const minOrder = this.config.min_order ?? 0;
    const noLimitLeft = Number(this.state("no_limit")?.state) > 0;
    const belowMinimum = minOrder > 0 && !noLimitLeft && total < minOrder;
    const totalItemsAttr = this.attr("cart_price", "Total items");
    const totalItems =
      this.itemsOverride ?? (typeof totalItemsAttr === "number" ? totalItemsAttr : this.lines.length);
    const isEmpty = this.lines.length === 0;

    const showSearch = this.config.show_search !== false;
    const showBrand = this.config.show_brand !== false;
    const grouped = this.config.group_by_category === true;
    const maxItems = this.config.max_items ?? DEFAULT_MAX_ITEMS;
    const showOrderButton = this.config.show_order_button !== false;
    const canOrderNow = !isEmpty;

    return html`
      <ha-card style=${styleMap(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:cart"></ha-icon>
          <span class="title">${this.config.name || this.t("title")}</span>
          ${isEmpty
            ? nothing
            : readyToSubmit
              ? html`<span class="chip ok">${this.t("ready_to_order")}</span>`
              : belowMinimum
                ? html`<span class="chip warn">${this.t("below_minimum")}</span>`
                : minOrder > 0
                  ? html`<span class="chip ok">${this.t("can_order")}</span>`
                  : nothing}
        </div>

        <div class="big">${formatMoney(this.hass, Number.isFinite(total) ? total : 0)}</div>
        <div class="caption">
          ${isEmpty ? this.t("empty_cart") : this.t("items_count", { count: totalItems })}
        </div>
        ${isEmpty ? this.renderEmptyHint() : nothing}
        ${belowMinimum && !isEmpty
          ? html`<div class="hint minimum-hint">
              ${this.t("below_minimum_by", { amount: formatMoney(this.hass, minOrder - total) })}
            </div>`
          : nothing}
        ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
        ${showSearch ? this.renderSearch() : nothing}
        ${this.addingName !== null
          ? html`<div class="adding">${this.renderSpinner()} ${this.t("adding", { name: this.addingName })}</div>`
          : nothing}
        ${!isEmpty ? this.renderLines(grouped, showBrand, maxItems) : nothing}

        <div class="footer-row">
          ${this.renderFreshness()}
          <div class="footer-actions">
            <button
              class="btn ghost"
              ?disabled=${this.loading}
              @click=${() => void this.loadItems()}
            >
              ${this.t("refresh")}
            </button>
            ${showOrderButton ? this.renderOrderButton(canOrderNow) : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderOrderButton(enabled: boolean): TemplateResult {
    const url = resolveCheckoutUrl(this.config.checkout_url);
    return html`
      <a
        class=${classMap({ btn: true, order: true, disabled: !enabled })}
        href=${enabled ? url : nothing}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled=${enabled ? nothing : "true"}
        title=${enabled ? this.t("order_hint") : this.t("empty_cart")}
      >
        <ha-icon icon="mdi:cart-arrow-right"></ha-icon>
        ${this.t("order")}
      </a>
    `;
  }

  private renderEmptyHint(): TemplateResult | typeof nothing {
    const items = this.attr("last_order", "Items");
    if (typeof items !== "number") return nothing;
    return html`<div class="hint">${this.t("last_order_hint", { count: items })}</div>`;
  }

  private renderSearch(): TemplateResult {
    return html`
      <div class="search">
        <div class="search-box">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            role="combobox"
            aria-expanded=${this.popoverOpen ? "true" : "false"}
            aria-controls="cart-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant=${this.highlightedIndex >= 0
              ? `cart-search-option-${this.highlightedIndex}`
              : nothing}
            .value=${this.searchQuery}
            placeholder=${this.t("search_placeholder")}
            @input=${this.onSearchInput}
            @keydown=${this.onSearchKeydown}
            @focus=${this.onSearchFocus}
          />
          ${this.searching ? this.renderSpinner() : nothing}
          <button
            class=${classMap({ "icon-btn": true, active: this.favouriteOnly })}
            title=${this.t("favourite_only")}
            @click=${this.toggleFavouriteOnly}
          >
            <ha-icon icon=${this.favouriteOnly ? "mdi:heart" : "mdi:heart-outline"}></ha-icon>
          </button>
        </div>
        ${this.popoverOpen ? this.renderSearchPopover() : nothing}
      </div>
    `;
  }

  /**
   * Floats over the page instead of pushing card content — `position: fixed`,
   * positioned from the search box's own `getBoundingClientRect()` and kept
   * in sync on scroll/resize while open (see `positionPopover`).
   */
  private renderSearchPopover(): TemplateResult {
    const style = this.popoverRect
      ? {
          left: `${this.popoverRect.left}px`,
          top: `${this.popoverRect.top}px`,
          width: `${this.popoverRect.width}px`,
        }
      : { display: "none" };

    return html`
      <div id="cart-search-listbox" class="search-popover" role="listbox" style=${styleMap(style)}>
        ${this.searchError
          ? html`<div class="popover-error">${this.searchError}</div>`
          : this.searchResults.length
            ? repeat(
                this.searchResults,
                (result) => result.id,
                (result, index) => this.renderSearchResult(result, index),
              )
            : this.searchAttempted && !this.searching
              ? html`<div class="popover-empty">${this.t("no_results")}</div>`
              : nothing}
      </div>
    `;
  }

  private renderSpinner(): TemplateResult {
    if (customElements.get("ha-circular-progress")) {
      return html`<ha-circular-progress indeterminate size="small"></ha-circular-progress>`;
    }
    return html`<div class="spinner"></div>`;
  }

  private renderSearchResult(result: SearchResult, index: number): TemplateResult {
    const secondary = [result.brand, result.amount].filter(Boolean).join(" · ");
    const highlighted = index === this.highlightedIndex;
    return html`
      <div
        id="cart-search-option-${index}"
        class=${classMap({ row: true, "search-result": true, highlighted })}
        role="option"
        aria-selected=${highlighted ? "true" : "false"}
        @pointerenter=${() => (this.highlightedIndex = index)}
      >
        <div class="cell">
          <div class="name">${result.name}</div>
          ${secondary ? html`<div class="secondary">${secondary}</div>` : nothing}
        </div>
        <div class="price">${result.price}</div>
        <button
          class="icon-btn"
          title=${this.t("add")}
          @click=${() => void this.addSearchResult(result)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
    `;
  }

  private renderLines(grouped: boolean, showBrand: boolean, maxItems: number): TemplateResult {
    const limit = maxItems > 0 ? maxItems : this.lines.length;
    const visibleLines = this.expanded ? this.lines : this.lines.slice(0, limit);
    const showToggle = this.lines.length > limit;
    const maxHeight = this.listMaxHeight();
    const listStyle = maxHeight > 0 ? { maxHeight: `${maxHeight}px` } : {};

    return html`
      <div class="lines" style=${styleMap(listStyle)}>
        ${grouped
          ? repeat(
              groupByCategory(visibleLines),
              (group) => group.category ?? "__uncategorised__",
              (group) => html`
                <div class="category-header">${group.category ?? this.t("uncategorised")}</div>
                ${repeat(
                  group.lines,
                  (line) => line.uid,
                  (line) => this.renderLine(line, showBrand),
                )}
              `,
            )
          : repeat(
              visibleLines,
              (line) => line.uid,
              (line) => this.renderLine(line, showBrand),
            )}
      </div>
      ${showToggle
        ? html`
            <button class="btn ghost show-toggle" @click=${() => (this.expanded = !this.expanded)}>
              ${this.expanded
                ? this.t("show_less")
                : this.t("show_all", { count: this.lines.length })}
            </button>
          `
        : nothing}
    `;
  }

  private renderLine(line: CartLine, showBrand: boolean): TemplateResult {
    const pending = this.pendingUids.has(line.uid);
    const secondary = [line.category, showBrand ? line.brand : undefined]
      .filter((value): value is string => Boolean(value))
      .join(" · ");

    return html`
      <div class=${classMap({ row: true, "cart-line": true, pending })}>
        <div class="cell">
          <div class="name">${line.name}</div>
          ${secondary ? html`<div class="secondary">${secondary}</div>` : nothing}
        </div>
        <div class="line-end">
          <div class="stepper">
            <button
              class="step-btn"
              ?disabled=${pending}
              title=${this.t("remove")}
              @click=${() => void this.changeQuantity(line, line.quantity - 1)}
            >
              −
            </button>
            <span class="qty">${line.quantity}</span>
            <button
              class="step-btn"
              ?disabled=${pending}
              @click=${() => void this.changeQuantity(line, line.quantity + 1)}
            >
              +
            </button>
          </div>
          <div class="line-price">${formatMoney(this.hass, line.price)}</div>
          <button
            class="icon-btn remove"
            ?disabled=${pending}
            title=${this.t("remove")}
            @click=${() => void this.removeItem(line.uid)}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }
}

registerCard({
  type: "rohlik-cart-card",
  name: "Rohlík.cz Shopping Cart",
  description: "Live cart contents, quantity steppers and product search for Rohlík.cz.",
});
