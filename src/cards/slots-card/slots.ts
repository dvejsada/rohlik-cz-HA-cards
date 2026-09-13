import { parseTs } from "../../core/format";
import type { HassEntity } from "../../core/types";

/** The three delivery slot kinds the integration exposes. */
export type SlotType = "express" | "standard" | "eco";

/** Default `slots` config order, also used by `getStubConfig`. */
export const DEFAULT_SLOTS: SlotType[] = ["express", "standard", "eco"];

/** `mdi:` icon per slot type. */
export const SLOT_ICONS: Record<SlotType, string> = {
  express: "mdi:lightning-bolt",
  standard: "mdi:truck-delivery",
  eco: "mdi:leaf",
};

/** Remaining-capacity colour band: `ok` >= 50%, `warn` 10-49%, `err` < 10% (or unknown). */
export type CapacityLevel = "ok" | "warn" | "err";

export interface SlotData {
  type: SlotType;
  /** Slot window start, parsed from the entity state (null when unknown/unavailable). */
  start: Date | null;
  /** Slot window end, from the `Delivery Slot End` attribute. */
  end: Date | null;
  /** `Price` attribute in CZK; null when absent. 0 means free. */
  price: number | null;
  /** `Remaining Capacity Percent` attribute; null when absent. */
  capacityPercent: number | null;
  /** `Remaining Capacity Message` attribute. */
  capacityMessage: string | null;
  /** `Title` attribute. */
  title: string | null;
  /** `Subtitle` attribute. */
  subtitle: string | null;
  /** True when the slot has a start time, i.e. it can be shown as a real slot. */
  available: boolean;
}

function readNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/**
 * Reads a `<type>_slot` sensor entity into the flat shape the slots card
 * renders from. Pure and side-effect free so it can be unit tested without a
 * `hass` object or a DOM.
 */
export function readSlot(type: SlotType, entity: HassEntity | undefined): SlotData {
  const attributes = entity?.attributes ?? {};
  const start = parseTs(entity?.state);
  return {
    type,
    start,
    end: parseTs(attributes["Delivery Slot End"]),
    price: readNumber(attributes["Price"]),
    capacityPercent: readNumber(attributes["Remaining Capacity Percent"]),
    capacityMessage: readString(attributes["Remaining Capacity Message"]),
    title: readString(attributes["Title"]),
    subtitle: readString(attributes["Subtitle"]),
    available: start !== null,
  };
}

/**
 * Capacity colour band for a `Remaining Capacity Percent` value: `ok` at
 * 50% or more, `warn` from 10% up to (but not including) 50%, `err` below
 * 10% — and `err` for a missing/unknown percentage too, since that's the
 * safest default for a capacity bar.
 */
export function capacityLevel(percent: number | null | undefined): CapacityLevel {
  if (percent == null || Number.isNaN(percent)) return "err";
  if (percent >= 50) return "ok";
  if (percent >= 10) return "warn";
  return "err";
}

/** Clamps a capacity percentage into the 0-100 range a bar width can use. */
export function clampCapacityPercent(percent: number | null | undefined): number {
  if (percent == null || Number.isNaN(percent)) return 0;
  return Math.min(100, Math.max(0, percent));
}
