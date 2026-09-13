import type { DeviceRegistryEntry, EntityRegistryDisplayEntry, HomeAssistant } from "./types";

export const ROHLIK_PLATFORM = "rohlikcz";

/**
 * Devices that have at least one entity registered on the `rohlikcz` platform.
 */
export function findRohlikDevices(hass: HomeAssistant): DeviceRegistryEntry[] {
  const deviceIds = new Set<string>();
  for (const entity of Object.values(hass.entities ?? {})) {
    if (entity.platform === ROHLIK_PLATFORM && entity.device_id) {
      deviceIds.add(entity.device_id);
    }
  }
  const devices: DeviceRegistryEntry[] = [];
  for (const id of deviceIds) {
    const device = hass.devices?.[id];
    if (device) devices.push(device);
  }
  return devices;
}

interface ResolveCacheEntry {
  entitiesRef: Record<string, EntityRegistryDisplayEntry>;
  map: Map<string, string>;
}

const resolveCache = new Map<string, ResolveCacheEntry>();

/**
 * Maps `translation_key` -> `entity_id` for every `rohlikcz` entity that
 * belongs to `deviceId`. Memoized per (hass.entities reference, deviceId) so
 * repeated calls during a render pass are cheap; the cache is invalidated
 * automatically whenever `hass.entities` gets a new reference (i.e. HA
 * pushed an update).
 */
export function resolveEntities(hass: HomeAssistant, deviceId: string): Map<string, string> {
  const entities = hass.entities ?? {};
  const cached = resolveCache.get(deviceId);
  if (cached && cached.entitiesRef === entities) {
    return cached.map;
  }

  const map = new Map<string, string>();
  for (const entity of Object.values(entities)) {
    if (entity.platform !== ROHLIK_PLATFORM || entity.device_id !== deviceId) continue;
    if (!entity.translation_key) continue;
    map.set(entity.translation_key, entity.entity_id);
  }

  resolveCache.set(deviceId, { entitiesRef: entities, map });
  return map;
}
