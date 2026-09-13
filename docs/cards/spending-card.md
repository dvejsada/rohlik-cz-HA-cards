# rohlik-spending-card

Month, year and all-time spending totals, a bar chart (months within the
Month period, years otherwise), and a tap-to-expand category/items
breakdown — built from the integration's Spending Analytics sensors and,
for the monthly chart, Home Assistant's own recorder statistics.

## Options

| Option           | Type    | Default | Description |
|------------------|---------|---------|-------------|
| `device`         | string  | —       | **Required.** Rohlík.cz device id (pick it in the visual editor). |
| `name`           | string  | —       | Overrides the card title. |
| `accent`         | string  | —       | Overrides the accent colour (defaults to the theme's primary colour). |
| `default_period` | string  | `year`  | Initial period: `month` (this month), `year` (this year) or `all` (all time). |
| `default_level`  | string  | `l1`    | Initial breakdown level: `l0`, `l1`, `l2`, `l3` or `items`. Falls back to the first level whose sensor actually exists on the device. |
| `top_n`          | number  | `10`    | Number of breakdown rows to show, 1–50. |
| `chart`          | string  | `auto`  | Which chart to show: `auto` (months in the Month period, years otherwise), `years`, `months` or `none`. |
| `show_years`     | boolean | —       | **Deprecated**, replaced by `chart`. `show_years: false` still behaves like `chart: none` when `chart` itself is unset. |
| `show_totals`    | boolean | `true`  | Show the month / year / average-order totals row. |

## YAML example

```yaml
type: custom:rohlik-spending-card
device: 0123456789abcdef0123456789abcdef
default_period: year
default_level: l1
top_n: 10
chart: auto
show_totals: true
```

## Periods

- **Month** — this month's total (with the month and year as caption), the
  monthly bar chart (see below), and the breakdown of the **year** (the
  integration has no per-month category sensors), shown with a small muted
  caption noting that per-month categories are not available.
- **Year** — this year's totals and the year's own breakdown.
- **All time** — all-time totals and the all-time breakdown.

## Charts

- **Years** (`chart: years`, the `auto` default outside the Month period):
  one bar per year from `alltime_spent`'s `by_year` attribute, current year
  accented. Only rendered once at least 2 years of history exist.
- **Months** (`chart: months`, the `auto` default in the Month period): the
  last 12 months, current month accented. Built from Home Assistant's own
  long-term statistics for the `monthly_spent` sensor (it has `state_class:
  total` and resets on the 1st, so each month's statistical *max* is that
  month's total) via:

  ```js
  hass.callWS({
    type: "recorder/statistics_during_period",
    start_time: "<ISO, first day of the month 11 months ago>",
    end_time: "<ISO, now>",
    statistic_ids: ["sensor.<device>_monthly_spent"],
    period: "month",
    units: {},
    types: ["max"],
  });
  ```

  Any month recorder has no row for is shown as 0; the current month is
  always drawn from the live `monthly_spent` state rather than the
  statistics row, since the recorder's last rollup lags the live sensor.
  Fetched lazily (only while the months chart is actually shown) and
  refetched when the calendar month changes. If the call fails — most
  commonly because the `recorder` integration isn't enabled — the chart
  area shows a muted "Monthly history needs the recorder" hint instead of
  breaking the rest of the card.
- **None** (`chart: none`): no chart.

## Breakdown levels

The level pills only show levels whose sensor exists on the device:

| Level   | Pill label | Sensor (this year / all time) |
|---------|------------|--------------------------------|
| `l0`    | Top        | `categories_l0_this_year` / `categories_l0_all_time` |
| `l1`    | Categories | `categories_this_year` / `categories_all_time` |
| `l2`    | Detailed   | `categories_l2_this_year` / `categories_l2_all_time` |
| `l3`    | Specific   | `categories_l3_this_year` / `categories_l3_all_time` |
| `items` | Items      | `items_this_year` / `items_all_time` |

Tapping a row expands it to show units and the average unit price.

## Enabling Spending Analytics

The month/year/all-time totals (`monthly_spent`, `yearly_spent`,
`alltime_spent`) come with the base integration. The category and item
breakdown sensors above are an **opt-in** feature of the
[HA-RohlikCZ](https://github.com/dvejsada/HA-RohlikCZ) integration —
Spending Analytics — that must be turned on in the integration's options
flow (Settings → Devices & services → Rohlík.cz → Configure). Depending on
the level of detail you enable there, some or all of the `categories_l*`
and `items_*` sensors may not be created at all, in which case the card
shows a hint to enable Spending Analytics instead of the breakdown. Give
the integration a little time after enabling it — the breakdown sensors
are populated on the next scheduled data refresh, not instantly.

If neither `categories_*` nor `items_*` sensors exist yet, the breakdown
section is replaced by a one-line hint instead of an empty list.
