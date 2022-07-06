import { assign, createMachine, StateFrom } from "xstate";

type Context = {
  results: FetchResult[];
  errors: {
    searchInput: string;
  };
};

type Services = {
  retrieveAccount: {
    data: FetchResult;
  };
  loadMoreRepos: {
    data: Repo[];
  };
};

type Events =
  | {
      type: "search";
      username: string | undefined;
    }
  | { type: "refresh" }
  | { type: "load-more"; username: string };

interface Repo {
  description: string;
  html_url: string;
  id: string;
  language: string;
  name: string;
  stargazers_count: number;
  owner: {
    login: string;
  };
}

interface FetchResult {
  bio: string;
  followers: number;
  following: number;
  html_url: string;
  login: string;
  repos: Repo[];
  stars: number;
  public_repos: number;
}

const fetchUser = (username: string): PromiseLike<FetchResult> => {
  return fetch(`https://api.github.com/users/${username}`, {
    method: "GET",
    headers: {
      Authorization: import.meta.env.VITE_GITHUB_ACCESS_KEY,
    },
  }).then((res) => res.json());
};

const fetchRepos = (username: string): PromiseLike<Repo[]> => {
  return fetch(`https://api.github.com/users/${username}/repos`, {
    method: "GET",
    headers: {
      Authorization: import.meta.env.VITE_GITHUB_ACCESS_KEY,
    },
  }).then((res) => res.json());
};

const fetchMoreRepos = (
  username: string,
  current: number,
  max: number
): PromiseLike<Repo[]> => {
  const page = Number(current / 30);
  const nextPage = current <= max ? Math.trunc(page) + 1 : Math.trunc(page);
  return fetch(
    `https://api.github.com/users/${username}/repos?page=${nextPage}`,
    {
      method: "GET",
      headers: {
        Authorization: import.meta.env.VITE_GITHUB_ACCESS_KEY,
      },
    }
  ).then((res) => res.json());
};

export const searchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SzAQwE4GMAWBaAtqjgJYB2YAdMRADZgDEKGOioADgPazEAuxHpViAAeiAAwAaEAE9xAXzlSmWPIRLkKYdOg7pI9PQDM9sbEM7c+AoaIQAWAOxiKATjEA2ABwBmd94BMYi4udu5SsgjeYgCMFA4u8d6+DnbB0f4OCoogpBwQcELKOARE2GSU1HTmXLz8gkgiiL4uFN4O3tHedmJOAS7+3uGI0UGtDu4uUe7+dr4ArHYKSmgqJeqURWWkUNWWdTaI-u5x3p7+nh5z0XPuXnODMocucxT+IWID3i6eDnOZ2Zs1ltKFodHoILtatYGrYMscjnM3t45lcfCEhgg3i83t1Pt9fg5oksQIC1MDIVZ6qBbLgZhjcA5-K5Ccjpp5unZHP8FEA */
  createMachine(
    {
      context: {
        results: [],
        errors: {
          searchInput: "",
        },
      },
      tsTypes: {} as import("./searchMachine.typegen").Typegen0,
      schema: {
        context: {} as Context,
        events: {} as Events,
        services: {} as Services,
      },
      id: "search-machine",
      initial: "idle",
      states: {
        idle: {
          on: {
            search: [
              {
                actions: "clearErrors",
                cond: "isSearchValid",
                target: "searching",
              },
              {
                actions: "createSearchError",
                target: "idle",
                internal: false,
              },
            ],
            "load-more": {
              target: "paginating",
            },
          },
        },
        paginating: {
          invoke: {
            src: "loadMoreRepos",
            onDone: {
              target: "idle",
              actions: ["updateUsersRepos"],
            },
            onError: {
              target: "errored",
            },
          },
        },
        searching: {
          invoke: {
            src: "retrieveAccount",
            onDone: {
              target: "idle",
              actions: ["assignUserToContext"],
            },
            onError: {
              target: "errored",
            },
          },
        },
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
      actions: {
        createSearchError: assign((context, event) => {
          const searchInput = !event.username
            ? "Search cannot be empty"
            : "Username must be 3 letters";

          return { ...context, ...{ errors: { searchInput } } };
        }),
        clearErrors: assign({
          errors: (_) => {
            return { searchInput: "" };
          },
        }),
        updateUsersRepos: assign({
          results: (context, event) => {
            const user = context.results.find(
              (u) => u.login === event.data[0].owner.login
            );

            return context.results.map((cachedUser) => {
              if (user?.login === cachedUser.login) {
                return {
                  ...cachedUser,
                  repos: [...cachedUser.repos, ...event.data],
                };
              }
              return cachedUser;
            });
          },
        }),
        assignUserToContext: assign({
          results: (context, event) => {
            const shouldReplace = context.results.some(
              (result) => result.login === event.data.login
            );

            if (shouldReplace) {
              return context.results.map((res) => {
                if (res.login === event.data.login) {
                  return event.data;
                }
                return res;
              });
            }
            return [...context.results, event.data];
          },
        }),
      },
      guards: {
        isSearchValid: (_, event) => {
          const isValidLength = Boolean(
            event.username && event.username?.length >= 3
          );
          return Boolean(event.username) && isValidLength;
        },
      },
      services: {
        retrieveAccount: async (context, event) => {
          const res = await Promise.all([
            fetchUser(event.username || ""),
            fetchRepos(event.username || ""),
          ]);

          console.log("res[1]: ", res[1]);
          return { ...res[0], repos: res[1] };
        },
        loadMoreRepos: async (context, event) => {
          const user = context.results.find((u) => u.login === event.username);
          const current = user?.repos.length || 0;
          const max = user?.public_repos || 0;
          const res = await fetchMoreRepos(event.username, current, max);

          return res;
        },
      },
    }
  );

export const selectResults = (state: StateFrom<typeof searchMachine>) =>
  state.context.results;
export const selectErrors = (state: StateFrom<typeof searchMachine>) =>
  state.context.errors;
