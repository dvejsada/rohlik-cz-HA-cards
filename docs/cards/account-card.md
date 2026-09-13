# rohlik-account-card

An at-a-glance view of your Rohlík.cz account: Xtra membership status,
credit, bags, and the perks that come with an active membership, plus a
last-order line and a manual data refresh.

## Options

| Option        | Type    | Default                                                                 | Description |
|---------------|---------|--------------------------------------------------------------------------|-------------|
| `device`      | string  | —                                                                          | **Required.** Rohlík.cz device id (pick it in the visual editor). |
| `name`        | string  | —                                                                          | Overrides the card title (defaults to the device name). |
| `accent`      | string  | —                                                                          | Overrides the accent colour (defaults to the theme's primary colour). |
| `language`    | `auto` \| `cs` \| `en` | `auto`                                                     | Card language. `auto` follows the Home Assistant UI language; otherwise every string, date and money value is forced to the chosen one regardless of the dashboard's own language. |
| `stats`       | array   | `[credit, bags, no_limit, free_express, parents_club, reusable]`         | Which stat tiles to show, and in what order. |
| `show_footer` | boolean | `true`                                                                     | Show the last-order line and the refresh button. |

## YAML example

```yaml
type: custom:rohlik-account-card
device: 0123456789abcdef0123456789abcdef
stats:
  - credit
  - bags
  - no_limit
  - free_express
  - parents_club
  - reusable
show_footer: true
```

## Behaviour

- The header chip reads "Xtra · N dní"/"Xtra · N days" (amber once N drops
  below 7) when `is_premium` is on, or "Bez Xtra"/"No Xtra" otherwise. `N`
  comes from the `premium_days` sensor, falling back to `is_premium`'s
  `remaining_days` attribute.
- Stat tiles, in a two-column grid (one column once the card is narrow):
  - **credit** — `credit_amount`, formatted as money.
  - **bags** — `bags_amount` as "current / Max Bags", with a "záloha
    {amount}"/"{amount} deposit" caption when a `Deposit Amount` is set.
  - **no_limit** / **free_express** — the remaining count from the
    `no_limit`/`free_express` sensors as "zbývá N"/"N left". Hidden
    whenever `is_premium` is off, since these are Xtra perks.
  - **parents_club** / **reusable** — "Ano"/"Ne" ("Yes"/"No") from
    `is_parent` / `is_reusable`.

  A tile is skipped entirely (not shown as empty) when its backing entity
  isn't present on the device.
- The footer (when `show_footer` is `true`) is two lines: the last order on
  its own line, wrapping if it's long — "Poslední objednávka 13. 9. · 18
  položek · 940,43 Kč" style, built from `last_order`'s timestamp and its
  `Items`/`Price` attributes — then a second line, right-aligned, with the
  "updated N min ago" freshness text and a ghost refresh button. The
  refresh button calls `rohlikcz.update_data` (spinning while in flight)
  and shows an inline error line if the call fails.
- Below ~360px wide, the stat tiles drop from two columns to one, and the
  "Xtra · N days" header chip wraps below the title instead of crowding
  it.
- If no `rohlikcz` entities can be found on the configured device, the card
  shows "Rohlík.cz entities not found on this device" instead of a blank
  card.

## Grid sizing

6 columns × 3 rows (minimum 4 × 2).
