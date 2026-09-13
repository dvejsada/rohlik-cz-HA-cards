import type { HomeAssistant, ServiceCallResponse } from "./types";

const ROHLIK_DOMAIN = "rohlikcz";

const configEntryCache = new Map<string, Promise<string | undefined>>();

interface EntityRegistryGetResult {
  config_entry_id?: string;
  [key: string]: unknown;
}

/**
 * Resolves and caches the config entry id backing a given entity, via
 * `config/entity_registry/get`. Cached per entity id for the lifetime of the
 * page.
 */
export function getConfigEntryId(
  hass: HomeAssistant,
  entityId: string,
): Promise<string | undefined> {
  const cached = configEntryCache.get(entityId);
  if (cached) return cached;

  const promise = hass
    .callWS<EntityRegistryGetResult>({
      type: "config/entity_registry/get",
      entity_id: entityId,
    })
    .then((result) => result.config_entry_id)
    .catch((err) => {
      configEntryCache.delete(entityId);
      throw err;
    });

  configEntryCache.set(entityId, promise);
  return promise;
}

/**
 * Calls a `rohlikcz.*` service, targeting the given config entry, optionally
 * returning the service's response payload.
 */
export async function callRohlik<T = unknown>(
  hass: HomeAssistant,
  configEntryId: string,
  service: string,
  data?: Record<string, unknown>,
  withResponse = false,
): Promise<T | undefined> {
  const result: ServiceCallResponse<T> = await hass.callService<T>(
    ROHLIK_DOMAIN,
    service,
    { config_entry_id: configEntryId, ...data },
    undefined,
    true,
    withResponse,
  );
  return withResponse ? result.response : undefined;
}

/**
 * Fires a bubbling, composed custom event from `node` — the standard way
 * Lovelace elements talk to their surrounding card/editor.
 */
export function fireEvent<T>(node: HTMLElement, type: string, detail?: T): void {
  const event = new CustomEvent(type, {
    detail,
    bubbles: true,
    composed: true,
  });
  node.dispatchEvent(event);
}

/**
 * Opens the Home Assistant more-info dialog for `entityId`.
 */
export function openMoreInfo(node: HTMLElement, entityId: string): void {
  fireEvent(node, "hass-more-info", { entityId });
}
