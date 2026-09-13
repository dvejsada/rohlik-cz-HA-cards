import type { HomeAssistant } from "./types";

export type Dict = Record<string, Record<string, string>>;

/**
 * Resolves `dict[lang][key]`, where `lang` is the first two letters of
 * `hass.locale.language`, falling back to `en`, then to the raw key itself
 * when no dictionary entry exists at all. `{var}` placeholders in the
 * resolved string are replaced from `vars`.
 */
export function localize(
  hass: HomeAssistant,
  dict: Dict,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const lang = (hass.locale?.language || "en").slice(0, 2).toLowerCase();
  const template = dict[lang]?.[key] ?? dict.en?.[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  );
}

/**
 * Words shared across every card/badge dictionary.
 */
export const coreStrings: Dict = {
  cs: {
    today: "Dnes",
    tomorrow: "Zítra",
    updated_ago: "Aktualizováno {time}",
    refresh: "Obnovit",
    unavailable: "Nedostupné",
    error_generic: "Něco se nepovedlo",
    show_all: "Zobrazit vše ({count})",
    show_less: "Zobrazit méně",
    items: "položek",
    free: "zdarma",
  },
  en: {
    today: "Today",
    tomorrow: "Tomorrow",
    updated_ago: "Updated {time}",
    refresh: "Refresh",
    unavailable: "Unavailable",
    error_generic: "Something went wrong",
    show_all: "Show all ({count})",
    show_less: "Show less",
    items: "items",
    free: "free",
  },
};
