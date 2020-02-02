import React, { createContext, useContext, useReducer } from "react";
import busScheduleReducer from "./BusScheduleReducer"

export const BusScheduleContext = createContext();

export const BusScheduleStateProvider = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(busScheduleReducer, initialState);

  return (
    <BusScheduleContext.Provider value={{state, dispatch}}>
      {children}
    </BusScheduleContext.Provider>
  );
};

export const useStateValue = () => useContext(BusScheduleContext);
