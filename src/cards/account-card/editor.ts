import { customElement } from "lit/decorators.js";
import { RohlikBaseEditor, type HaFormSchema } from "../../core/editor";
import type { RohlikCardConfig } from "../../core/base-card";
import { localize } from "../../core/localize";
import { labels, strings } from "./strings";

/** Kept in sync with `AccountStat` in `account-card.ts` (duplicated to avoid a circular import). */
export type AccountStat = "credit" | "bags" | "no_limit" | "free_express" | "parents_club" | "reusable";

export interface AccountCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-account-card";
  stats?: AccountStat[];
  show_footer?: boolean;
}

@customElement("rohlik-account-card-editor")
export class RohlikAccountCardEditor extends RohlikBaseEditor<AccountCardConfig> {
  protected readonly labels = labels;

  protected readonly defaults: Partial<AccountCardConfig> = {
    stats: ["credit", "bags", "no_limit", "free_express", "parents_club", "reusable"],
    show_footer: true,
  };

  protected extraSchema(): HaFormSchema[] {
    const l = (key: string): string => localize(this.hass, strings, key);
    return [
      {
        name: "stats",
        selector: {
          select: {
            multiple: true,
            mode: "list",
            options: [
              { value: "credit", label: l("stat_credit") },
              { value: "bags", label: l("stat_bags") },
              { value: "no_limit", label: l("stat_no_limit") },
              { value: "free_express", label: l("stat_free_express") },
              { value: "parents_club", label: l("stat_parents_club") },
              { value: "reusable", label: l("stat_reusable") },
            ],
          },
        },
      },
      { name: "show_footer", selector: { boolean: {} } },
    ];
  }
}
