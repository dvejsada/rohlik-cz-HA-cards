import { describe, expect, it } from "vitest";
import { findRohlikDevices, resolveEntities } from "../src/core/discovery";
import type { EntityRegistryDisplayEntry } from "../src/core/types";
import { makeHass } from "./fixtures";

describe("findRohlikDevices", () => {
  it("returns only devices with at least one rohlikcz entity", () => {
    const hass = makeHass({
      entities: {
        "sensor.a_cart_price": {
          entity_id: "sensor.a_cart_price",
          device_id: "dev1",
          platform: "rohlikcz",
          translation_key: "cart_price",
        },
        "sensor.other": {
          entity_id: "sensor.other",
          device_id: "dev2",
          platform: "some_other_integration",
        },
      },
      devices: {
        dev1: { id: "dev1", name: "Dan Vejsada" },
        dev2: { id: "dev2", name: "Unrelated" },
      },
    });

    const devices = findRohlikDevices(hass);
    expect(devices).toHaveLength(1);
    expect(devices[0].id).toBe("dev1");
  });

  it("returns an empty array when there are no rohlikcz entities", () => {
    const hass = makeHass();
    expect(findRohlikDevices(hass)).toEqual([]);
  });
});

describe("resolveEntities", () => {
  it("maps translation_key -> entity_id for the given device only", () => {
    const hass = makeHass({
      entities: {
        "sensor.dan_cart_price": {
          entity_id: "sensor.dan_cart_price",
          device_id: "dev1",
          platform: "rohlikcz",
          translation_key: "cart_price",
        },
        "todo.dan_rohlik_shopping_cart": {
          entity_id: "todo.dan_rohlik_shopping_cart",
          device_id: "dev1",
          platform: "rohlikcz",
          translation_key: "shopping_cart",
        },
        "sensor.other_device_cart_price": {
          entity_id: "sensor.other_device_cart_price",
          device_id: "dev2",
          platform: "rohlikcz",
          translation_key: "cart_price",
        },
      },
    });

    const map = resolveEntities(hass, "dev1");
    expect(map.get("cart_price")).toBe("sensor.dan_cart_price");
    expect(map.get("shopping_cart")).toBe("todo.dan_rohlik_shopping_cart");
    expect(map.size).toBe(2);
  });

  it("ignores entities without a translation_key or wrong platform", () => {
    const hass = makeHass({
      entities: {
        "sensor.no_key": { entity_id: "sensor.no_key", device_id: "dev1", platform: "rohlikcz" },
        "sensor.wrong_platform": {
          entity_id: "sensor.wrong_platform",
          device_id: "dev1",
          platform: "other",
          translation_key: "cart_price",
        },
      },
    });
    expect(resolveEntities(hass, "dev1").size).toBe(0);
  });

  it("memoizes per (entities reference, deviceId) and recomputes on a new reference", () => {
    const entities: Record<string, EntityRegistryDisplayEntry> = {
      "sensor.a": {
        entity_id: "sensor.a",
        device_id: "dev1",
        platform: "rohlikcz",
        translation_key: "cart_price",
      },
    };
    const hass = makeHass({ entities });

    const first = resolveEntities(hass, "dev1");
    const second = resolveEntities(hass, "dev1");
    expect(second).toBe(first); // same reference: cache hit

    const hass2 = makeHass({ entities: { ...entities } }); // new object reference
    const third = resolveEntities(hass2, "dev1");
    expect(third).not.toBe(first);
    expect(third.get("cart_price")).toBe("sensor.a");
  });
});
