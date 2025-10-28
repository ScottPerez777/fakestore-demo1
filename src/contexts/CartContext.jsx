import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
};

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

const initialCartState = {
  items: [],
};

export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: product,
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: productId,
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR_CART,
    });
  };

  const getCartItemsCount = () => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartState.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const value = {
    cart: cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
