import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_ITEM":
      return [...state, payload];
    case "UPDATE_ITEM":
      return state.map((cartItem) =>
        cartItem.item.id === payload.item.id
          ? { ...cartItem, quantity: payload.quantity }
          : cartItem
      );
    case "REMOVE_ITEM":
      return state.filter((cartItem) => cartItem.item.id !== payload.item.id);
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
