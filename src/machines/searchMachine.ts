import { assign, createMachine, StateFrom } from "xstate";

type Context = {
  results: [];
  errors: {
    searchInput: string;
  };
};
type Events =
  | {
      type: "search";
      username: string | undefined;
    }
  | { type: "refresh" };

export const searchMachine = createMachine(
  {
    tsTypes: {} as import("./searchMachine.typegen").Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: {
      results: [],
      errors: {
        searchInput: "",
      },
    },
    id: "bundles-machine",
    initial: "idle",
    states: {
      idle: {
        on: {
          search: [
            {
              cond: "isSearchValid",
              target: "searching",
              actions: ["clearSearchError"],
            },
            {
              target: "idle",
              actions: ["createSearchError"],
            },
          ],
        },
      },
      searching: {},
      errored: {
        on: {
          refresh: {
            target: "idle",
          },
        },
      },
    },
  },
  {
    guards: {
      isSearchValid: (_, event) => {
        const isValidLength = Boolean(
          event.username && event.username?.length > 3
        );
        return Boolean(event.username) && isValidLength;
      },
    },
    actions: {
      createSearchError: assign((context, event) => {
        return context;
      }),
    },
  }
);

export const selectResults = (state: StateFrom<typeof searchMachine>) =>
  state.context.results;
