import { html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { repeat } from "lit/directives/repeat.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant } from "../../core/types";
import { formatMoney } from "../../core/format";
import { registerCard } from "../../core/register";
import { sharedStyles } from "../../core/styles";
import {
  LEVELS,
  availableLevels,
  barWidths,
  readBreakdown,
  readByYear,
  sensorKeyFor,
  type BreakdownEntry,
  type Level,
  type Period,
} from "./data";
import { strings } from "./strings";
import { styles } from "./styles";
import "./editor";

export interface SpendingCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-spending-card";
  default_period?: Period;
  default_level?: Level;
  top_n?: number;
  show_years?: boolean;
  show_totals?: boolean;
}

const CHART_BAR_W = 28;
const CHART_BAR_GAP = 12;
const CHART_H = 90;
const CHART_LABEL_H = 22;
const CHART_PAD_TOP = 6;
const CHART_PAD_SIDE = 6;

/**
 * `rohlik-spending-card` — monthly/yearly/all-time totals, a by-year bar
 * chart, and a tap-to-expand category/items breakdown built from whichever
 * (opt-in) analytics sensors exist on the device.
 */
@customElement("rohlik-spending-card")
export class RohlikSpendingCard extends RohlikBaseCard<SpendingCardConfig> {
  static styles = [sharedStyles, styles];

  protected readonly strings = strings;

  @state() private period?: Period;

  @state() private level?: Level;

  @state() private expanded: Set<string> = new Set();

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-spending-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<SpendingCardConfig> {
    return { ...RohlikBaseCard.getStubConfig(hass), type: "custom:rohlik-spending-card" };
  }

  getCardSize(): number {
    return 6;
  }

  getGridOptions() {
    return { columns: 12, rows: 5, min_columns: 6, min_rows: 3 };
  }

  private get effectivePeriod(): Period {
    return this.period ?? this.config?.default_period ?? "year";
  }

  private hasSensor = (key: string): boolean => this.entityId(key) !== undefined;

  private get levelsForCurrentPeriod(): Level[] {
    return availableLevels(this.hasSensor, this.effectivePeriod);
  }

  private get hasAnyAnalytics(): boolean {
    return LEVELS.some(
      (level) => this.hasSensor(sensorKeyFor(level, "year")) || this.hasSensor(sensorKeyFor(level, "all")),
    );
  }

  private get effectiveLevel(): Level | undefined {
    const available = this.levelsForCurrentPeriod;
    if (available.length === 0) return undefined;
    const preferred = this.level ?? this.config?.default_level ?? "l1";
    return available.includes(preferred) ? preferred : available[0];
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;

    const monthly = this.state("monthly_spent");
    if (!monthly) {
      return html`<ha-card style=${styleMap(this.accentStyle)}>
        ${this.renderError(this.t("not_found"))}
      </ha-card>`;
    }

    const period = this.effectivePeriod;
    const showTotals = this.config.show_totals !== false;
    const showYears = this.config.show_years !== false;

    return html`
      <ha-card style=${styleMap(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
          <span class="title">${this.t("title")}</span>
          <div class="segmented">
            <button
              class=${classMap({ pill: true, active: period === "year" })}
              type="button"
              @click=${() => (this.period = "year")}
            >
              ${this.t("period_year")}
            </button>
            <button
              class=${classMap({ pill: true, active: period === "all" })}
              type="button"
              @click=${() => (this.period = "all")}
            >
              ${this.t("period_all")}
            </button>
          </div>
        </div>

        ${showTotals ? this.renderTotals(period) : nothing}
        ${showYears ? this.renderYearsChart() : nothing}
        ${this.renderBreakdown(period)}
        ${this.renderFreshness()}
      </ha-card>
    `;
  }

  private renderTotals(period: Period): TemplateResult {
    const monthly = this.state("monthly_spent");
    const monthlyValue = Number(monthly?.state);
    const monthCaption = new Intl.DateTimeFormat(this.hass.locale?.language || "en", {
      month: "long",
    }).format(new Date());

    const yearly = this.state("yearly_spent");
    const yearlyValue = Number(yearly?.state);
    const year = yearly?.attributes?.year;
    const yearOrderCount = Number(yearly?.attributes?.order_count ?? 0);
    const yearCaption =
      year !== undefined
        ? `${year} · ${this.t("orders_count", { n: yearOrderCount })}`
        : this.t("orders_count", { n: yearOrderCount });

    let avgValue: number | undefined;
    let avgCaption: string;
    if (period === "year") {
      avgValue = Number(yearly?.attributes?.average_order_value);
      avgCaption = this.t("avg_order");
    } else {
      const alltime = this.state("alltime_spent");
      avgValue = Number(alltime?.attributes?.average_order_value);
      const alltimeOrders = Number(alltime?.attributes?.order_count ?? 0);
      avgCaption = this.t("orders_count", { n: alltimeOrders });
    }

    return html`
      <div class="totals">
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(monthlyValue) ? formatMoney(this.hass, monthlyValue) : "–"}
          </div>
          <div class="totals-caption">${monthCaption}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(yearlyValue) ? formatMoney(this.hass, yearlyValue) : "–"}
          </div>
          <div class="totals-caption">${yearCaption}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${avgValue !== undefined && Number.isFinite(avgValue)
              ? formatMoney(this.hass, avgValue)
              : "–"}
          </div>
          <div class="totals-caption">${avgCaption}</div>
        </div>
      </div>
    `;
  }

