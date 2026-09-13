import { css } from "lit";

/** Cart-card-specific styles, layered on top of `core/styles.ts` `sharedStyles`. */
export const cartStyles = css`
  .caption {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin-top: 2px;
  }

  .hint {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-top: 4px;
  }

  .search {
    margin: 12px 0;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: var(--ha-card-border-radius, 12px);
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
  }

  .search-box ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: 20px;
  }

  .search-box input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 0.9rem;
    font-family: inherit;
    padding: 6px 0;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .icon-btn:hover:not(:disabled) {
    background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
  }

  .icon-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .icon-btn.active {
    color: var(--rohlik-accent);
  }

  .icon-btn.remove:hover:not(:disabled) {
    color: var(--error-color, #db4437);
  }

  .spinner {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    border: 2px solid color-mix(in srgb, var(--rohlik-accent) 30%, transparent);
    border-top-color: var(--rohlik-accent);
    border-radius: 50%;
    animation: rohlik-spin 0.8s linear infinite;
  }

  @keyframes rohlik-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .search-results {
    margin-top: 4px;
    border-top: 1px solid var(--divider-color);
  }

  .row.search-result .cell {
    min-width: 0;
  }

  .row.search-result .price {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .category-header {
    margin-top: 12px;
    padding-bottom: 2px;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .category-header:first-child {
    margin-top: 0;
  }

  .cell {
    flex: 1;
    min-width: 0;
  }

  .cell .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--primary-text-color);
  }

  .cell .secondary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  .stepper {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
    flex-shrink: 0;
  }

  .step-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
  }

  .step-btn:hover:not(:disabled) {
    background: color-mix(in srgb, var(--rohlik-accent) 20%, transparent);
  }

  .step-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .qty {
    min-width: 1.4em;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .line-price {
    min-width: 4.5em;
    text-align: right;
    font-size: 0.9rem;
    color: var(--primary-text-color);
    flex-shrink: 0;
  }

  .row.pending {
    opacity: 0.6;
  }

  .show-toggle {
    align-self: center;
    margin-top: 8px;
  }

  .footer-row {
    margin-top: auto;
    padding-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .footer-row .footer {
    margin-top: 0;
  }
`;
