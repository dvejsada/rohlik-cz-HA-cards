# rohlik-slots-card

Shows the express, standard and eco delivery slot tiles — time, price and
remaining capacity — plus an opt-in "watch express" mode that polls for a
freed-up express slot while the dashboard tab is open.

## Options

| Option           | Type                                  | Default                          | Description |
|------------------|----------------------------------------|-----------------------------------|-------------|
| `device`         | string                                  | —                                  | **Required.** Rohlík.cz device id (pick it in the visual editor). |
| `name`           | string                                  | —                                  | Overrides the card title ("Delivery slots" / "Termíny rozvozu"). |
| `accent`         | string                                  | —                                  | Overrides the accent colour (defaults to the theme's primary colour). |
| `slots`          | array of `express` \| `standard` \| `eco` | `[express, standard, eco]`        | Which slot tiles to show, and in what order. |
| `show_price`     | boolean                                 | `true`                             | Show the price/"free" caption on each tile. |
| `show_location`  | boolean                                 | `true`                             | Show the delivery address line (`first_delivery`'s `delivery_location`) under the header. |
| `watch_interval` | number (seconds)                        | `15`                               | How often "watch express" polls `refresh_slots` while it's on. Clamped to 10 s minimum. |
| `layout`         | `row` \| `column`                       | `row`                               | `row` lays tiles out side by side (wrapping to one column once the card gets narrow); `column` always stacks them. |

## YAML example

```yaml
type: custom:rohlik-slots-card
device: 0123456789abcdef0123456789abcdef
slots:
  - express
  - standard
  - eco
show_price: true
show_location: true
watch_interval: 15
layout: row
```

## Behaviour

- Each tile reads its `<type>_slot` sensor: the state is the slot's start
  time, and the `Delivery Slot End`, `Remaining Capacity Percent`,
  `Remaining Capacity Message`, `Price`, `Title` and `Subtitle` attributes
  fill in the rest. A slot whose state is `unknown`/`unavailable` renders
  as a muted "Not available" tile instead.
- Time is shown as a relative day + 24h time ("Today 18:15", "Tomorrow
  08:00"). The price caption reads "zdarma"/"free" for a `0` price, the
  formatted amount otherwise, and is hidden entirely when `show_price` is
  `false`.
- The capacity bar is coloured by `Remaining Capacity Percent`: primary
  accent at 50% or more, `--warning-color` from 10-49%, `--error-color`
  below 10% (or when the percentage is missing). The capacity message
  attribute, if present, is shown as a small caption under the bar.
- The header chip reads "Expres k dispozici"/"Express available" when
  `is_express_available` is on, "Bez expresu"/"No express" otherwise.
- The header also has a "Sledovat expres"/"Watch express" toggle
  (`mdi:eye-outline` / `mdi:eye`, with a small pulsing dot while active).
  Turning it on polls `rohlikcz.refresh_slots` every `watch_interval`
  seconds — but only while the browser tab is visible; polling pauses on
  `visibilitychange` and resumes when the tab comes back, and stops for
  good when the card is removed from the DOM. The on/off state is
  remembered per device in the browser's `localStorage`
  (`rohlik-slots-watch:<device>`), so it survives a dashboard reload. A
  failed poll shows an inline error line but keeps retrying on the same
  schedule.
- If no `rohlikcz` entities can be found on the configured device, the card
  shows "Rohlík.cz entities not found on this device" instead of a blank
  card.

## Grid sizing

`row` layout: 12 columns × 2 rows (minimum 6 × 2). `column` layout: 4
columns × 4 rows (minimum 3 × 3).
