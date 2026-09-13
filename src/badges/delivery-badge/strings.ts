import type { Dict } from "../../core/localize";

// Same state words as the card — the badge is just a compact view of the
// same state machine, so it must say the same thing.
export { strings } from "../../cards/delivery-card/strings";

export const badgeLabels: Dict = {
  cs: {
    device: "Zařízení",
    name: "Vlastní název",
    show_name: "Zobrazit název zařízení",
  },
  en: {
    device: "Device",
    name: "Custom name",
    show_name: "Show device name",
  },
};
