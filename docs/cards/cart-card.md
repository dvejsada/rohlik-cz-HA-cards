# rohlik-cart-card

Live shopping cart: total price, item count, an editable list of cart lines
(quantity stepper, remove), and a product search box that adds straight to
the cart.

## Options

| Option               | Type    | Default | Description |
|-----------------------|---------|---------|-------------|
| `device`              | string  | —       | **Required.** Rohlík.cz device id (pick it in the visual editor). |
| `name`                | string  | —       | Overrides the card title ("Shopping cart" / "Nákupní košík"). |
| `language`            | string  | `auto`  | `auto` \| `cs` \| `en`. `auto` follows the Home Assistant UI language; otherwise pins the card's strings, dates and money formatting to that language regardless of the HA locale. |
| `accent`              | string  | —       | Overrides the accent colour (defaults to the theme's primary colour). |
| `show_search`         | boolean | `true`  | Show the product search box. |
| `group_by_category`   | boolean | `false` | Group cart lines under small uppercase category headers. |
| `show_brand`          | boolean | `true`  | Show the brand in each line's secondary text. |
| `max_items`           | number  | `6`     | How many lines to show before collapsing the rest behind "Show all N". |
| `show_order_button`   | boolean | `true`  | Show the "Order" button in the footer that opens the Rohlík.cz cart. |
| `checkout_url`        | string  | `https://www.rohlik.cz/kosik` | URL the "Order" button opens in a new tab. |

## YAML example

```yaml
type: custom:rohlik-cart-card
device: 0123456789abcdef0123456789abcdef
show_search: true
group_by_category: false
show_brand: true
max_items: 6
show_order_button: true
checkout_url: https://www.rohlik.cz/kosik
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
  `favourite` from the heart toggle). Results **float over the page in a
  popover** instead of pushing the card's own content down — a
  `position: fixed` panel positioned from the search box's own
  `getBoundingClientRect()` (so it also works when the card is inside a
  dialog), capped at `min(320px, 60vh)` tall with its own scrollbar, and
  kept aligned with the search box on scroll/resize while open. It closes on
  **Escape**, on clicking/tapping anywhere outside the card, and right after
  an item is added. If the box has no matches, the popover shows "No
  results" instead of staying empty.
  - The input is a `role="combobox"` (`aria-expanded`, `aria-controls`) and
    each result row is `role="option"`. **↓/↑** move a highlighted row
    (hovering a row with the mouse highlights it too); **Enter** on a
    highlighted row adds that product. With nothing highlighted, **Enter**
    falls back to the previous quick-add behaviour: it calls
    `rohlikcz.search_and_add_to_cart` directly with the parsed name/quantity;
    a `success: false` response (or a thrown error) is shown inside the
    popover instead of clearing the box.
  - Each result row also keeps its `+` button, which calls
    `rohlikcz.add_to_cart` with the quantity parsed from the search box text
    (see quick-add parsing below; defaults to 1).
  - **Escape** clears the box and closes the popover.
- **Order button** (`show_order_button`): a primary button in the footer,
  next to Refresh, that opens `checkout_url` (default the Rohlík.cz cart) in
  a new tab. It's only enabled when the `cart_price` sensor's `Can Order`
  attribute is true and the cart isn't empty; otherwise it renders disabled
  (`aria-disabled`, muted, no `href`) with a "Below minimum order" tooltip.
  The same hint appears as a line under the total whenever the cart is
  non-empty but below the minimum order value.
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
  `updated` sensor), a "Refresh" ghost button that re-fetches the todo items
  on demand, and (if `show_order_button`) the "Order" button — right-aligned
  as a group next to Refresh.
- **Narrow widths**: the card uses a container query (`@container
  (max-width: 420px)`), so it adapts to its own column width rather than the
  viewport. Below 420px: the header wraps so the "Can order"/"Below minimum"
  chip drops under the title; each cart line stacks into two rows (name on
  the first, the stepper/price/remove group right-aligned on the second);
  the total's font size shrinks; and the footer buttons go full-width,
  stacked. At any width, long product names wrap onto at most two lines
  instead of being cut off mid-word, and nothing overflows horizontally.

## Grid

12 columns × 4 rows by default, minimum 6 × 3 (`getCardSize()` returns 5).
