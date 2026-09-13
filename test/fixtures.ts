import type {
  DeviceRegistryEntry,
  EntityRegistryDisplayEntry,
  HassEntity,
  HomeAssistant,
} from "../src/core/types";

export function makeHass(
  overrides: Partial<HomeAssistant> & {
    entities?: Record<string, EntityRegistryDisplayEntry>;
    devices?: Record<string, DeviceRegistryEntry>;
    states?: Record<string, HassEntity>;
  } = {},
): HomeAssistant {
  return {
    states: {},
    entities: {},
    devices: {},
    locale: { language: "en" },
    themes: {},
    connection: { sendMessagePromise: async () => ({}) },
    callWS: async () => ({}) as never,
    callService: async () => ({ context: { id: "1" } }),
    ...overrides,
  } as HomeAssistant;
}
