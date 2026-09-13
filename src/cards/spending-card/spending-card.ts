import { html, nothing, svg, type PropertyValues, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { repeat } from "lit/directives/repeat.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant } from "../../core/types";
import { formatMoney, lang } from "../../core/format";
import { registerCard } from "../../core/register";
import { sharedStyles } from "../../core/styles";
import {
  LEVELS,
  availableLevels,
  barWidths,
  breakdownPeriodFor,
  monthlyChartSeries,
  readBreakdown,
  readByYear,
  readMonthlyStats,
  sensorKeyFor,
  type BreakdownEntry,
  type ChartMode,
  type Level,
  type MonthlyStat,
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
  chart?: ChartMode;
  /** @deprecated replaced by `chart`; `show_years: false` still means `chart: "none"`. */
  show_years?: boolean;
  show_totals?: boolean;
}

const CHART_BAR_W = 28;
const CHART_BAR_GAP = 12;
const CHART_H = 90;
const CHART_LABEL_H = 22;
const CHART_PAD_TOP = 6;
const CHART_PAD_SIDE = 6;

interface ChartBar {
  key: string;
  label: string;
  total: number;
  highlighted: boolean;
}

/** Cached result of the last successful `recorder/statistics_during_period` call. */
interface MonthlyCache {
  entityId: string;
  monthKey: string;
  stats: MonthlyStat[];
}

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

  /** Last successful monthly-statistics fetch, if any (see `maybeFetchMonthly`). */
  @state() private monthly?: MonthlyCache;

  /** Set when the `recorder/statistics_during_period` call throws. */
  @state() private monthlyError = false;

  /** `entityId:monthKey` already fetched or in flight — dedupes `maybeFetchMonthly` calls. */
  private monthlyFetchKey?: string;

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

  /** `chart: "auto"` resolves to months in the Month period, years otherwise; `show_years: false` is a legacy alias for `none`. */
  private resolveChart(period: Period): "years" | "months" | "none" {
    const chart = this.config?.chart ?? "auto";
    if (chart !== "auto") return chart;
    if (this.config?.show_years === false) return "none";
    return period === "month" ? "months" : "years";
  }

  private hasSensor = (key: string): boolean => this.entityId(key) !== undefined;

  private get levelsForCurrentPeriod(): Level[] {
    return availableLevels(this.hasSensor, breakdownPeriodFor(this.effectivePeriod));
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
    const chart = this.resolveChart(period);

    return html`
      <ha-card style=${styleMap(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
          <span class="title">${this.t("title")}</span>
          <div class="segmented">
            <button
              class=${classMap({ pill: true, active: period === "month" })}
              type="button"
              @click=${() => (this.period = "month")}
            >
              ${this.t("period_month")}
            </button>
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
        ${chart === "years" ? this.renderYearsChart() : nothing}
        ${chart === "months" ? this.renderMonthsChart() : nothing}
        ${this.renderBreakdown(period)}
        ${this.renderFreshness()}
      </ha-card>
    `;
  }

  protected updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    this.maybeFetchMonthly();
  }

  /**
   * Fetches `monthly_spent`'s long-term statistics when the months chart is
   * (or becomes) visible: on first render and again whenever the calendar
   * month rolls over. Deduped per entity+month via `monthlyFetchKey`; never
   * throws into the render path — a failure just sets `monthlyError` so the
   * chart can show a muted hint instead of blocking the rest of the card.
   */
  private maybeFetchMonthly(): void {
    if (!this.config || !this.hass) return;
    if (this.resolveChart(this.effectivePeriod) !== "months") return;

    const entityId = this.entityId("monthly_spent");
    if (!entityId) return;

    const now = new Date();
    const monthKey = `${now.getFullYear()}-${now.getMonth()}`;
    const fetchKey = `${entityId}:${monthKey}`;
    if (this.monthlyFetchKey === fetchKey) return;
    this.monthlyFetchKey = fetchKey;

    const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    this.hass
      .callWS<Record<string, unknown>>({
        type: "recorder/statistics_during_period",
        start_time: start.toISOString(),
        end_time: now.toISOString(),
        statistic_ids: [entityId],
        period: "month",
        units: {},
        types: ["max"],
      })
      .then((response) => {
        this.monthly = { entityId, monthKey, stats: readMonthlyStats(response, entityId) };
        this.monthlyError = false;
      })
      .catch(() => {
        this.monthlyError = true;
      });
  }

  private renderTotals(period: Period): TemplateResult {
    const monthly = this.state("monthly_spent");
    const monthlyValue = Number(monthly?.state);
    const monthCaption = new Intl.DateTimeFormat(
      lang(this.hass),
      period === "month" ? { month: "long", year: "numeric" } : { month: "long" },
    ).format(new Date());

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
    return this.renderBarChart(
      byYear.map((y) => ({
        key: String(y.year),
        label: String(y.year),
        total: y.total,
        highlighted: y.year === currentYear,
      })),
    );
  }

  private renderMonthsChart(): TemplateResult | typeof nothing {
    const entityId = this.entityId("monthly_spent");
    if (!entityId) return nothing;
    if (this.monthlyError) {
      return html`<div class="chart-hint">${this.t("monthly_history_hint")}</div>`;
    }
    if (!this.monthly || this.monthly.entityId !== entityId) return nothing;

    const now = new Date();
    const currentMonthTotal = Number(this.state("monthly_spent")?.state);
    const series = monthlyChartSeries(
      this.monthly.stats,
      now,
      Number.isFinite(currentMonthTotal) ? currentMonthTotal : undefined,
    );
    const monthFormatter = new Intl.DateTimeFormat(lang(this.hass), { month: "short" });

    return this.renderBarChart(
      series.map((point, i) => ({
        key: `${point.month.getFullYear()}-${point.month.getMonth()}`,
        label: monthFormatter.format(point.month),
        total: point.total,
        highlighted: i === series.length - 1,
      })),
    );
  }

  private renderBarChart(bars: ChartBar[]): TemplateResult | typeof nothing {
    if (bars.length < 2) return nothing;

    const maxTotal = bars.reduce((m, b) => Math.max(m, b.total), 0) || 1;
    const width = bars.length * (CHART_BAR_W + CHART_BAR_GAP) - CHART_BAR_GAP + CHART_PAD_SIDE * 2;
    const height = CHART_PAD_TOP + CHART_H + CHART_LABEL_H;

    return html`
      <svg
        class="chart-svg"
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        ${repeat(
          bars,
          (b) => b.key,
          (b, i) => {
            const barHeight = Math.max(2, (b.total / maxTotal) * CHART_H);
            const x = CHART_PAD_SIDE + i * (CHART_BAR_W + CHART_BAR_GAP);
            const y0 = CHART_PAD_TOP + (CHART_H - barHeight);
            const fill = b.highlighted
              ? "var(--rohlik-accent)"
              : "color-mix(in srgb, var(--primary-text-color) 15%, transparent)";
            // Children of <svg> must come from the `svg` template tag, or Lit
            // creates them in the HTML namespace and nothing is drawn.
            return svg`
              <rect x=${x} y=${y0} width=${CHART_BAR_W} height=${barHeight} rx="4" fill=${fill}>
                <title>${formatMoney(this.hass, b.total)}</title>
              </rect>
              <text
                x=${x + CHART_BAR_W / 2}
                y=${CHART_PAD_TOP + CHART_H + 16}
                text-anchor="middle"
                font-size="10.5"
                fill="var(--secondary-text-color)"
              >
                ${b.label}
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

    const breakdownPeriod = breakdownPeriodFor(period);
    const available = this.levelsForCurrentPeriod;
    const level = this.effectiveLevel;
    if (!level) return nothing;

    const topN = this.config.top_n ?? 10;
    const entity = this.state(sensorKeyFor(level, breakdownPeriod));
    const { entries, enrichedOrders, totalOrders } = readBreakdown(entity, topN);
    const widths = barWidths(entries);
    const year = this.state("yearly_spent")?.attributes?.year ?? new Date().getFullYear();

    return html`
      ${period === "month"
        ? html`<div class="breakdown-year-hint">
            ${this.t("breakdown_year_hint", { year })}
          </div>`
        : nothing}
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
