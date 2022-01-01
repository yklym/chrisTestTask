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

type IncomingComponent<InnerProps> = (
  props: IUserResultContextState & InnerProps
) => React.ReactElement<IUserResultContextState>;

const WithUserResultConsumer = <InnerProps,>(
  Component: IncomingComponent<InnerProps>
) =>
  function Wrapper(props: any) {
    return (
      <UserResultContext.Consumer>
        {(params) => <Component {...params} {...props} />}
      </UserResultContext.Consumer>
    );
  };

export { WithUserResultContextProvider, WithUserResultConsumer };
