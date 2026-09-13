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
| `language`       | `auto` \| `cs` \| `en`                  | `auto`                              | Card language. `auto` follows the Home Assistant UI language; otherwise every string, date and money value is forced to the chosen one regardless of the dashboard's own language. |
| `slots`          | array of `express` \| `standard` \| `eco` | `[express, standard, eco]`        | Which slot tiles to show, and in what order. |
| `show_price`     | boolean                                 | `true`                             | Show the price/"free" part of the meta line on each tile. |
| `show_location`  | boolean                                 | `true`                             | Show the delivery address line (`first_delivery`'s `delivery_location`) under the header. |
| `watch_interval` | number (seconds)                        | `15`                               | How often "watch express" polls `refresh_slots` while it's on. Clamped to 10 s minimum. |
| `layout`         | `auto` \| `row` \| `column`             | `auto`                              | `auto` shows tiles side by side once the card is at least ~480px wide, and one compact row per slot below that. `row` always lays tiles side by side (collapsing to one column only at very narrow widths); `column` always stacks full-size tiles. |

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
layout: auto
```

## Behaviour

- Every tile has the same anatomy, whether the slot is available or not, so
  the row never looks misaligned: icon + fixed type label ("Express" /
  "Standard" / "Eco" — the integration's per-slot `Title` attribute is not
  used as the label), the big relative time (or a muted "Not available"),
  an exact-window meta line ("06:00 – 07:00 · 49 Kč"), the capacity bar,
  and the capacity message (or `Subtitle`, if there's no message). Tiles
  share a minimum height so an unavailable tile never looks taller or
  shorter than its neighbours.
- Each tile reads its `<type>_slot` sensor: the state is the slot's start
  time, and the `Delivery Slot End`, `Remaining Capacity Percent`,
  `Remaining Capacity Message`, `Price` and `Subtitle` attributes fill in
  the rest. A slot whose state is `unknown`/`unavailable` renders with the
  muted "Not available" time and an empty capacity bar.
- The big time is a relative day + 24h time ("Today 18:15", "Tomorrow
  08:00"). The meta line underneath is the exact window ("06:00 – 07:00")
  plus "· 49 Kč" or "· zdarma"/"· free" for a `0` price — the price part is
  hidden entirely when `show_price` is `false`.
- The capacity bar is coloured by `Remaining Capacity Percent`: primary
  accent at 50% or more, `--warning-color` from 10-49%, `--error-color`
  below 10% (or when the percentage is missing).
- The header chip reads "Expres k dispozici"/"Express available" when
  `is_express_available` is on, "Bez expresu"/"No express" otherwise. On a
  narrow card the chip wraps below the title instead of crowding it.
- The header also has a small round watch toggle (`mdi:eye-outline` /
  `mdi:eye`, tinted with the accent colour and a small pulsing dot while
  on; its tooltip/label reads "Sledovat expres"/"Watch express"). Turning
  it on polls `rohlikcz.refresh_slots` every `watch_interval` seconds —
  but only while the browser tab is visible; polling pauses on
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

`auto` and `row` layout: 12 columns × 2 rows (minimum 6 × 2). `column`
layout: 4 columns × 4 rows (minimum 3 × 3).
