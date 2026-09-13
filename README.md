# Rohlík.cz Cards

![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)

Custom Lovelace cards and a badge for the
[HA-RohlikCZ](https://github.com/dvejsada/HA-RohlikCZ) Home Assistant integration —
next delivery status, your shopping cart, delivery slots, account details and
spending analytics, all rendered natively with your dashboard theme.

![Rohlík.cz cards overview](docs/images/overview.png)

## Installation

### HACS (recommended)

1. In HACS, go to **Integrations → ⋮ → Custom repositories**.
2. Add this repository's URL with category **Dashboard**.
3. Install **Rohlík.cz Cards**, then reload your browser.

### Manual

1. Download `rohlik-cards.js` from the [latest release](../../releases/latest) (or `dist/`
   on `main`) and copy it into `<config>/www/rohlik-cards/`.
2. Add it as a Lovelace resource:

   ```
   /hacsfiles/rohlik-cz-HA-cards/rohlik-cards.js
   ```

   (or `/local/rohlik-cards/rohlik-cards.js` for a manual copy) as a **JavaScript module**.

## Cards

| Custom element              | Card            | Docs                                                    |
|------------------------------|-----------------|----------------------------------------------------------|
| `rohlik-delivery-card`       | Next Delivery   | [docs/cards/delivery-card.md](docs/cards/delivery-card.md) |
| `rohlik-delivery-badge`      | Delivery badge  | [docs/cards/delivery-card.md#badge](docs/cards/delivery-card.md#badge--rohlik-delivery-badge) |
| `rohlik-cart-card`           | Shopping Cart   | [docs/cards/cart-card.md](docs/cards/cart-card.md) |
| `rohlik-slots-card`          | Delivery Slots  | [docs/cards/slots-card.md](docs/cards/slots-card.md) |
| `rohlik-account-card`        | Account         | [docs/cards/account-card.md](docs/cards/account-card.md) |
| `rohlik-spending-card`       | Spending        | [docs/cards/spending-card.md](docs/cards/spending-card.md) |

<table>
  <tr>
    <td><img src="docs/images/delivery-card.png" alt="Next Delivery card" width="420"></td>
    <td><img src="docs/images/cart-card.png" alt="Shopping Cart card" width="420"></td>
  </tr>
  <tr>
    <td><img src="docs/images/slots-card.png" alt="Delivery Slots card" width="420"></td>
    <td><img src="docs/images/account-card.png" alt="Account card" width="420"></td>
  </tr>
  <tr>
    <td><img src="docs/images/spending-card.png" alt="Spending card" width="420"></td>
    <td><img src="docs/images/delivery-badge.png" alt="Delivery badge" width="420"></td>
  </tr>
</table>

Quick start — add a card via **Edit dashboard → Add card → Rohlík.cz Next Delivery**,
or in YAML:

```yaml
type: custom:rohlik-delivery-card
device: 0123456789abcdef0123456789abcdef   # your Rohlík.cz device id
```

Every card takes a single `device: <device_id>` option — pick the Rohlík.cz device
in the visual editor, no entity IDs required. See [docs/DESIGN.md](docs/DESIGN.md)
for the full data contract and per-card specification.

## Requirements

These cards require the [HA-RohlikCZ](https://github.com/dvejsada/HA-RohlikCZ)
integration, version **1.0.0 or newer**, configured and running in your Home
Assistant instance.

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
under `docs/images/`, including this README's overview. Open
`docs/dev/preview/index.html` yourself (served over `http(s)`, not `file://`,
so the module import resolves) to poke at a card live; `?lang=en`, `?theme=dark`
and `?state=arriving|ordered|none|delivered` switch the mock's scenario.

## License

MIT — see [LICENSE](LICENSE).
