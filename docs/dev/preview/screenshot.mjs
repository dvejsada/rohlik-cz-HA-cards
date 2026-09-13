#!/usr/bin/env node
/**
 * Serves the repo root over a tiny static HTTP server, loads
 * docs/dev/preview/index.html in Chromium (Playwright), and captures a PNG
 * per card/badge plus a full-grid "overview" (light + dark) into
 * docs/images/. Fails loudly (non-zero exit) if the page throws or logs a
 * console error in any of the states it visits.
 *
 * Run: npm run screenshots
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../..");
const IMAGES_DIR = path.join(REPO_ROOT, "docs/images");
const PORT = 4173;

// The pinned playwright version's bundled Chromium revision isn't the one
// preinstalled at PLAYWRIGHT_BROWSERS_PATH in this environment — point at
// the actual binary instead of letting Playwright pick by revision.
const CHROMIUM_PATH = "/opt/pw-browsers/chromium";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".map": "application/json; charset=utf-8",
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath === "/favicon.ico") {
        res.writeHead(204);
        res.end();
        return;
      }
      let filePath = path.join(REPO_ROOT, urlPath);
      if (!filePath.startsWith(REPO_ROOT)) {
        res.writeHead(403);
        res.end("forbidden");
        return;
      }
      if (urlPath === "/" || urlPath === "") {
        filePath = path.join(REPO_ROOT, "docs/dev/preview/index.html");
      }
      if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end("not found: " + urlPath);
        return;
      }
      const ext = path.extname(filePath);
      const body = await readFile(filePath);
      res.writeHead(200, { "content-type": MIME[ext] || "application/octet-stream" });
      res.end(body);
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });
  return new Promise((resolve) => {
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

/**
 * Loads the preview page for a given query string, waits until it reports
 * ready, and returns { page, errors }. Console errors and page errors
 * (uncaught exceptions) are collected for the whole page lifetime.
 */
async function openPreview(browser, query, viewport = { width: 1100, height: 1400 }) {
  const context = await browser.newContext({
    deviceScaleFactor: 2,
    viewport,
    // The mock data's ISO timestamps carry an explicit +02:00 (Europe/Prague
    // summer time) offset — pin the browser to that zone so the rendered
    // wall-clock times match what docs/dev/preview/mock-hass.js intends,
    // regardless of the host machine's own timezone.
    timezoneId: "Europe/Prague",
  });
  const page = await context.newPage();
  const errors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  page.on("pageerror", (err) => {
    errors.push(`pageerror: ${err.message || err}`);
  });

  await page.goto(`http://127.0.0.1:${PORT}/docs/dev/preview/index.html${query}`, {
    waitUntil: "load",
  });

  await page.waitForFunction(
    () => window.__PREVIEW_READY__ === true || typeof window.__PREVIEW_ERROR__ === "string",
    { timeout: 15_000 },
  );

  const initError = await page.evaluate(() => window.__PREVIEW_ERROR__ || null);
  if (initError) errors.push(`init: ${initError}`);

  // One more frame so CSS transitions/animations settle before capture.
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );

  return { context, page, errors };
}

async function shootElement(page, id, filename) {
  const handle = await page.$(`#${id}`);
  if (!handle) throw new Error(`element not found: #${id}`);
  const box = await handle.boundingBox();
  if (!box || box.width === 0 || box.height === 0) {
    throw new Error(`element #${id} has zero size (empty render?)`);
  }
  await handle.screenshot({ path: path.join(IMAGES_DIR, filename) });
  console.log(`  wrote ${filename} (${Math.round(box.width)}x${Math.round(box.height)} css px)`);
}

