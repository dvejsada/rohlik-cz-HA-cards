# Rohlík.cz Cards — design and data contract

Custom Lovelace cards for the [HA-RohlikCZ](https://github.com/dvejsada/HA-RohlikCZ)
integration (domain `rohlikcz`), shipped as one HACS plugin bundle `dist/rohlik-cards.js`.

## Lineup

| Custom element              | Card                | Phase |
|-----------------------------|---------------------|-------|
| `rohlik-delivery-card`      | Next Delivery       | 1 |
| `rohlik-delivery-badge`     | Delivery badge      | 1 |
| `rohlik-cart-card`          | Shopping Cart       | 2 |
| `rohlik-slots-card`         | Delivery Slots      | 3 |
| `rohlik-account-card`       | Account             | 3 |
| `rohlik-spending-card`      | Spending            | 4 |

Decisions already taken (do not re-open):

- First release after Phase 1; iterate after.
- Cart quantity stepper is implemented now via delete + re-add.
- Slots card keeps client-side "watch for express" polling, only while the page is visible, min 10 s.
- Accent colour follows the HA theme primary colour; `accent` config option overrides it.
- The badge ships with Phase 1.

## Core principles

1. **Device-based discovery.** Every card takes `device: <device_id>`. The card finds all
   entities on that device whose `platform === "rohlikcz"` in `hass.entities` and maps them by
   `translation_key`. No entity IDs in config. Multi-account = second card.
2. **Native look.** Render inside `<ha-card>`, use only HA CSS variables
   (`--primary-color`, `--card-background-color`, `--primary-text-color`,
   `--secondary-text-color`, `--divider-color`, `--ha-card-border-radius`, `--state-icon-color`,
   `--warning-color`, `--error-color`, `--success-color`). Never hardcode brand colours.
3. **Czech first, English too.** Strings come from per-card dictionaries `{ cs: {...}, en: {...} }`
   resolved through `core/localize.ts` using `hass.locale.language` (fallback `en`).
   Money and time are formatted with `Intl` and the HA locale (`hass.locale`).
4. **Visual editor** via `getConfigElement()` using `ha-form` with a schema, and
   `getStubConfig(hass)` that pre-fills the first Rohlík device found.
5. **Sections layout** support via `getGridOptions()`.
6. **Freshness footer** (optional per card): "updated N min ago" from the `updated` sensor,
   amber when older than 20 minutes.
7. No dependency on `custom-card-helpers`. Local minimal types live in `src/core/types.ts`.

## Entity contract (from HA-RohlikCZ 1.0.0-beta2)

Entities are found by `translation_key` (column 1). Device name = the Rohlík account holder's
name, so entity IDs look like `sensor.dan_vejsada_cart_total` — never rely on them.

### binary_sensor

| translation_key        | meaning | attributes |
|------------------------|---------|------------|
| `is_ordered`           | an upcoming order exists | `order_data`: raw order dict of the earliest upcoming order: `id`, `orderTime`, `itemsCount`, `priceComposition.total.amount`, `deliverySlot.since`, `deliverySlot.till`, `status` (may be absent) |
| `is_reserved`          | a timeslot is reserved | raw `reservationDetail` dict from the API (keys vary; show generically, e.g. look for `since`/`till`/`expiresAt`-like ISO strings) |
| `is_express_available` | express slot has capacity > 0 | none |
| `is_premium`           | Xtra membership active | `type`, `payment_type`, `expiration_date`, `remaining_days`, `start_date`, `end_date`, `remaining_orders_without_limit`, `remaining_free_express` |
| `is_reusable`          | reusable bags enabled | none |
| `is_parent`            | Parents Club member | none |

### sensor

| translation_key       | state | attributes |
|-----------------------|-------|------------|
| `first_delivery`      | text, e.g. "Zítra 8:00" | `delivery_location`, `delivery_type` |
| `express_slot`, `standard_slot`, `eco_slot` | ISO timestamp of slot start (device_class timestamp) or `unknown` | `Delivery Slot End` (ISO), `Remaining Capacity Percent` (int), `Remaining Capacity Message`, `Price` (int CZK), `Title`, `Subtitle`; `entity_picture` is a CDN icon URL |
| `next_order_since`    | ISO timestamp, window start of earliest order | |
| `next_order_till`     | ISO timestamp, window end | |
| `delivery_time`       | ISO timestamp, live ETA (falls back to slot start) | |
| `delivery_info`       | plain text of the courier announcement | `Order Id`, `Updated At` (ISO), `Title`, `Additional Content` |
| `last_order`          | ISO timestamp of last order | `Items`, `Price` |
| `cart_price`          | float CZK | `Total items` (int, distinct products), `Can Order` (bool; Rohlík's `submitConditionPassed`, true only when slot, address and payment are all set, so NOT a minimum-order indicator) |
| `credit_amount`       | float CZK | |
| `bags_amount`         | int | `Max Bags`, `Deposit Amount`, `Deposit Currency` |
| `premium_days`        | int days | `Premium Type`, `Payment Date`, `Start Date`, `End Date` |
| `no_limit`            | int remaining | |
| `free_express`        | int remaining | |
| `updated`             | ISO timestamp of last refresh | |
| `monthly_spent`       | float CZK | `monthly_total`, `processed_count`, `average_order_value`, `current_month` |
| `yearly_spent`        | float CZK | `year`, `order_count`, `average_order_value` |
| `alltime_spent`       | float CZK | `order_count`, `average_order_value`, `first_order_date`, `tracking_since`, `by_year`: `{ "2024": {"total": 12345.6, "order_count": 31}, ... }` |
| `categories_l0_this_year`, `categories_l0_all_time`, `categories_this_year` (L1), `categories_all_time` (L1), `categories_l2_this_year`, `categories_l2_all_time`, `categories_l3_this_year`, `categories_l3_all_time` | float CZK (opt-in, may not exist) | `total_count`, `categories`: `[{name, spent, units, avg_unit_price}]`, `year` (year variants), `enriched_orders`, `total_orders` |
| `items_this_year`, `items_all_time` | float CZK (opt-in) | `total_count`, `items`: `[{name, id, spent, units, avg_unit_price}]` |

Attribute names with spaces and capitals are exactly as the integration emits them.

### todo

`shopping_cart` — entity id `todo.<device>_rohlik_shopping_cart`. Items via websocket
`{ type: "todo/item/list", entity_id }` → `{ items: [{ uid, summary, status, description }] }`.

- `summary` = `"<name> (<quantity>) - <price> Kč"` (price is the line price, `float` printed by Python, e.g. `39.8`).
- `uid` = `cart_item_id` (string).
- `description` = `"Category: <category>\nBrand: <brand>\nProduct ID: <id>"`.
- Create (`todo/item/add` or `todo.add_item` service, `item: "<qty> <name>"`) searches and adds the first match.
- Delete via `todo.remove_item` service with `item: <uid>` (or `todo/item/delete` ws).
- No update support: a quantity change = remove + `rohlikcz.add_to_cart`.
- The todo entity's state is the item count; re-fetch items whenever it or `cart_price` changes.

### calendar

`delivery_calendar` — standard calendar entity; not used by the cards (built-in calendar card covers it).

## Actions (services) — all require `config_entry_id`

Resolve `config_entry_id` once per device via websocket
`{ type: "config/entity_registry/get", entity_id }` → `.config_entry_id`, cache it.

Call with response: `hass.callService(domain, service, data, target, notifyOnError=true, returnResponse=true)`
returns `{ context, response }`.

| action | data | response |
|--------|------|----------|
| `rohlikcz.search_product` | `product_name`, `limit?`, `favourite?` | `{ search_results: [{ id: number, name, price: "29.90 Kč", brand, amount: "500 g" }] }` |
| `rohlikcz.add_to_cart` | `product_id`, `quantity` | `{ added_products: ... }` |
| `rohlikcz.search_and_add_to_cart` | `product_name`, `quantity`, `favourite?` | `{ success, message, added_to_cart: [...] }` |
| `rohlikcz.get_cart_content` | | `{ total_price, total_items, can_make_order, products: [{ id, cart_item_id, name, quantity, price, category_name, brand }] }` |
| `rohlikcz.update_data` | | none |
| `rohlikcz.refresh_slots` | | none (cheap, pollable) |
| `rohlikcz.update_delivery_times` | | none (cheap, pollable) |

Known gaps: no product images anywhere; no order item list; no quantity update.

## HA frontend APIs used

- `hass.states[entity_id]` → `{ state, attributes, last_changed, last_updated }`.
- `hass.entities[entity_id]` → `{ entity_id, device_id, platform, translation_key, name, ... }`.
- `hass.devices[device_id]` → `{ id, name, name_by_user, ... }`.
- `hass.callWS(msg)`, `hass.callService(...)`, `hass.locale`, `hass.themes`.
- `window.customCards.push({ type, name, description, preview, documentationURL })`.
- Card lifecycle: `setConfig(config)`, `set hass(hass)`, `getCardSize()`, `getGridOptions()`,
  static `getConfigElement()`, static `getStubConfig(hass, entities, entitiesFallback)`.
- Badge lifecycle is the same, registered via `window.customBadges.push(...)`.
- Fire `hass-more-info` with `{ entityId }` to open the more-info dialog.
- Editor fires `config-changed` with `{ config }`.

## Card specs

### rohlik-delivery-card

States, evaluated in this order:

1. **arriving** — `is_ordered` on and now ≥ `next_order_since`: headline = `delivery_time`
   formatted as HH:MM with "estimated" caption; progress track from since→till with ETA marker;
   announcement row from `delivery_info` (state text + `Additional Content`, `Updated At`).
2. **ordered** — `is_ordered` on, before window: headline = window start (relative: "Today 17:00",
   "Tomorrow 08:00", else date + time); caption = countdown ("in 3 h 20 min"); order summary row
   (items · price · order id) from `order_data`.
3. **delivered** — `is_ordered` off and `last_order` within the last 6 h: "Delivered" chip, last
   order summary.
4. **none** — no order: headline = `first_delivery` text (nearest slot); chips: "Slot reserved"
   if `is_reserved`, "Express available" if `is_express_available`.

Options: `device` (req), `name?`, `show_announcement` (true), `show_order_summary` (true),
`show_express_chip` (true), `show_refresh` (true), `compact` (false), `tap_action?`.
Refresh button calls `update_delivery_times` (arriving/ordered) or `refresh_slots` (none).
Tap on the card opens more-info for `is_ordered`.
Grid: full 12 cols × 3 rows (min 6×2); compact 6×2.

### rohlik-delivery-badge

Same state machine. Label = state word, value = ETA / window start / nearest slot text.
Icon `mdi:truck-delivery`. Tap → more-info `is_ordered`. Options: `device`, `show_name`.

### rohlik-cart-card

Header: title, chip "Ready to order" when `cart_price.Can Order` is true, otherwise "Above/Below minimum" judged against the `min_order` option (remaining Xtra no-limit orders count as above); no chip when neither applies.
Big number: total price, caption "N items".
Search box (if `show_search`): debounce 400 ms, min 2 chars, calls `search_product` limit 8,
`favourite` from a heart toggle; results list rows with name / brand · amount / price and an
add button (qty 1) → `add_to_cart`; Enter on the box with no result selected → `search_and_add_to_cart`
with `"<qty> <name>"` parsing (leading integer = qty).
Item rows parsed from todo items: name, category · brand, stepper (− qty +), line price, remove ×.
Stepper: − to 0 or × → `todo.remove_item`; other changes → remove then `add_to_cart(product_id, newQty)`,
optimistic, revert + inline error on failure.
`max_items` (default 6) collapses the rest behind "Show all N". `group_by_category` (false).
Empty state: search box + "Your last order had N items" from `last_order.Items`.
Grid: 12 × 4 (min 6×3).

### rohlik-slots-card

Tiles for `slots` (default `[express, standard, eco]`): label + icon (⚡ express, ♻ eco),
time (relative day + HH:MM), "price Kč" or "free", capacity bar coloured by
`Remaining Capacity Percent` (≥50 primary, 10–49 warning, <10 error), capacity message.
Missing slot (state unknown) → tile shows "Not available".
Header chip: "Express available" from `is_express_available`. Location line from `first_delivery.delivery_location`.
Watch mode toggle: polls `refresh_slots` every `watch_interval` s (default 15, min 10) while
`document.visibilityState === "visible"`; stops on hide/disconnect; state kept in `localStorage`
per card key.
Options: `device`, `name?`, `slots`, `show_price`, `show_location`, `watch_interval`, `layout` (`row`|`column`).
Grid: row 12×2, column 4×4.

### rohlik-account-card

Header: device name (or `name`), chip "Xtra · N days" (amber if < 7) or "No Xtra".
Stat tiles (`stats`, default order): `credit`, `bags` (current / max, deposit caption),
`no_limit`, `free_express`, `parents_club`, `reusable`. Perk tiles hidden when not premium.
Footer: last order line (date · items · price) and "updated N min ago" + Refresh → `update_data`.
Grid: 6×3.

### rohlik-spending-card

Totals row: month (`monthly_spent`), year (`yearly_spent` + order_count), avg order
(`yearly_spent.average_order_value`). By-year bar chart from `alltime_spent.by_year`, current year
highlighted, inline SVG, theme colours. Period tabs (this year / all time). Level tabs built from
which sensors exist: L0 `categories_l0_*`, L1 `categories_*`, L2 `categories_l2_*`, L3 `categories_l3_*`,
Items `items_*`. Horizontal bars proportional to the top entry; each row: name, bar, spent;
tap → expands units and avg unit price. If no analytics sensors exist: one-line hint
"Enable Spending Analytics in the integration options to see a breakdown."
Options: `device`, `name?`, `default_period`, `default_level`, `top_n` (10), `show_years`, `show_totals`.
Grid: 12×5 (min 6×3).

## Repository layout

```
hacs.json                     { "name": "Rohlík.cz Cards", "render_readme": true, "filename": "rohlik-cards.js" }
package.json                  lit 3, typescript 5, rollup, eslint, prettier, vitest
rollup.config.mjs             → dist/rohlik-cards.js (single IIFE/ESM bundle, minified)
src/index.ts                  imports every card + badge, registers customCards / customBadges
src/core/types.ts             HomeAssistant, HassEntity, LovelaceCard, etc.
src/core/discovery.ts         findRohlikDevices(hass), resolveEntities(hass, deviceId) → Map<translation_key, entity_id>
src/core/actions.ts           getConfigEntryId(hass, entityId), callRohlik(hass, service, data, withResponse)
src/core/format.ts            formatMoney, formatTime, formatRelativeDay, formatAgo, parseTs
src/core/localize.ts          localize(hass, dict, key, vars)
src/core/base-card.ts         RohlikBaseCard: device resolution, entity getters, shared styles, freshness footer
src/core/styles.ts            shared css`` (chips, rows, big number, buttons)
src/core/editor.ts            RohlikBaseEditor: ha-form wrapper + device selector schema
src/cards/<name>/<name>.ts, editor.ts, strings.ts
src/badges/delivery-badge/...
dist/rohlik-cards.js          committed build output (HACS reads release asset; also usable from main)
.github/workflows/ci.yml      npm ci, lint, typecheck, test, build
.github/workflows/release.yml build on tag v*, upload dist/rohlik-cards.js as release asset
docs/                         this file, screenshots, per-card option docs
README.md
```
