import { listen as tauriListen, UnlistenFn } from "@tauri-apps/api/event";

export const NewFrontendEventName = "lanes://frontend/new";
export const OpenFrontendEventName = "lanes://frontend/open";

/**
 * Events emitted from the backend to the frontend (from Rust to JS).
 */
export type FrontendEventName = typeof OpenFrontendEventName | typeof NewFrontendEventName;

export type FrontendEventPayloads = {
  [NewFrontendEventName]: null;
  [OpenFrontendEventName]: { path: string };
};

export default function listen<E extends FrontendEventName>(
  eventName: E,
  handler: (payload: FrontendEventPayloads[E]) => void
): Promise<UnlistenFn> {
  return tauriListen<FrontendEventPayloads[E]>(eventName, ({ payload }) => handler(payload));
}
