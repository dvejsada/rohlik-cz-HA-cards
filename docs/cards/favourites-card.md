# rohlik-favourites-card

Your favourite products as a touch-friendly list with a large add-to-cart button.
Reads the `favourites` sensor of HA-RohlikCZ (attribute `products`).

## Options

| Option              | Type    | Default | Description |
|---------------------|---------|---------|-------------|
| `device`            | string  | —       | **Required.** Rohlík.cz device id (pick it in the visual editor). |
| `name`              | string  | —       | Overrides the card title. |
| `accent`            | string  | —       | Overrides the accent colour. |
| `language`          | `auto` \| `cs` \| `en` \| `de` | `auto` | Card language. |
| `show_search`       | boolean | `true`  | Search box that filters the list (local, no request to the shop). |
| `show_price`        | boolean | `true`  | Show the price (sale prices in the warning colour). |
| `hide_out_of_stock` | boolean | `false` | Leave out products the shop cannot deliver right now. |
| `max_items`         | number  | `12`    | Rows shown before "Show all". `0` shows everything. A search always shows every hit. |

## YAML example

```yaml
type: custom:rohlik-favourites-card
device: 0123456789abcdef0123456789abcdef
max_items: 12
```

## Behaviour

- **+** calls `rohlikcz.add_to_cart` with quantity 1. The row shows the new count at once
  ("2× in cart") and a short confirmation appears under the list for 4 seconds. Nothing is
  ever ordered; ordering stays in the shop's app.
- The quantities come from the cart (`todo` entity of the same device) and refresh whenever
  the cart changes.
- The reload button calls `rohlikcz.get_favourites`; otherwise the integration refreshes the
  list once an hour.
- Rows are at least 72 px high and the add button is 56 × 56 px, sized for wall tablets.
- The card is not a scroll container, so swiping on it scrolls the dashboard.
