import { css } from "lit";

/**
 * `rohlik-slots-card`-specific styles, layered on top of
 * `core/styles.ts#sharedStyles` (`.chip`, `.header`, `.footer`, `.error`, …).
 */
export const slotsCardStyles = css`
  :host {
    container-type: inline-size;
    container-name: rohlik-slots;
  }

  .watch-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border: none;
    cursor: pointer;
    font: inherit;
  }

  .watch-btn ha-icon {
    --mdc-icon-size: 16px;
  }

  .watch-btn.watching {
    color: var(--rohlik-accent);
    background: color-mix(in srgb, var(--rohlik-accent) 15%, transparent);
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: rohlik-pulse 1.4s ease-in-out infinite;
  }

  @keyframes rohlik-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.35;
      transform: scale(1.4);
    }
  }

  .location {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .location ha-icon {
    --mdc-icon-size: 14px;
  }

  .slots-grid {
    display: grid;
    grid-template-columns: repeat(var(--rohlik-slot-count, 3), 1fr);
    gap: 12px;
  }

  .slots-grid.column {
    grid-template-columns: 1fr;
  }

  @container rohlik-slots (max-width: 360px) {
    .slots-grid:not(.column) {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 360px) {
    .slots-grid:not(.column) {
      grid-template-columns: 1fr;
    }
  }

  .tile {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
    border-radius: var(--ha-card-border-radius, 12px);
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    min-width: 0;
  }

  .tile.muted {
    color: var(--secondary-text-color);
    justify-content: center;
    align-items: flex-start;
  }

  .tile-head {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    font-weight: 500;
  }

  .tile-head ha-icon {
    --mdc-icon-size: 16px;
    color: var(--rohlik-accent);
  }

  .tile-time {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tile-caption {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  .tile-subtitle {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .tile-unavailable {
    font-size: 0.9rem;
  }

  .capacity-bar {
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color);
    overflow: hidden;
    margin-top: 2px;
  }

  .capacity-fill {
    height: 100%;
    border-radius: 2px;
    background: var(--rohlik-accent);
  }

  .capacity-fill.warn {
    background: var(--warning-color, #ff9800);
  }

  .capacity-fill.err {
    background: var(--error-color, #db4437);
  }

  .capacity-msg {
    color: var(--secondary-text-color);
    font-size: 0.7rem;
  }
`;
