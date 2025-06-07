// src/Utility/Reducer.js

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
      return {
        ...state,
        orders: [...state.orders, action.payload], // payload is a single order
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
