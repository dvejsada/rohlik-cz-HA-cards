import { css } from "lit";

/** Favourites card. Touch-first: 56 px add buttons for wall tablets. */
export const favouritesCardStyles = css`
  :host {
    --rohlik-thumb-size: 56px;
  }

  /* Product shots are cut out on white, so a white tile keeps them readable
     in the dark theme too. */
  .thumb {
    flex: none;
    width: var(--rohlik-thumb-size);
    height: var(--rohlik-thumb-size);
    border-radius: 6px;
    object-fit: contain;
    background: #fff;
  }

  .thumb.placeholder {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
  }

  .header .count {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    font-weight: 400;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
  }

  .icon-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .search {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 48px;
    padding: 0 8px 0 12px;
    margin-bottom: 8px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--secondary-text-color);
  }

  .search:focus-within {
    border-color: var(--accent-color, var(--rohlik-accent));
  }

  .search input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--primary-text-color);
    font: inherit;
    font-size: 1rem;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 16px;
  }

  @container (min-width: 640px) {
    .list {
      grid-template-columns: 1fr 1fr;
    }
  }

  .fav {
    min-height: 72px;
    gap: 12px;
  }

  /* In two columns every row keeps its bottom line; the last two may both end. */
  .list .fav:last-child {
    border-bottom: 1px solid var(--divider-color);
  }

  .fav.out {
    color: var(--secondary-text-color);
  }

  .fav.out .thumb {
    opacity: 0.5;
  }

  .cell {
    flex: 1 1 auto;
    min-width: 0;
  }

  .name {
    color: var(--primary-text-color);
    font-size: 1rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .fav.out .name {
    color: var(--secondary-text-color);
  }

  .meta {
    margin-top: 2px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  .meta .sale {
    color: var(--warning-color, #ff9800);
    font-weight: 500;
  }

  .meta .in-cart {
    color: var(--success-color, #4caf50);
    font-weight: 500;
  }

  .add {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--rohlik-accent);
    cursor: pointer;
    --mdc-icon-size: 28px;
    transition: opacity 120ms;
  }

  .add.has {
    border-color: var(--success-color, #4caf50);
    color: var(--success-color, #4caf50);
  }

  .add:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .add:focus-visible {
    outline: 2px solid var(--accent-color, var(--rohlik-accent));
    outline-offset: 2px;
  }

  .hint {
    padding: 16px 4px;
    color: var(--secondary-text-color);
    font-size: 0.95rem;
  }

  .show-toggle {
    align-self: center;
    margin-top: 8px;
    min-height: 44px;
  }

  .toast {
    margin-top: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--success-color, #4caf50) 15%, transparent);
    font-size: 0.9rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .add {
      transition: none;
    }
  }
`;
