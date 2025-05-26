
import React, { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../../Utility/Reducer";

const StateContext = createContext();

export const DataProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
