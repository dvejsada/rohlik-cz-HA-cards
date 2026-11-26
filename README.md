# Rohlík.cz Cards

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz/)
[![GitHub release](https://img.shields.io/github/v/release/dvejsada/rohlik-cz-HA-cards?include_prereleases)](https://github.com/dvejsada/rohlik-cz-HA-cards/releases)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-%3E%3D2025.2-blue)](https://www.home-assistant.io/)

Custom Lovelace cards and a badge for the
[HA-RohlikCZ](https://github.com/dvejsada/HA-RohlikCZ) Home Assistant integration —
next delivery status, your shopping cart, delivery slots, account details and
spending analytics, all rendered natively with your dashboard theme.

![Rohlík.cz cards overview](docs/images/overview.png?v=0.2.1-beta)

## Installation

### HACS (recommended)

One click opens the repository in HACS on your instance, prefilled:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=dvejsada&repository=rohlik-cz-HA-cards&category=dashboard)

Or by hand, until the repository is listed in the HACS default store:

1. In HACS, open **⋮ → Custom repositories**.
2. Add `https://github.com/dvejsada/rohlik-cz-HA-cards` with category **Dashboard**.
3. Install **Rohlík.cz Cards** and reload your browser. HACS registers the
   `/hacsfiles/rohlik-cz-HA-cards/rohlik-cards.js` resource for you.

Releases marked *pre-release* (like `v0.1.0-alpha`) only show up in HACS when
**Show beta versions** is enabled in the download dialog.

### Manual

1. Download `rohlik-cards.js` from the [latest release](https://github.com/dvejsada/rohlik-cz-HA-cards/releases)
   (or `dist/` on `main`) and copy it into `<config>/www/rohlik-cards/`.
2. Add it as a Lovelace resource:

   ```
   /hacsfiles/rohlik-cz-HA-cards/rohlik-cards.js
   ```

   (or `/local/rohlik-cards/rohlik-cards.js` for a manual copy) as a **JavaScript module**.

## Cards

Every card takes a single `device` option: pick your Rohlík.cz account in the visual
editor and the card finds its entities itself, no entity IDs needed. All cards speak
Czech and English (`language: auto` follows your Home Assistant profile), use only your
theme's colours, adapt to their own width on phones, and show an "updated N min ago"
footer that turns amber when the integration stops refreshing.

The renders below are produced by the bundled preview harness from the current
build with sample data (`npm run screenshots`), so they always match the cards you get.

On Home Assistant 2026.6 or newer, the cards are also suggested in the card picker when
you add a card for a Rohlík entity (for example the Delivery Status sensor suggests the
Next Delivery card), already set to that account.

In a sections dashboard every card is as tall as its content, so cards no longer overlap
or reserve empty room below themselves (two cards side by side both stretch to the
taller one, like Home Assistant's own cards). **Upgrading from 0.2.0 or older:** if you ever resized a card
(even just its width by clicking the size grid), a fixed height may be saved in its
layout. Open the card's **Layout** tab and turn **Use recommended size** back on (or
**Fit height to content**). A card kept at a fixed height scrolls inside it instead of
overlapping its neighbours. On phones and
tablets the cart now shows its first 8 items with "Show all"; set **Max items** to `0`
to always list everything.

### Next Delivery — `rohlik-delivery-card`

<img src="docs/images/delivery-card.png?v=0.2.1-beta" alt="Next Delivery card while the courier is on the way" width="480">

One card, four states. **Ordered**: the delivery window with a countdown. **On the
way**: the live ETA as the headline, a progress track across the window, the courier's
announcement and the order summary. **Delivered**: the last order and an "order again"
link. **No order**: the nearest available slot, reserved-slot and express chips, and up to
three upcoming slots with prices.

<img src="docs/images/delivery-card-ordered.png?v=0.2.1-beta" alt="Next Delivery card, ordered state" width="360"> <img src="docs/images/delivery-card-none.png?v=0.2.1-beta" alt="Next Delivery card, no order state" width="360">

A matching **badge**, `rohlik-delivery-badge`, shows the same state in one line at the
top of a view:

<img src="docs/images/delivery-badge.png?v=0.2.1-beta" alt="Delivery badge" width="240">

Options: `show_announcement`, `show_order_summary`, `show_express_chip`, `show_refresh`,
`show_slots`, `show_shop_link`, `show_tracking`, `show_countdown`, `compact`, `tap_action`. Full reference in
[docs/cards/delivery-card.md](docs/cards/delivery-card.md).

### Shopping Cart — `rohlik-cart-card`

<img src="docs/images/cart-card.png?v=0.2.1-beta" alt="Shopping Cart card" width="480">

Your live cart as product rows with a quantity stepper and remove button, the total and
item count, and an inline search box: results float over the page, `+` or Enter adds a
product (type `3 rohlíky` to add three), a heart limits results to favourites. The
**Order** button opens your shop's cart in a new tab. An "Above/Below minimum" chip
shows how much is missing to the shop's minimum order (or your own `min_order`); Xtra
no-limit orders count as above.
Long carts scroll inside the card on desktop (`list_max_height`) and show the first 8
items with "Show all" on phones (`max_items`).

Options: `show_search`, `group_by_category`, `show_brand`, `max_items`, `list_max_height`,
`min_order`, `show_order_button`, `checkout_url`. Reference:
[docs/cards/cart-card.md](docs/cards/cart-card.md).

### Delivery Slots — `rohlik-slots-card`

<img src="docs/images/slots-card.png?v=0.2.1-beta" alt="Delivery Slots card" width="720">

The nearest Express, Standard and Eco slots with time, window, price and a capacity bar
that turns amber and red as a slot fills. The eye button switches on **watch mode**,
which polls the integration's cheap `refresh_slots` action every few seconds while the
page is visible, so the "Express available" chip flips the moment a slot opens. Tiles sit
side by side in a wide card and stack into compact rows in a narrow one.

Options: `slots`, `layout` (`auto`, `row`, `column`), `show_price`, `show_location`,
`watch_interval`, `show_tiles`, `show_windows`, `hide_booked`. Reference:
[docs/cards/slots-card.md](docs/cards/slots-card.md).

With `show_windows: true` (needs HA-RohlikCZ with the Delivery slots sensor) the card also
lists **every delivery window** of the coming days: a chip per day, a switch between one-hour
and 15-minute windows where the shop offers them, and a tile per window with its free
capacity. Booked-out windows stay visible with a dashed outline unless `hide_booked` is set;
`show_tiles: false` shows only the window list. The chosen day and length are remembered per
browser.

<img src="docs/images/slots-card-windows.png" alt="Delivery Slots card with every delivery window" width="720">

### Favourites — `rohlik-favourites-card`

<img src="docs/images/favourites-card.png" alt="Favourites card" width="720">

Your favourite products (marked with the heart in the shop's app) as a touch-friendly list:
picture, name, packaging and price, and a large **+** that puts one piece in the cart. A search
box filters the list as you type; products already in the cart show how many are in it,
out-of-stock ones are greyed out. Two columns on a wide card, one on a phone. Needs HA-RohlikCZ
with the Favourites sensor.

Options: `show_search`, `show_price`, `hide_out_of_stock`, `max_items` (rows before "Show all",
default 12, 0 = all). Reference: [docs/cards/favourites-card.md](docs/cards/favourites-card.md).

### Account — `rohlik-account-card`

<img src="docs/images/account-card.png?v=0.2.1-beta" alt="Account card" width="480">

Xtra membership with days remaining, credit, reusable bags and deposit, remaining
no-limit and free-express orders (hidden when you are not a member), Parents Club, the
last order, and a refresh button that triggers a full integration update.

Options: `stats` (which tiles, in which order), `show_footer`. Reference:
[docs/cards/account-card.md](docs/cards/account-card.md).

### Spending — `rohlik-spending-card`

<img src="docs/images/spending-card.png?v=0.2.1-beta" alt="Spending card, this year" width="720">

Month, year and all-time totals with order counts and the average order value, a
by-year chart, and a breakdown by category level or by product from the integration's
opt-in **Spending Analytics** sensors (tap a row for units and price per unit). The
**This month** period swaps the chart for the last twelve months, read from Home
Assistant's long-term statistics of the monthly-spent sensor.

<img src="docs/images/spending-card-month.png?v=0.2.1-beta" alt="Spending card, this month with the monthly chart" width="720">

Options: `default_period` (`month`, `year`, `all`), `default_level`, `top_n`, `chart`
(`auto`, `years`, `months`, `none`), `show_totals`. Reference:
[docs/cards/spending-card.md](docs/cards/spending-card.md).

Quick start — add a card via **Edit dashboard → Add card → Rohlík.cz Next Delivery**,
or in YAML:

```yaml
type: custom:rohlik-delivery-card
device: 0123456789abcdef0123456789abcdef   # your Rohlík.cz device id
```

See [docs/DESIGN.md](docs/DESIGN.md) for the full data contract and per-card
specification.

## Testing before publishing (sideload)

You can try the cards on your own Home Assistant instance without HACS:

1. Download [`dist/rohlik-cards.js`](dist/rohlik-cards.js) from this repository
   (the **Raw** button, or `curl -L https://raw.githubusercontent.com/dvejsada/rohlik-cz-HA-cards/main/dist/rohlik-cards.js -o rohlik-cards.js`).
2. Copy it to `<config>/www/rohlik-cards/rohlik-cards.js` on your Home Assistant host
   (create the `www` folder if it does not exist; the Samba, SSH or File editor add-ons all work).
3. In Home Assistant go to **Settings → Dashboards → ⋮ (top right) → Resources → Add resource**,
   enter `/local/rohlik-cards/rohlik-cards.js?v=1` and choose **JavaScript module**.
   (Resources are only visible when *Advanced mode* is on in your user profile.)
4. Hard-refresh the browser (Ctrl+Shift+R / Cmd+Shift+R). The cards now appear under
   **Add card** as *Rohlík.cz Next Delivery*, *Rohlík.cz Shopping Cart* and so on, and the
   browser console prints a `ROHLIK-CARDS` banner with the version.
5. To update, overwrite the file and bump the `?v=` number in the resource URL so the
   browser does not serve the cached copy.

Alternatively add this repository to HACS as a **custom repository** with category
**Dashboard**: HACS then downloads `dist/rohlik-cards.js` straight from the default
branch and registers the resource for you, no release needed.

For development against a live integration without touching your real instance, see the
throwaway Home Assistant container in [docs/dev/README.md](docs/dev/README.md).

## Requirements

These cards require the [HA-RohlikCZ](https://github.com/dvejsada/HA-RohlikCZ)
integration, version **1.0.0 or newer**, configured and running in your Home
Assistant instance. Version **1.3.0 or newer** adds live courier tracking to the delivery
card and badge, the shop's minimum order to the cart card, and support for every Rohlík
Group shop (Knuspr.de, Gurkerl.at, Kifli.hu, Sezamo.ro) with amounts in its currency.

## Development

```bash
npm install
npm run dev        # rollup --watch
npm run build      # dist/rohlik-cards.js (minified, no sourcemap)
npm run lint        # eslint src
npm run typecheck   # tsc --noEmit
npm test            # vitest run
npm run format       # prettier --write .
```

See [docs/dev/README.md](docs/dev/README.md) for a throwaway Home Assistant
container to try cards against a live `rohlikcz` integration while developing.

**Preview harness.** `npm run build && npm run screenshots` loads the built
`dist/rohlik-cards.js` in headless Chromium against a mocked `hass`
(`docs/dev/preview/`, no live Home Assistant needed) and regenerates every PNG
under `docs/images/` (the ones embedded in this README) and fails on any console
error, in light and dark themes, at desktop and phone width. Open
`docs/dev/preview/index.html` yourself (served over `http(s)`, not `file://`,
so the module import resolves) to poke at a card live; `?lang=en`, `?theme=dark`,
`?state=arriving|ordered|none|delivered` and `?period=month|year|all` switch the
mock's scenario.

## License

MIT — see [LICENSE](LICENSE).
