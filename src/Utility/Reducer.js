export const initialState = {
  cart: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists, increase qty without mutating original state
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex ? { ...item, qty: item.qty + 1 } : item
        );

        return {
          ...state,
          cart: updatedCart,
        };
      }

      // If item is not in cart, add with qty 1
      return {
        ...state,
        cart: [...state.cart, { ...action.item, qty: 1 }],
      };
    }

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
        cart: state.cart
          .map((item) =>
            item.id === action.id && item.qty > 1
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item) => item.qty > 0),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    default:
      return state;
  }
};
