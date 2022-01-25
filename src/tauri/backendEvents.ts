import { emit as tauriEmit } from "@tauri-apps/api/event";

export const OpenBackendEventName = "lanes://backend/open";

export type BackendEventName = typeof OpenBackendEventName;

export type BackendEventPayloads = {
  [OpenBackendEventName]: undefined;
};

export default function emit<E extends BackendEventName>(
  eventName: E,
  payload: BackendEventPayloads[E]
): Promise<void> {
  return tauriEmit(eventName, payload);
}
