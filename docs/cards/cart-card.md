# rohlik-cart-card

Live shopping cart: total price, item count, an editable list of cart lines
(quantity stepper, remove), and a product search box that adds straight to
the cart.

## Options

| Option               | Type    | Default | Description |
|-----------------------|---------|---------|-------------|
| `device`              | string  | —       | **Required.** Rohlík.cz device id (pick it in the visual editor). |
| `name`                | string  | —       | Overrides the card title ("Shopping cart" / "Nákupní košík"). |
| `accent`              | string  | —       | Overrides the accent colour (defaults to the theme's primary colour). |
| `show_search`         | boolean | `true`  | Show the product search box. |
| `group_by_category`   | boolean | `false` | Group cart lines under small uppercase category headers. |
| `show_brand`          | boolean | `true`  | Show the brand in each line's secondary text. |
| `max_items`           | number  | `6`     | How many lines to show before collapsing the rest behind "Show all N". |

## YAML example

```yaml
type: custom:rohlik-cart-card
device: 0123456789abcdef0123456789abcdef
show_search: true
group_by_category: false
show_brand: true
max_items: 6
```

## Behaviour

- **Data**: cart lines come from the `shopping_cart` `todo` entity via
  `todo/item/list`; the total price and item count come from the
  `cart_price` sensor's state and `Total items` attribute, and the
  "Can order" / "Below minimum" header chip from its `Can Order` attribute.
  Items are re-fetched whenever the `todo` entity's state/`last_updated` or
  the `cart_price` state changes.
- **Remove a line**: the `×` button calls `todo.remove_item` with the
  line's `uid`. The row is optimistically removed from the list and
  restored with an inline error if the service call fails.
- **Change quantity (the delete + re-add caveat)**: the integration has no
  "update item" action, so `−`/`+` on a line **deletes the todo item and
  re-adds it** via `rohlikcz.add_to_cart` with the new quantity. This means:
  - Pressing `−` at quantity 1 removes the line instead of going to 0.
  - The line's `uid` **changes** after every quantity edit — the card
    reloads the true list once the `todo` entity's state updates, so don't
    rely on a line's `uid` staying stable across a quantity change.
  - If the re-add fails (e.g. the product went out of stock), the card
    reverts to the pre-edit quantity and shows an inline error; the item
    may briefly disappear from the real cart until the reload confirms the
    outcome.
  - Both steps disable that row's controls until they resolve, so repeated
    clicks can't race each other.
- **Search** (`show_search`): typing debounces 400 ms and requires at least
  2 characters before calling `rohlikcz.search_product` (`limit: 8`,
  `favourite` from the heart toggle). Each result row has a `+` button that
  calls `rohlikcz.add_to_cart` with the quantity parsed from the search box
  text (see quick-add parsing below; defaults to 1). Pressing **Enter** in
  the box calls `rohlikcz.search_and_add_to_cart` directly with the parsed
  name/quantity; a `success: false` response (or a thrown error) is shown
  inline instead of clearing the box. **Escape** clears the box and any
  results.
- **Quick-add parsing** (`src/cards/cart-card/parse.ts#parseQuickAdd`): a
  leading integer + space is the quantity ("`3 Mléko`" → qty 3, "Mléko");
  otherwise a trailing "`(N)`" is the quantity ("Mléko (3)" → qty 3,
  "Mléko"); otherwise the quantity defaults to 1 and the whole text is the
  product name.
- **Rows**: name (ellipsized), secondary "category · brand" text (brand
  hidden when `show_brand: false`), a stepper, the line's price, and a
  remove button. `max_items` collapses lines beyond that count behind a
  "Show all (N)" / "Show less" ghost button. With `group_by_category: true`,
  the *currently visible* lines are grouped under category headers, sorted
  alphabetically with uncategorised lines in a final group.
- **Empty cart**: shows a "Cart is empty" caption; if the `last_order`
  sensor has an `Items` attribute, an extra hint line reads "Your last
  order had N items" — the search box (if enabled) stays visible so you can
  start a new cart straight away.
- **Missing entities**: if the `shopping_cart` or `cart_price` entities
  can't be found on the configured device, the card shows a localized error
  instead of a blank card.
- **Footer**: the shared "updated N min ago" freshness line (from the
  `updated` sensor) plus a "Refresh" ghost button that re-fetches the todo
  items on demand.

## Grid

12 columns × 4 rows by default, minimum 6 × 3 (`getCardSize()` returns 5).
