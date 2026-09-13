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

  .chips {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .headline {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 2px;
  }

  .caption {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
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

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
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
`;
