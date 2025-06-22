export const initialState = {
  cart: [],
  user: null,
  orders: [],
};

// Helper function to safely get orders array
const getOrdersArray = (action) => {
  try {
    if (Array.isArray(action?.payload)) return action.payload;
    if (Array.isArray(action?.orders)) return action.orders;
    if (action?.payload) return [action.payload];
    if (action?.orders) return [action.orders];
    return [];
  } catch (error) {
    console.error("Error parsing orders:", error);
    return [];
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    // Cart operations
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.id === action.item.id
      );
      return {
        ...state,
        cart: existingItem
          ? state.cart.map((item) =>
              item.id === action.item.id ? { ...item, qty: item.qty + 1 } : item
            )
          : [...state.cart, { ...action.item, qty: 1 }],
      };

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

    case "CLEAR_CART":
      return { ...state, cart: [] };

    // User operations
    case "SET_USER":
      return { ...state, user: action.user };

    // Orders operations (fully protected)
    case "ADD_ORDERS":
      const ordersToAdd = getOrdersArray(action);
      console.log("Adding orders:", ordersToAdd); // Debug log
      return {
        ...state,
        orders: [...state.orders, ...ordersToAdd],
      };

    case "SET_ORDERS":
      const newOrders = getOrdersArray(action);
      console.log("Setting orders:", newOrders); // Debug log
      return {
        ...state,
        orders: newOrders,
      };

    default:
      console.warn("Unknown action type:", action.type);
      return state;
  }
};