async function main() {
  const server = await startServer();
  const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });

  const allErrors = [];
  const report = [];

  try {
    // ---- arriving (default state) — also feeds the overview grids ----
    {
      const { context, page, errors } = await openPreview(browser, "?lang=cs&theme=light&state=arriving");
      allErrors.push(...errors.map((e) => `[arriving/light] ${e}`));
      await shootElement(page, "rohlik-delivery-card", "delivery-card.png");
      await shootElement(page, "rohlik-delivery-badge", "delivery-badge.png");
      await shootElement(page, "rohlik-cart-card", "cart-card.png");
      await shootElement(page, "rohlik-slots-card", "slots-card.png");
      await shootElement(page, "rohlik-account-card", "account-card.png");
      await shootElement(page, "rohlik-spending-card", "spending-card.png");
      const appHandle = await page.$("#app");
      await appHandle.screenshot({ path: path.join(IMAGES_DIR, "overview.png") });
      console.log("  wrote overview.png");
      report.push({ state: "arriving/light", errors });
      await context.close();
    }

    // ---- none ----
    {
      const { context, page, errors } = await openPreview(browser, "?lang=cs&theme=light&state=none");
      allErrors.push(...errors.map((e) => `[none] ${e}`));
      await shootElement(page, "rohlik-delivery-card", "delivery-card-none.png");
      report.push({ state: "none", errors });
      await context.close();
    }

    // ---- ordered ----
    {
      const { context, page, errors } = await openPreview(browser, "?lang=cs&theme=light&state=ordered");
      allErrors.push(...errors.map((e) => `[ordered] ${e}`));
      await shootElement(page, "rohlik-delivery-card", "delivery-card-ordered.png");
      report.push({ state: "ordered", errors });
      await context.close();
    }

    // ---- delivered (mock coverage check only — not in the required PNG set) ----
    {
      const { context, page, errors } = await openPreview(browser, "?lang=cs&theme=light&state=delivered");
      allErrors.push(...errors.map((e) => `[delivered] ${e}`));
      report.push({ state: "delivered", errors });
      await context.close();
    }

    // ---- dark theme overview ----
    {
      const { context, page, errors } = await openPreview(browser, "?lang=cs&theme=dark&state=arriving");
      allErrors.push(...errors.map((e) => `[arriving/dark] ${e}`));
      const appHandle = await page.$("#app");
      await appHandle.screenshot({ path: path.join(IMAGES_DIR, "overview-dark.png") });
      console.log("  wrote overview-dark.png");
      report.push({ state: "arriving/dark", errors });
      await context.close();
    }

    // ---- spending card, "this month" period with the monthly chart ----
    {
      const { context, page, errors } = await openPreview(browser, "?lang=cs&theme=light&state=arriving&period=month");
      allErrors.push(...errors.map((e) => `[spending/month] ${e}`));
      await shootElement(page, "rohlik-spending-card", "spending-card-month.png");
      report.push({ state: "spending/month", errors });
      await context.close();
    }

    // ---- phone-width overview (400px viewport, single column) ----
    {
      const { context, page, errors } = await openPreview(
        browser,
        "?lang=cs&theme=light&state=arriving",
        { width: 400, height: 900 },
      );
      allErrors.push(...errors.map((e) => `[arriving/mobile] ${e}`));
      const appHandle = await page.$("#app");
      await appHandle.screenshot({ path: path.join(IMAGES_DIR, "overview-mobile.png") });
      console.log("  wrote overview-mobile.png");
      report.push({ state: "arriving/mobile", errors });
      await context.close();
    }

    // ---- English smoke pass (not screenshotted, just checked for errors) ----
    {
      const { context, errors } = await openPreview(browser, "?lang=en&theme=light&state=arriving");
      allErrors.push(...errors.map((e) => `[arriving/en] ${e}`));
      report.push({ state: "arriving/en", errors });
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("\n--- console/page error summary ---");
  for (const r of report) {
    console.log(`${r.state}: ${r.errors.length === 0 ? "OK" : `${r.errors.length} error(s)`}`);
    for (const e of r.errors) console.log(`    ${e}`);
  }

  if (allErrors.length > 0) {
    console.error(`\nFAILED: ${allErrors.length} console error(s)/exception(s) captured.`);
    process.exit(1);
  }
  console.log("\nAll screenshots captured with zero console errors.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
