# rohlik-delivery-card

Shows the state of your next Rohlík.cz order — ordered, on its way, or
delivered — with a live countdown/ETA, a progress track once the courier is
en route, the courier's announcement, and an order summary. Ships with a
companion badge, `rohlik-delivery-badge`.

## Options

| Option                 | Type    | Default | Description |
|------------------------|---------|---------|-------------|
| `device`               | string  | —       | **Required.** Rohlík.cz device id (pick it in the visual editor). |
| `name`                 | string  | —       | Overrides the card title ("Next delivery" / "Příští rozvoz"). |
| `language`             | string  | `auto`  | Card language: `auto` follows the Home Assistant UI language, or force `cs`/`en`. Added automatically to every card's editor — see `docs/DESIGN.md`. |
| `accent`               | string  | —       | Overrides the accent colour (defaults to the theme's primary colour). |
| `show_announcement`    | boolean | `true`  | Show the courier's announcement (`delivery_info`) while ordered/arriving. |
| `show_order_summary`   | boolean | `true`  | Show the "N items · price" row. |
| `show_express_chip`    | boolean | `true`  | Show the "Express available" chip when `is_express_available` is on. |
| `show_refresh`         | boolean | `true`  | Show the manual refresh button. |
| `show_slots`           | boolean | `true`  | In the "no order" state, show up to three compact upcoming-slot rows (Express/Standard/Eco). |
| `show_shop_link`       | boolean | `true`  | In the "delivered" state, show an "Order again on rohlik.cz" link. |
| `compact`              | boolean | `false` | Single-row layout: icon, headline, chip — no track, no rows. |
| `tap_action`           | string  | —       | Set to `none` to disable tapping the card to open the `is_ordered` more-info dialog. |

## YAML example

```yaml
type: custom:rohlik-delivery-card
device: 0123456789abcdef0123456789abcdef
show_announcement: true
show_order_summary: true
show_express_chip: true
show_refresh: true
show_slots: true
show_shop_link: true
compact: false
```

## States

The card evaluates these in order — the first match wins:

1. **Arriving** — `is_ordered` is on and the delivery window has started
   (`now` ≥ `next_order_since`). Headline is the live ETA (`delivery_time`)
   with an "estimated" caption, or the window end with a "by" caption if no
   ETA is published yet. A progress track fills from the window start to
   the window end, with a marker at the ETA (or at "now" if no ETA is
   known). The courier's announcement (`delivery_info`) is shown below it.
2. **Ordered** — `is_ordered` is on, before the window starts. Headline is
   the window start ("Today 17:00" / "Tomorrow 08:00" / a weekday + date),
   with a countdown caption ("in 3 h 20 min"). The sub-line shows the full
   window and the order id: "Window Today 17:00 – 19:00 · order
   123456789". The announcement row (if any) is shown here too.
3. **Delivered** — `is_ordered` has flipped from on to off within the last 6
   hours. This is tracked by the card itself, not read from an entity:
   `last_order`'s timestamp is the order's *placement* time, not its
   delivery time, so it can't be used to detect "just delivered" (a normal
   order is placed the day before, and it would also fire right after an
   express order is placed and then cancelled). Instead, the card
   remembers the current order's id and window end while `is_ordered` is
   on, and the moment it flips off it stamps that memory with the current
   time — persisted to `localStorage` (per device) so a page reload right
   around delivery time doesn't lose it. Headline is that window-end time
   (or the flip-off time, if the window end wasn't known) with a
   "delivered" caption; the order summary row uses `last_order`'s
   `Items`/`Price` attributes instead of `order_data`. Below it, a muted
   "Order again on rohlik.cz" link opens the shop in a new tab (subject to
   `show_shop_link`).
4. **No order** — nothing ordered, and no order delivered in the last 6
   hours. Headline is the nearest available slot (`first_delivery`, e.g.
   "Zítra 8:00") with a "nearest slot" caption. An "Express available" chip
   appears when `is_express_available` is on (subject to
   `show_express_chip`); a "Slot reserved" chip appears when `is_reserved`
   is on. If `is_reserved`'s attributes contain something that looks like a
   reservation deadline (a key matching `till`/`until`/`expir*`/`end`,
   case-insensitively, holding an ISO timestamp — the exact key varies with
   the upstream API response), a "Reserved until HH:MM" line is shown too.
   Subject to `show_slots`, up to three compact rows follow — one each for
   `express_slot`, `standard_slot` and `eco_slot` — with an icon, the slot
   name, its start (relative day + time), and its price ("free" when 0);
   a slot whose sensor is `unknown`/`unavailable` is skipped.

The refresh button calls `rohlikcz.update_delivery_times` while ordered or
arriving, and `rohlikcz.refresh_slots` in the no-order state — both are
cheap, pollable actions. A spinner replaces the icon while the call is in
flight; a failure shows an inline error line instead of throwing.

If none of the `rohlikcz` entities can be found on the configured device,
the card shows "Rohlík.cz entities not found on this device" instead of a
blank card.

The card re-renders every 30 seconds on its own so the countdown, the
progress marker and the "delivered" 6-hour window stay accurate between
`hass` updates.

## Badge — rohlik-delivery-badge

A compact pill for the same state machine, meant for the badge row above a
view. Options: `device` (required), `name`, `language` (`auto`/`cs`/`en`,
same meaning as the card's), `accent`, `show_name` (adds the device name in
front of the state word in the small label, default `false`).

```yaml
type: custom:rohlik-delivery-badge
device: 0123456789abcdef0123456789abcdef
show_name: false
```

- Icon: `mdi:truck-delivery`, switching to `mdi:check` once delivered.
- Label (small, muted): the state word ("Arriving" / "Ordered" /
  "Delivered" / "No order"), optionally prefixed with the device name.
- Value (bold): the ETA while arriving, the window start (relative day)
  while ordered, the last order's time once delivered, or the nearest slot
  text otherwise.
- The icon turns the theme's warning colour when no order exists but an
  express slot is available.
- Tapping the badge opens the `is_ordered` more-info dialog.
