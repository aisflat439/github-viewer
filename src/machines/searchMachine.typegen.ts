// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    clearSearchError: "search";
    createSearchError: "search";
  };
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "clearSearchError";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isSearchValid: "search";
  };
  eventsCausingDelays: {};
  matchesStates: "idle" | "searching" | "errored";
  tags: never;
}
