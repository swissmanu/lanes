import { listen as tauriListen, UnlistenFn } from "@tauri-apps/api/event";

export const NewFrontendEventName = "lanes://frontend/new";
export const OpenFrontendEventName = "lanes://frontend/open";
export const SaveFrontendEventName = "lanes://frontend/save";
export const SaveAsFrontendEventName = "lanes://frontend/saveAs";

/**
 * Events emitted from the backend to the frontend (from Rust to JS).
 */
export type FrontendEventName =
  | typeof NewFrontendEventName
  | typeof OpenFrontendEventName
  | typeof SaveAsFrontendEventName
  | typeof SaveFrontendEventName;

export type FrontendEventPayloads = {
  [NewFrontendEventName]: null;
  [OpenFrontendEventName]: null;
  [SaveFrontendEventName]: null;
  [SaveAsFrontendEventName]: null;
};

export default function listen<E extends FrontendEventName>(
  eventName: E,
  handler: (payload: FrontendEventPayloads[E]) => void
): Promise<UnlistenFn> {
  return tauriListen<FrontendEventPayloads[E]>(eventName, ({ payload }) => handler(payload));
}
