import { CartContext } from "@/context/CartContext";
import React, { useContext } from "react";

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) throw Error("Cart context is not defined");

  return context;
};
