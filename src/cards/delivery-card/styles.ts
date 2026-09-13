import { css } from "lit";

/**
 * `rohlik-delivery-card`-specific styles, layered on top of
 * `core/styles.ts#sharedStyles` (chips, `.row`, `.big`, `.btn`, `.error`, …).
 */
export const deliveryCardStyles = css`
  .header {
    cursor: pointer;
  }

  .header.static {
    cursor: default;
  }

  .header:focus-visible,
  .compact-row:focus-visible {
    outline: 2px solid var(--rohlik-accent, var(--primary-color));
    outline-offset: 2px;
  }

  /* The title keeps a floor and the chips shrink (wrapping) first, so three
     chips can never squeeze the title to zero width in a mid-width card. */
  .header .title {
    flex: 1 1 auto;
    min-width: 5em;
  }

  .chips {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    flex: 0 1 auto;
    min-width: 0;
    flex-wrap: wrap;
  }

  .headline {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 2px;
  }

  .caption {
    display: block;
    color: var(--secondary-text-color);
    font-size: 13px;
    margin: 0 0 4px;
  }

  .sub {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  .track-wrap {
    margin: 16px 0 6px;
  }

  .track {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color);
    overflow: visible;
  }

  .track-fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: 3px;
    background: var(--rohlik-accent, var(--primary-color));
  }

  .track-marker {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--rohlik-accent, var(--primary-color));
    border: 2px solid var(--card-background-color, #fff);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 1px var(--rohlik-accent, var(--primary-color));
  }

  .ticks {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
  }

  .announce {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .announce .text {
    color: var(--primary-text-color);
  }

  .announce .meta {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  /* Flexbox won't let a flex child's text wrap unless it can shrink below
     its content width — the announcement row is inside .row (a flex
     container from core/styles.ts), so give it a floor of 0 explicitly. */
  .row .announce {
    min-width: 0;
    flex: 1;
  }

  .reserved-line {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-bottom: 4px;
  }

  .slots {
    display: flex;
    flex-direction: column;
    margin: 4px 0;
  }

  .slot-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--divider-color);
    font-size: 0.85rem;
  }

  .slot-row:last-child {
    border-bottom: none;
  }

  .slot-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 18px;
    flex-shrink: 0;
  }

  .slot-label {
    flex: 1;
    min-width: 0;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .slot-day {
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .slot-price {
    font-weight: 500;
    color: var(--primary-text-color);
    min-width: 60px;
    text-align: right;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .actions a.btn {
    text-decoration: none;
  }

  ha-icon.spin {
    animation: rohlik-spin 1s linear infinite;
  }

  @keyframes rohlik-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .compact-row {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .compact-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 24px;
    flex-shrink: 0;
  }

  .compact-row .headline {
    flex: 1;
    margin: 0;
    overflow: hidden;
  }

  .compact-row .big {
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* :host sets container-type: inline-size (core/styles.ts) — this queries
     the card's own rendered width, not the viewport, so it also kicks in
     for a narrow column in a dashboard grid, not just a phone screen. */
  @container (max-width: 520px) {
    .header {
      flex-wrap: wrap;
      row-gap: 6px;
    }

    .header .chips {
      /* Forces a wrap point right before the chips, so they always land on
         their own line under the title instead of just shrinking it. */
      flex-basis: 100%;
    }

    .big {
      font-size: 26px;
    }

    .track-wrap {
      overflow: hidden;
    }

    .announce .text {
      overflow-wrap: break-word;
      word-break: break-word;
    }

    .slot-label {
      white-space: normal;
    }

    .actions {
      flex-direction: column;
      align-items: stretch;
    }

    .actions .btn {
      width: 100%;
    }
  }
`;
