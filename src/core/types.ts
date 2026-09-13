/**
 * Minimal Home Assistant frontend types.
 *
 * We intentionally do not depend on `custom-card-helpers` or the full HA
 * frontend type package — only the small slice these cards actually use.
 */

export interface HassEntity {
  entity_id: string;
  state: string;
  last_changed: string;
  last_updated: string;
  attributes: Record<string, any>;
  context?: { id: string; parent_id?: string | null; user_id?: string | null };
}

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  device_id?: string;
  platform?: string;
  translation_key?: string;
  name?: string;
  icon?: string;
  hidden?: boolean;
  disabled?: boolean;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string;
  name_by_user?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  identifiers?: Array<[string, string]>;
  config_entries?: string[];
}

export interface HassLocale {
  language: string;
  number_format?: string;
  time_format?: string;
  first_weekday?: string;
  [key: string]: unknown;
}

export interface HassConnection {
  sendMessagePromise<T = unknown>(msg: Record<string, unknown>): Promise<T>;
  subscribeMessage?<T = unknown>(
    callback: (result: T) => void,
    msg: Record<string, unknown>,
  ): Promise<() => Promise<void>>;
  [key: string]: unknown;
}

export interface ServiceCallResponse<T = unknown> {
  context: { id: string; parent_id?: string | null; user_id?: string | null };
  response?: T;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities: Record<string, EntityRegistryDisplayEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  locale: HassLocale;
  themes: {
    darkMode?: boolean;
    theme?: string;
    [key: string]: unknown;
  };
  connection: HassConnection;
  language?: string;
  callWS<T = unknown>(msg: Record<string, unknown>): Promise<T>;
  callService<T = unknown>(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
    notifyOnError?: boolean,
    returnResponse?: boolean,
  ): Promise<ServiceCallResponse<T>>;
  [key: string]: unknown;
}

export interface LovelaceCardConfig {
  type: string;
  view_layout?: unknown;
  layout_options?: unknown;
  [key: string]: unknown;
}

export interface LovelaceGridOptions {
  rows?: number | "auto";
  columns?: number | "full" | "auto";
  min_rows?: number;
  max_rows?: number;
  min_columns?: number;
  max_columns?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  isPanel?: boolean;
  editMode?: boolean;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize(): number | Promise<number>;
  getGridOptions?(): LovelaceGridOptions;
  getLayoutOptions?(): Record<string, unknown>;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

export interface CustomCardEntry {
  type: string;
  name: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
    customBadges?: CustomCardEntry[];
  }

  interface HTMLElementEventMap {
    "hass-more-info": CustomEvent<{ entityId: string }>;
    "config-changed": CustomEvent<{ config: LovelaceCardConfig }>;
  }
}
