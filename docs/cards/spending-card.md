# rohlik-spending-card

Monthly, yearly and all-time spending totals, a by-year bar chart, and a
tap-to-expand category/items breakdown — built from the integration's
Spending Analytics sensors.

## Options

| Option           | Type    | Default | Description |
|------------------|---------|---------|-------------|
| `device`         | string  | —       | **Required.** Rohlík.cz device id (pick it in the visual editor). |
| `name`           | string  | —       | Overrides the card title. |
| `accent`         | string  | —       | Overrides the accent colour (defaults to the theme's primary colour). |
| `default_period` | string  | `year`  | Initial period: `year` (this year) or `all` (all time). |
| `default_level`  | string  | `l1`    | Initial breakdown level: `l0`, `l1`, `l2`, `l3` or `items`. Falls back to the first level whose sensor actually exists on the device. |
| `top_n`          | number  | `10`    | Number of breakdown rows to show, 1–50. |
| `show_years`     | boolean | `true`  | Show the by-year bar chart (only rendered when at least 2 years of history exist). |
| `show_totals`    | boolean | `true`  | Show the month / year / average-order totals row. |

## YAML example

```yaml
type: custom:rohlik-spending-card
device: 0123456789abcdef0123456789abcdef
default_period: year
default_level: l1
top_n: 10
show_years: true
show_totals: true
```

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
