import { UnlistenFn } from "@tauri-apps/api/event";
import React from "react";
import listen, { FrontendEventName, FrontendEventPayloads } from "../tauri/frontendEvents";

export default function useFrontendEvent<E extends FrontendEventName>(
  eventName: E,
  handler: (payload: FrontendEventPayloads[E]) => void
) {
  React.useEffect(() => {
    let unlisten: UnlistenFn | null = null;

    (async () => {
      unlisten = await listen(eventName, handler);
    })();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, [eventName, handler]);
}
