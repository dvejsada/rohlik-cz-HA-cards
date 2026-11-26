import { html, nothing, type TemplateResult, type CSSResultGroup, type PropertyValues } from "lit";
import { customElement, state as litState } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import { RohlikBaseCard } from "../../core/base-card";
import type { HomeAssistant, LovelaceGridOptions } from "../../core/types";
import { registerCard, suggestForKeys } from "../../core/register";
import { sharedStyles } from "../../core/styles";
import { getConfigEntryId, callRohlik } from "../../core/actions";
import { parseTodoItem, type CartLine, type TodoItemInput } from "../cart-card/parse";
import {
  cartQuantities,
  filterFavourites,
  readFavourites,
  type FavouriteProduct,
} from "./data";
import { favouritesCardStyles } from "./styles";
import { strings } from "./strings";
import type { FavouritesCardConfig } from "./editor";
import "./editor";

const TOAST_MS = 4000;
const DEFAULT_MAX_ITEMS = 12;

/**
 * "Favourites" card: the account's favourite products (HA-RohlikCZ
 * `favourites` sensor) as a touch-friendly list — picture, name, packaging,
 * price — with a large "+" that puts one piece in the cart. A local search
 * box filters the list; products already in the cart show their quantity.
 */
@customElement("rohlik-favourites-card")
export class RohlikFavouritesCard extends RohlikBaseCard<FavouritesCardConfig> {
  static styles: CSSResultGroup = [sharedStyles, favouritesCardStyles];

  protected readonly strings = strings;

  @litState() private query = "";

  @litState() private expanded = false;

  @litState() private pending: Set<number> = new Set();

  /** Optimistic extra pieces per product until the cart reload confirms them. */
  @litState() private optimistic: Map<number, number> = new Map();

  @litState() private cartLines: CartLine[] = [];

  @litState() private toast: string | null = null;

  @litState() private error: string | null = null;

  @litState() private refreshing = false;

  private cartKey = "";

  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  private configEntryId: string | undefined;

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-favourites-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<FavouritesCardConfig> {
    return { ...RohlikBaseCard.getStubConfig(hass), type: "custom:rohlik-favourites-card" };
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto", min_columns: 6 };
  }

  protected estimatedCardSize(): number {
    return 8;
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    if (!changed.has("hass") || !this.hass || !this.config) return;
    const cart = this.state("shopping_cart");
    if (!cart) return;
    const key = `${cart.state}|${cart.last_updated}`;
    if (key === this.cartKey) return;
    this.cartKey = key;
    void this.loadCart();
  }

  private async loadCart(): Promise<void> {
    const entityId = this.entityId("shopping_cart");
    if (!entityId) return;
    try {
      const result = await this.hass.callWS<{ items: TodoItemInput[] }>({
        type: "todo/item/list",
        entity_id: entityId,
      });
      this.cartLines = (result.items ?? [])
        .map((item) => parseTodoItem(item))
        .filter((line): line is CartLine => line !== null);
      this.optimistic = new Map();
    } catch {
      /* The quantities are a hint only; the list works without them. */
    }
  }

  private async ensureConfigEntryId(): Promise<string | undefined> {
    if (this.configEntryId) return this.configEntryId;
    const entityId = this.entityId("favourites") ?? this.entityId("cart_price");
    if (!entityId) return undefined;
    this.configEntryId = await getConfigEntryId(this.hass, entityId);
    return this.configEntryId;
  }

