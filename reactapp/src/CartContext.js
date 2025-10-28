import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext(undefined);
CartContext.displayName = 'CartContext';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, action.payload];
    }

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);

    case 'CLEAR_CART':
      return [];

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// CartProvider with optional initialCart for testing or previews
export const CartProvider = ({ children, initialCart = [] }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Safe useCart hook: uses context if available, otherwise returns fallback
export const useCart = () => {
  const context = useContext(CartContext);

  if (context) {
    return context;
  }

  // Fallback for environments without CartProvider (e.g., tests)
  return {
    cart: [],
    dispatch: () => {}, // no-op
  };
};