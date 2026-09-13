import { describe, expect, it } from "vitest";
import {
  DEFAULT_SLOTS,
  SLOT_ICONS,
  capacityLevel,
  clampCapacityPercent,
  readSlot,
  type SlotType,
} from "../src/cards/slots-card/slots";
import type { HassEntity } from "../src/core/types";

function makeEntity(
  state: string,
  attributes: Record<string, unknown> = {},
): HassEntity {
  return {
    entity_id: "sensor.express_slot",
    state,
    last_changed: "2026-09-13T10:00:00Z",
    last_updated: "2026-09-13T10:00:00Z",
    attributes,
  };
}

describe("readSlot", () => {
  it("reads a fully populated slot entity", () => {
    const entity = makeEntity("2026-09-13T18:00:00Z", {
      "Delivery Slot End": "2026-09-13T19:00:00Z",
      "Remaining Capacity Percent": 72,
      "Remaining Capacity Message": "Plenty of room",
      Price: 0,
      Title: "Express",
      Subtitle: "Fastest option",
    });

    const slot = readSlot("express", entity);
    expect(slot).toEqual({
      type: "express",
      start: new Date("2026-09-13T18:00:00Z"),
      end: new Date("2026-09-13T19:00:00Z"),
      price: 0,
      capacityPercent: 72,
      capacityMessage: "Plenty of room",
      title: "Express",
      subtitle: "Fastest option",
      available: true,
    });
  });

  it("marks a slot with an unknown state as unavailable, with null fields", () => {
    const entity = makeEntity("unknown", {});
    const slot = readSlot("standard", entity);
    expect(slot.available).toBe(false);
    expect(slot.start).toBeNull();
    expect(slot.end).toBeNull();
    expect(slot.price).toBeNull();
    expect(slot.capacityPercent).toBeNull();
    expect(slot.capacityMessage).toBeNull();
    expect(slot.title).toBeNull();
    expect(slot.subtitle).toBeNull();
  });

  it("marks a slot as unavailable when the entity does not exist", () => {
    const slot = readSlot("eco", undefined);
    expect(slot.available).toBe(false);
    expect(slot.type).toBe("eco");
  });

  it("treats unavailable state the same as unknown", () => {
    const slot = readSlot("eco", makeEntity("unavailable"));
    expect(slot.available).toBe(false);
  });

  it("coerces numeric-looking string attributes", () => {
    const entity = makeEntity("2026-09-13T18:00:00Z", {
      "Remaining Capacity Percent": "42",
      Price: "99",
    });
    const slot = readSlot("standard", entity);
    expect(slot.capacityPercent).toBe(42);
    expect(slot.price).toBe(99);
  });

  it("ignores blank/non-numeric attribute values", () => {
    const entity = makeEntity("2026-09-13T18:00:00Z", {
      "Remaining Capacity Percent": "",
      Price: "n/a",
      Title: "   ",
    });
    const slot = readSlot("eco", entity);
    expect(slot.capacityPercent).toBeNull();
    expect(slot.price).toBeNull();
    expect(slot.title).toBeNull();
  });
});

describe("capacityLevel", () => {
  it("is ok at and above 50%", () => {
    expect(capacityLevel(50)).toBe("ok");
    expect(capacityLevel(100)).toBe("ok");
  });

  it("is warn between 10% and 49%", () => {
    expect(capacityLevel(49)).toBe("warn");
    expect(capacityLevel(10)).toBe("warn");
  });

  it("is err below 10%", () => {
    expect(capacityLevel(9)).toBe("err");
    expect(capacityLevel(0)).toBe("err");
  });

  it("is err for a missing percentage", () => {
    expect(capacityLevel(null)).toBe("err");
    expect(capacityLevel(undefined)).toBe("err");
  });
});

describe("clampCapacityPercent", () => {
  it("passes through in-range values", () => {
    expect(clampCapacityPercent(42)).toBe(42);
  });

  it("clamps out-of-range values", () => {
    expect(clampCapacityPercent(-5)).toBe(0);
    expect(clampCapacityPercent(150)).toBe(100);
  });

  it("treats a missing value as 0", () => {
    expect(clampCapacityPercent(null)).toBe(0);
    expect(clampCapacityPercent(undefined)).toBe(0);
  });
});

describe("DEFAULT_SLOTS / SLOT_ICONS", () => {
  it("covers express, standard, eco in order", () => {
    expect(DEFAULT_SLOTS).toEqual(["express", "standard", "eco"]);
  });

  it("has an icon for every slot type", () => {
    const types: SlotType[] = ["express", "standard", "eco"];
    for (const type of types) {
      expect(SLOT_ICONS[type]).toMatch(/^mdi:/);
    }
  });
});