  private showToast(message: string): void {
    this.toast = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = null), TOAST_MS);
  }

  private async add(product: FavouriteProduct): Promise<void> {
    if (this.pending.has(product.id)) return;
    const configEntryId = await this.ensureConfigEntryId();
    if (!configEntryId) return;
    this.pending = new Set(this.pending).add(product.id);
    this.optimistic = new Map(this.optimistic).set(
      product.id,
      (this.optimistic.get(product.id) ?? 0) + 1,
    );
    this.error = null;
    try {
      await callRohlik(this.hass, configEntryId, "add_to_cart", {
        product_id: product.id,
        quantity: 1,
      });
      this.showToast(this.t("added", { name: product.name }));
    } catch {
      const next = new Map(this.optimistic);
      const left = (next.get(product.id) ?? 1) - 1;
      if (left > 0) next.set(product.id, left);
      else next.delete(product.id);
      this.optimistic = next;
      this.error = this.t("add_error");
    } finally {
      const next = new Set(this.pending);
      next.delete(product.id);
      this.pending = next;
    }
  }

  private async refresh(): Promise<void> {
    const configEntryId = await this.ensureConfigEntryId();
    if (!configEntryId || this.refreshing) return;
    this.refreshing = true;
    this.error = null;
    try {
      await callRohlik(this.hass, configEntryId, "get_favourites", {}, true);
    } catch {
      this.error = this.t("unavailable");
    } finally {
      this.refreshing = false;
    }
  }

  private onInput = (event: Event): void => {
    this.query = (event.target as HTMLInputElement).value;
  };

  private clearQuery = (): void => {
    this.query = "";
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;
    const entity = this.state("favourites");
    const style = styleMap(this.accentStyle);

    if (!this.entityId("favourites")) {
      return html`<ha-card style=${style}>${this.renderHeader(null)}
        <div class="hint">${this.t("needs_update")}</div></ha-card>`;
    }

    const all = readFavourites(entity).filter(
      (item) => !(this.config.hide_out_of_stock && !item.inStock),
    );
    const unavailable = !entity || entity.state === "unavailable" || entity.state === "unknown";

    return html`
      <ha-card style=${style}>
        ${this.renderHeader(unavailable ? null : all.length)}
        ${this.config.show_search !== false && all.length > 0 ? this.renderSearch() : nothing}
        ${this.error ? this.renderError(this.error) : nothing}
        ${unavailable ? this.renderError(this.t("unavailable")) : this.renderBody(all)}
        ${this.toast ? html`<div class="toast" role="status">${this.toast}</div>` : nothing}
      </ha-card>
    `;
  }

  private renderHeader(count: number | null): TemplateResult {
    return html`
      <div class="header">
        <ha-icon icon="mdi:heart-outline"></ha-icon>
        <span class="title">${this.config.name || this.t("title")}</span>
        ${count !== null ? html`<span class="count">${count}</span>` : nothing}
        <button
          class="icon-btn"
          title=${this.t("refresh")}
          aria-label=${this.t("refresh")}
          ?disabled=${this.refreshing}
          @click=${() => void this.refresh()}
        >
          <ha-icon icon="mdi:refresh"></ha-icon>
        </button>
      </div>
    `;
  }

  private renderSearch(): TemplateResult {
    return html`
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          .value=${this.query}
          placeholder=${this.t("search_placeholder")}
          aria-label=${this.t("search_placeholder")}
          @input=${this.onInput}
        />
        ${this.query
          ? html`<button class="icon-btn" title=${this.t("clear")} aria-label=${this.t("clear")}
              @click=${this.clearQuery}><ha-icon icon="mdi:close"></ha-icon></button>`
          : nothing}
      </label>
    `;
  }

  private renderBody(all: FavouriteProduct[]): TemplateResult {
    if (all.length === 0) return html`<div class="hint">${this.t("empty")}</div>`;
    const matches = filterFavourites(all, this.query);
    if (matches.length === 0) {
      return html`<div class="hint">${this.t("no_match", { query: this.query.trim() })}</div>`;
    }
    const limit = this.config.max_items ?? DEFAULT_MAX_ITEMS;
    // A search always shows every hit; the limit only shortens the full list.
    const capped = !this.query.trim() && limit > 0 && !this.expanded;
    const visible = capped ? matches.slice(0, limit) : matches;
    const quantities = cartQuantities(this.cartLines);

    return html`
      <div class="list">
        ${repeat(visible, (item) => item.id, (item) => this.renderRow(item, quantities))}
      </div>
      ${!this.query.trim() && limit > 0 && matches.length > limit
        ? html`<button class="btn ghost show-toggle" @click=${() => (this.expanded = !this.expanded)}>
            ${this.expanded ? this.t("show_less") : this.t("show_all", { count: matches.length })}
          </button>`
        : nothing}
    `;
  }

  private renderRow(item: FavouriteProduct, quantities: Map<number, number>): TemplateResult {
    const inCart = (quantities.get(item.id) ?? 0) + (this.optimistic.get(item.id) ?? 0);
    const pending = this.pending.has(item.id);
    const meta: TemplateResult[] = [];
    if (item.amount) meta.push(html`<span>${item.amount}</span>`);
    if (this.config.show_price !== false && item.price !== null) {
      meta.push(html`<span class=${item.onSale ? "sale" : ""}>${this.money(item.price)}</span>`);
    }
    if (!item.inStock) meta.push(html`<span>${this.t("out_of_stock")}</span>`);
    if (inCart > 0) meta.push(html`<span class="in-cart">${this.t("in_cart", { count: inCart })}</span>`);

    return html`
      <div class=${classMap({ row: true, fav: true, out: !item.inStock })}>
        ${item.image
          ? html`<img class="thumb" src=${item.image} alt="" loading="lazy" referrerpolicy="no-referrer" />`
          : html`<div class="thumb placeholder" aria-hidden="true"></div>`}
        <div class="cell">
          <div class="name">${item.name}</div>
          <div class="meta">${meta.map((part, i) => html`${i ? " · " : ""}${part}`)}</div>
        </div>
        <button
          class=${classMap({ add: true, has: inCart > 0 })}
          title=${this.t("add")}
          aria-label=${`${this.t("add")}: ${item.name}`}
          ?disabled=${pending || !item.inStock}
          @click=${() => void this.add(item)}
        >
          <ha-icon icon=${pending ? "mdi:timer-sand" : "mdi:plus"}></ha-icon>
        </button>
      </div>
    `;
  }
}

registerCard({
  type: "rohlik-favourites-card",
  documentationURL: "https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/favourites-card.md",
  getEntitySuggestion: suggestForKeys("rohlik-favourites-card", ["favourites"]),
  name: "Rohlík.cz Favourites",
  description: "Your favourite products with pictures and a large add-to-cart button.",
  preview: true,
});