  private renderYearsChart(): TemplateResult | typeof nothing {
    const byYear = readByYear(this.state("alltime_spent")?.attributes?.by_year);
    if (byYear.length < 2) return nothing;

    const currentYear = new Date().getFullYear();
    const maxTotal = byYear.reduce((m, y) => Math.max(m, y.total), 0) || 1;
    const width = byYear.length * (CHART_BAR_W + CHART_BAR_GAP) - CHART_BAR_GAP + CHART_PAD_SIDE * 2;
    const height = CHART_PAD_TOP + CHART_H + CHART_LABEL_H;

    return html`
      <svg
        class="years-chart"
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        ${repeat(
          byYear,
          (y) => y.year,
          (y, i) => {
            const barHeight = Math.max(2, (y.total / maxTotal) * CHART_H);
            const x = CHART_PAD_SIDE + i * (CHART_BAR_W + CHART_BAR_GAP);
            const y0 = CHART_PAD_TOP + (CHART_H - barHeight);
            const fill =
              y.year === currentYear
                ? "var(--rohlik-accent)"
                : "color-mix(in srgb, var(--primary-text-color) 15%, transparent)";
            return html`
              <rect x=${x} y=${y0} width=${CHART_BAR_W} height=${barHeight} rx="4" fill=${fill}>
                <title>${formatMoney(this.hass, y.total)}</title>
              </rect>
              <text
                x=${x + CHART_BAR_W / 2}
                y=${CHART_PAD_TOP + CHART_H + 16}
                text-anchor="middle"
                font-size="10.5"
                fill="var(--secondary-text-color)"
              >
                ${y.year}
              </text>
            `;
          },
        )}
      </svg>
    `;
  }

  private renderBreakdown(period: Period): TemplateResult | typeof nothing {
    if (!this.hasAnyAnalytics) {
      return html`<div class="breakdown-hint">${this.t("enable_hint")}</div>`;
    }

    const available = this.levelsForCurrentPeriod;
    const level = this.effectiveLevel;
    if (!level) return nothing;

    const topN = this.config.top_n ?? 10;
    const entity = this.state(sensorKeyFor(level, period));
    const { entries, enrichedOrders, totalOrders } = readBreakdown(entity, topN);
    const widths = barWidths(entries);

    return html`
      ${available.length > 1
        ? html`
            <div class="pills-row">
              ${repeat(
                available,
                (l) => l,
                (l) => html`
                  <button
                    class=${classMap({ pill: true, active: level === l })}
                    type="button"
                    @click=${() => (this.level = l)}
                  >
                    ${this.t(`level_${l}`)}
                  </button>
                `,
              )}
            </div>
          `
        : nothing}
      ${repeat(
        entries,
        (e) => e.id ?? e.name,
        (entry, i) => this.renderBreakdownRow(entry, widths[i]),
      )}
      ${enrichedOrders !== undefined && totalOrders !== undefined
        ? html`
            <div class="breakdown-footer">
              ${this.t("enriched", { enriched: enrichedOrders, total: totalOrders })}
            </div>
          `
        : nothing}
    `;
  }

  private renderBreakdownRow(entry: BreakdownEntry, widthPct: number): TemplateResult {
    const key = String(entry.id ?? entry.name);
    const isExpanded = this.expanded.has(key);
    return html`
      <div
        class="breakdown-row"
        @click=${() => this.toggleExpanded(key)}
        @keydown=${(ev: KeyboardEvent) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            this.toggleExpanded(key);
          }
        }}
        role="button"
        tabindex="0"
      >
        <div class="breakdown-main">
          <span class="breakdown-name">${entry.name}</span>
          <span class="breakdown-bar-track">
            <span
              class="breakdown-bar-fill"
              style=${styleMap({ width: `${widthPct}%` })}
            ></span>
          </span>
          <span class="breakdown-spent">${formatMoney(this.hass, entry.spent)}</span>
        </div>
        ${isExpanded
          ? html`
              <div class="breakdown-expand">
                ${this.t("expand_row", {
                  units: entry.units,
                  avg: formatMoney(this.hass, entry.avgUnitPrice),
                })}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private toggleExpanded(key: string): void {
    const next = new Set(this.expanded);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this.expanded = next;
  }
}

registerCard({
  type: "rohlik-spending-card",
  name: "Rohlík.cz Spending",
  description: "Monthly, yearly and all-time spending totals with a category breakdown.",
});
