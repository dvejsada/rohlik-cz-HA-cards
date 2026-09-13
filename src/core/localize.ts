import type { HomeAssistant } from "./types";

export type Dict = Record<string, Record<string, string>>;

/**
 * Picks the form of a `{name:formA|formB|formC}` placeholder for `n`, in
 * `lang`. Two forms are read as `one|other` (matches English); three as
 * `one|few|other` (matches Czech, whose `many` category — used for
 * fractional counts, not needed here — folds into `other`).
 */
function pluralForm(lang: string, forms: string[], n: number): string {
  if (forms.length < 2 || Number.isNaN(n)) return forms[forms.length - 1] ?? "";
  const category = new Intl.PluralRules(lang).select(n);
  if (forms.length === 2) return category === "one" ? forms[0] : forms[1];
  if (category === "one") return forms[0];
  if (category === "few") return forms[1];
  return forms[forms.length - 1];
}

/**
 * Resolves `dict[lang][key]`, where `lang` is the first two letters of
 * `hass.locale.language`, falling back to `en`, then to the raw key itself
 * when no dictionary entry exists at all. `{var}` placeholders in the
 * resolved string are replaced from `vars`; a `{var:formA|formB|formC}`
 * placeholder instead picks a plural form for `Number(vars[var])` via
 * `pluralForm`. A placeholder whose var is missing from `vars` is left
 * untouched.
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
  return template.replace(
    /\{(\w+)(?::([^{}]+))?\}/g,
    (match, name: string, formsPart: string | undefined) => {
      if (!Object.prototype.hasOwnProperty.call(vars, name)) return match;
      if (formsPart === undefined) return String(vars[name]);
      return pluralForm(lang, formsPart.split("|"), Number(vars[name]));
    },
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
    items_count: "{count} {count:položka|položky|položek}",
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
    items_count: "{count} {count:item|items}",
    free: "free",
  },
};
