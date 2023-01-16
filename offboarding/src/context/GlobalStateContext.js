import React from 'react';
import merge from 'lodash/merge';

export const GlobalStateContext = React.createContext();
GlobalStateContext.displayName = 'GlobalStateContext';

export const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);

  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }

  return context;
};

export const GlobalStateProvider = ({ children, initialState = {} }) => {
  const [globalState, setGlobalState] = React.useState(initialState);

  return (
    <GlobalStateContext.Provider
      value={{
        setGlobalState: (data) => setGlobalState(merge({}, globalState, data)),
        globalState,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
