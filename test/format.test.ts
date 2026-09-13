import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatAgo,
  formatCountdown,
  formatMoney,
  formatRelativeDay,
  formatTime,
  parseTs,
} from "../src/core/format";
import { makeHass } from "./fixtures";

describe("parseTs", () => {
  it("parses a valid ISO timestamp", () => {
    const date = parseTs("2026-09-13T17:00:00Z");
    expect(date).toBeInstanceOf(Date);
    expect(date?.toISOString()).toBe("2026-09-13T17:00:00.000Z");
  });

  it.each(["unknown", "unavailable", "", undefined, null, "not-a-date"])(
    "returns null for %s",
    (input) => {
      expect(parseTs(input as string | null | undefined)).toBeNull();
    },
  );
});

describe("formatMoney", () => {
  it("formats CZK for the cs locale", () => {
    const hass = makeHass({ locale: { language: "cs" } });
    expect(formatMoney(hass, 1486)).toBe(
      new Intl.NumberFormat("cs", {
        style: "currency",
        currency: "CZK",
        currencyDisplay: "narrowSymbol",
      }).format(1486),
    );
    expect(formatMoney(hass, 1486)).toContain("Kč");
  });

  it("formats CZK for the en locale", () => {
    const hass = makeHass({ locale: { language: "en" } });
    const result = formatMoney(hass, 1486);
    expect(result).toContain("1,486");
    expect(result).toContain("Kč");
  });
});

describe("formatTime", () => {
  it("renders 24h HH:MM regardless of locale", () => {
    const date = new Date("2026-09-13T08:05:00");
    expect(formatTime(makeHass({ locale: { language: "cs" } }), date)).toBe("08:05");
    expect(formatTime(makeHass({ locale: { language: "en" } }), date)).toBe("08:05");
  });
});

describe("formatRelativeDay", () => {
  const dict = { today: "Today", tomorrow: "Tomorrow" };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-13T10:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("labels a same-day date as today", () => {
    const hass = makeHass();
    const date = new Date("2026-09-13T17:00:00");
    expect(formatRelativeDay(hass, date, dict)).toBe("Today 17:00");
  });

  it("labels the next calendar day as tomorrow", () => {
    const hass = makeHass();
    const date = new Date("2026-09-14T08:00:00");
    expect(formatRelativeDay(hass, date, dict)).toBe("Tomorrow 08:00");
  });

  it("falls back to a weekday + date label further out", () => {
    const hass = makeHass();
    const date = new Date("2026-09-15T08:00:00"); // Tuesday
    const result = formatRelativeDay(hass, date, dict);
    expect(result).toContain("08:00");
    expect(result).not.toContain("Today");
    expect(result).not.toContain("Tomorrow");
  });
});

describe("formatCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-13T10:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders minutes-only spans under an hour (en)", () => {
    const hass = makeHass({ locale: { language: "en" } });
    const date = new Date("2026-09-13T10:12:00Z");
    expect(formatCountdown(hass, date)).toBe("in 12 min");
  });

  it("renders minutes-only spans under an hour (cs)", () => {
    const hass = makeHass({ locale: { language: "cs" } });
    const date = new Date("2026-09-13T10:12:00Z");
    expect(formatCountdown(hass, date)).toBe("za 12 min");
  });

  it("renders hour + minute spans (cs)", () => {
    const hass = makeHass({ locale: { language: "cs" } });
    const date = new Date("2026-09-13T13:20:00Z");
    expect(formatCountdown(hass, date)).toBe("za 3 h 20 min");
  });

  it("renders whole-hour spans without a minutes part", () => {
    const hass = makeHass({ locale: { language: "cs" } });
    const date = new Date("2026-09-13T13:00:00Z");
    expect(formatCountdown(hass, date)).toBe("za 3 h");
  });

  it("clamps past dates to zero instead of going negative", () => {
    const hass = makeHass({ locale: { language: "en" } });
    const date = new Date("2026-09-13T09:00:00Z");
    expect(formatCountdown(hass, date)).toBe("in 0 sec");
  });
});

describe("formatAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-13T10:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders minutes ago (en)", () => {
    const hass = makeHass({ locale: { language: "en" } });
    const date = new Date("2026-09-13T09:56:00Z");
    expect(formatAgo(hass, date)).toBe("4 min ago");
  });

  it("renders minutes ago (cs)", () => {
    const hass = makeHass({ locale: { language: "cs" } });
    const date = new Date("2026-09-13T09:56:00Z");
    expect(formatAgo(hass, date)).toBe("před 4 min");
  });

  it("renders hours ago once past 60 minutes", () => {
    const hass = makeHass({ locale: { language: "en" } });
    const date = new Date("2026-09-13T07:55:00Z");
    expect(formatAgo(hass, date)).toBe("2 hr ago");
  });
});
