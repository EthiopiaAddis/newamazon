import React, { createContext, useContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Utility/Firebase";

const StateContext = createContext();

export const initialState = {
  cart: [],
  user: null,
  orders: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id
      );
      if (itemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndex].qty += 1;
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, { ...action.item, qty: 1 }] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    case "INCREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };

    case "ADD_ORDERS":
      const incomingOrders = Array.isArray(action.payload)
        ? action.payload
        : [];
      return {
        ...state,
        orders: [...state.orders, ...incomingOrders],
      };

    case "SET_ORDERS":
      const newOrders = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        orders: newOrders,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch({ type: "SET_USER", user });

        try {
          const ordersRef = collection(db, "orders");
          const q = query(ordersRef, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          dispatch({ type: "SET_ORDERS", payload: orders });
        } catch (error) {
          console.error("Error loading orders:", error);
        }
      } else {
        dispatch({ type: "SET_USER", user: null });
        dispatch({ type: "SET_ORDERS", payload: [] });
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
