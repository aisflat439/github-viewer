import React from "react";
import { useActor, useInterpret, useSelector } from "@xstate/react";
import {
  searchMachine,
  selectErrors,
  selectResults,
} from "../machines/searchMachine";
import { InterpreterFrom } from "xstate";

const initialState = {
  searchService: {} as InterpreterFrom<typeof searchMachine>,
};

export const GlobalServicesContext = React.createContext(initialState);

interface Props {
  children: React.ReactNode;
}

export const GlobalServicesProvider = ({ children }: Props) => {
  const searchService = useInterpret(searchMachine);

  return (
    <GlobalServicesContext.Provider
      value={{
        searchService,
      }}
    >
      {children}
    </GlobalServicesContext.Provider>
  );
};

export const useSearch = () => {
  const searchService = useInterpret(searchMachine);
  const [state, send] = useActor(searchService);
  const isIdle = state.matches("idle");
  const results = useSelector(searchService, selectResults);
  const errors = useSelector(searchService, selectErrors);

  const handleSubmitSearch = (username: string | undefined) => {
    send({ type: "search", username: username });
  };

  return { send, state, errors, results, handleSubmitSearch, isIdle };
};
