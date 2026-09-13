import { describe, expect, it } from "vitest";
import { coreStrings, localize, type Dict } from "../src/core/localize";
import { makeHass } from "./fixtures";

const dict: Dict = {
  cs: { greeting: "Ahoj {name}" },
  en: { greeting: "Hello {name}" },
};

describe("localize", () => {
  it("resolves the key in the hass locale language", () => {
    const hassCs = makeHass({ locale: { language: "cs" } });
    expect(localize(hassCs, dict, "greeting", { name: "Dan" })).toBe("Ahoj Dan");
  });

  it("falls back to en when the locale has no entry", () => {
    const hassDe = makeHass({ locale: { language: "de" } });
    expect(localize(hassDe, dict, "greeting", { name: "Dan" })).toBe("Hello Dan");
  });

  it("falls back to the raw key when nothing matches", () => {
    const hass = makeHass({ locale: { language: "en" } });
    expect(localize(hass, dict, "unknown_key")).toBe("unknown_key");
  });

  it("leaves unmatched {var} placeholders untouched", () => {
    const hass = makeHass({ locale: { language: "en" } });
    expect(localize(hass, dict, "greeting", {})).toBe("Hello {name}");
  });

  it("matches only the first two letters of the language tag", () => {
    const hass = makeHass({ locale: { language: "en-GB" } });
    expect(localize(hass, dict, "greeting", { name: "Dan" })).toBe("Hello Dan");
  });

  it("exposes usable cs/en core strings", () => {
    const hassCs = makeHass({ locale: { language: "cs" } });
    const hassEn = makeHass({ locale: { language: "en" } });
    expect(localize(hassCs, coreStrings, "refresh")).toBe("Obnovit");
    expect(localize(hassEn, coreStrings, "refresh")).toBe("Refresh");
    expect(localize(hassCs, coreStrings, "updated_ago", { time: "5 min" })).toContain("5 min");
  });
});

describe("localize — plural forms", () => {
  const pluralDict: Dict = {
    cs: { count_items: "{n} {n:položka|položky|položek}" },
    en: { count_items: "{n} {n:item|items}" },
  };

  it.each([
    [1, "1 položka"],
    [2, "2 položky"],
    [4, "4 položky"],
    [5, "5 položek"],
  ])("cs: %i -> %s", (n, expected) => {
    const hass = makeHass({ locale: { language: "cs" } });
    expect(localize(hass, pluralDict, "count_items", { n })).toBe(expected);
  });

  it.each([
    [1, "1 item"],
    [2, "2 items"],
  ])("en: %i -> %s", (n, expected) => {
    const hass = makeHass({ locale: { language: "en" } });
    expect(localize(hass, pluralDict, "count_items", { n })).toBe(expected);
  });

  it("leaves a plural placeholder untouched when its var is missing", () => {
    const hass = makeHass({ locale: { language: "en" } });
    expect(localize(hass, pluralDict, "count_items", {})).toBe("{n} {n:item|items}");
  });

  it("resolves the shared items_count core string in cs and en", () => {
    const hassCs = makeHass({ locale: { language: "cs" } });
    const hassEn = makeHass({ locale: { language: "en" } });
    expect(localize(hassCs, coreStrings, "items_count", { count: 1 })).toBe("1 položka");
    expect(localize(hassCs, coreStrings, "items_count", { count: 2 })).toBe("2 položky");
    expect(localize(hassCs, coreStrings, "items_count", { count: 5 })).toBe("5 položek");
    expect(localize(hassEn, coreStrings, "items_count", { count: 1 })).toBe("1 item");
    expect(localize(hassEn, coreStrings, "items_count", { count: 2 })).toBe("2 items");
  });
});
