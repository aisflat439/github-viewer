// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    clearErrors: "search";
    createSearchError: "search";
    assignUserToContext: "done.invoke.search-machine.searching:invocation[0]";
  };
  internalEvents: {
    "done.invoke.search-machine.searching:invocation[0]": {
      type: "done.invoke.search-machine.searching:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    retrieveAccount: "done.invoke.search-machine.searching:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    retrieveAccount: "search";
  };
  eventsCausingGuards: {
    isSearchValid: "search";
  };
  eventsCausingDelays: {};
  matchesStates: "idle" | "paginating" | "searching" | "errored";
  tags: never;
}
