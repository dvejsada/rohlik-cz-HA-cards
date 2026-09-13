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
