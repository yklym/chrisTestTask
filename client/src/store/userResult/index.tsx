import React, { createContext, useState } from "react";
import { IUserResultContextState } from "./types";

const DEFAULT_STATE: IUserResultContextState = {
  isOffersFound: false,
  setOfferFound: () => {},
};

const UserResultContext = createContext<IUserResultContextState>(DEFAULT_STATE);

const WithUserResultContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  // ideally should be converted to useReducer in future
  const [isOffersFound, setOfferFound] = useState(false);
  return (
    <UserResultContext.Provider
      value={{
        isOffersFound,
        setOfferFound,
      }}
    >
      {children}
    </UserResultContext.Provider>
  );
};

const WithUserResultConsumer = (
  Component: (
    props: IUserResultContextState
  ) => React.ReactElement<IUserResultContextState>
) => (
  <UserResultContext.Consumer>
    {(params) => <Component {...params} />}
  </UserResultContext.Consumer>
);

export { WithUserResultContextProvider, WithUserResultConsumer };
