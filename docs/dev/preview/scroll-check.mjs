#!/usr/bin/env node
/**
 * Guards against the cards swallowing the dashboard's scroll gesture.
 *
 * A card that is itself a scroll container (or sets `overscroll-behavior`)
 * eats the swipe on a touch device: the user drags over the card, the card
 * scrolls its own couple of pixels, and the Home Assistant view underneath
 * never moves. This loads the preview at phone width and asserts that
 *
 *   1. no element inside a card's shadow DOM is a vertical scroll container,
 *   2. nothing sets `overscroll-behavior` to `contain`/`none`,
 *   3. a wheel over a card actually scrolls the page.
 *
 * Run: npm run check:scroll
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../..");
const PORT = 4174;
/**
 * Chromium to drive: an explicit override, else this environment's
 * preinstalled binary, else whatever Playwright resolves on its own (CI,
 * where `playwright install` put it in the default cache).
 */
function chromiumPath() {
  if (process.env.PLAYWRIGHT_CHROMIUM_PATH) return process.env.PLAYWRIGHT_CHROMIUM_PATH;
  if (existsSync("/opt/pw-browsers/chromium")) return "/opt/pw-browsers/chromium";
  return undefined;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      const filePath = path.join(REPO_ROOT, urlPath === "/" ? "docs/dev/preview/index.html" : urlPath);
      if (!filePath.startsWith(REPO_ROOT)) throw new Error("outside repo root");
      const body = await readFile(filePath);
      res.writeHead(200, { "content-type": MIME[path.extname(filePath)] || "application/octet-stream" });
      res.end(body);
    } catch (err) {
      res.writeHead(404);
      res.end(String(err));
    }
  });
  return new Promise((resolve) => server.listen(PORT, "127.0.0.1", () => resolve(server)));
}

/** Card/badge tags laid out by the preview page. */
const TAGS = [
  "rohlik-delivery-card",
  "rohlik-delivery-badge",
  "rohlik-cart-card",
  "rohlik-slots-card",
  "rohlik-account-card",
  "rohlik-spending-card",
];

async function main() {
  const server = await startServer();
  const browser = await chromium.launch({ executablePath: chromiumPath() });
  const failures = [];

  try {
    const context = await browser.newContext({
      viewport: { width: 400, height: 700 },
      hasTouch: true,
      isMobile: true,
      timezoneId: "Europe/Prague",
    });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/docs/dev/preview/index.html?lang=cs&theme=light&state=arriving`);
    await page.waitForFunction(
      () => window.__PREVIEW_READY__ === true || typeof window.__PREVIEW_ERROR__ === "string",
      { timeout: 15000 },
    );
    const initError = await page.evaluate(() => window.__PREVIEW_ERROR__ || null);
    if (initError) failures.push(`preview failed to initialise: ${initError}`);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r())));

    // 1 + 2: walk each card's shadow DOM for scroll containers / overscroll.
    const offenders = await page.evaluate((tags) => {
      const found = [];
      const describe = (el) =>
        `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : ""}`;

      const walk = (root, tag) => {
        const all = root.querySelectorAll("*");
        for (const el of all) {
          const cs = getComputedStyle(el);
          const ob = `${cs.overscrollBehaviorY || ""} ${cs.overscrollBehavior || ""}`;
          // A popover only exists while search results are open; it is an
          // overlay, not part of the card's own scroll surface.
          const isOverlay = cs.position === "fixed";
          if (!isOverlay && /contain|none/.test(ob)) {
            found.push({ tag, el: describe(el), reason: `overscroll-behavior: ${ob.trim()}` });
          }
          const scrollsY = /auto|scroll/.test(cs.overflowY);
          if (!isOverlay && scrollsY && el.scrollHeight > el.clientHeight + 1) {
            found.push({
              tag,
              el: describe(el),
              reason: `vertical scroll container (${el.scrollHeight}px in ${el.clientHeight}px)`,
            });
          }
          if (el.shadowRoot) walk(el.shadowRoot, tag);
        }
      };

      for (const tag of tags) {
        const host = document.querySelector(tag);
        if (!host) continue;
        if (host.shadowRoot) walk(host.shadowRoot, tag);
      }
      return found;
    }, TAGS);

    for (const o of offenders) failures.push(`${o.tag}: ${o.el} — ${o.reason}`);

    // 3: a wheel over a card must move the page.
    const cardBox = await (await page.$("rohlik-cart-card")).boundingBox();
    await page.mouse.move(cardBox.x + cardBox.width / 2, Math.min(cardBox.y + 40, 650));
    const before = await page.evaluate(() => document.scrollingElement.scrollTop);
    await page.mouse.wheel(0, 400);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
    const after = await page.evaluate(() => document.scrollingElement.scrollTop);
    if (after <= before) {
      failures.push(`wheel over rohlik-cart-card did not scroll the page (scrollTop stayed at ${before})`);
    } else {
      console.log(`  page scrolled ${after - before}px with the pointer over the cart card`);
    }

    await context.close();
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length) {
    console.error("\nScroll check FAILED — cards must not capture the view's scroll:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log("\nScroll check passed: no card captures the dashboard scroll at phone width.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
