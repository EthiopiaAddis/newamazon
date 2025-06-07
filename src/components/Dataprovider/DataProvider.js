import React, { createContext, useContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Utility/Firebase";

const StateContext = createContext();

export const initialState = {
  cart: [],
  user: null,
  orders: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex ? { ...item, qty: item.qty + 1 } : item
        );
        return {
          ...state,
          cart: updatedCart,
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.item, qty: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "ADD_ORDERS":
      return {
        ...state,
        orders: [...state.orders, ...action.orders],
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
