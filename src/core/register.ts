import type { CustomCardEntry } from "./types";

// Replaced at build time by rollup.config.mjs with the package.json version.
declare const __ROHLIK_CARDS_VERSION__: string;

const VERSION =
  typeof __ROHLIK_CARDS_VERSION__ !== "undefined" ? __ROHLIK_CARDS_VERSION__ : "dev";

let bannerPrinted = false;

function printBanner(): void {
  if (bannerPrinted) return;
  bannerPrinted = true;
  console.info(
    `%c ROHLIK-CARDS %c v${VERSION} `,
    "color: white; background: #d4145a; font-weight: 700;",
    "color: #d4145a; background: white; font-weight: 700;",
  );
}

export interface RegisterCardOptions extends CustomCardEntry {
  preview?: boolean;
}

export function registerCard(options: RegisterCardOptions): void {
  printBanner();
  window.customCards = window.customCards ?? [];
  window.customCards.push({ preview: true, ...options });
}

export function registerBadge(options: RegisterCardOptions): void {
  printBanner();
  window.customBadges = window.customBadges ?? [];
  window.customBadges.push({ preview: true, ...options });
}
