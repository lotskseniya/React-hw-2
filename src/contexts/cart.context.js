import { createContext } from "react";

export const CartContext = createContext({itemsToBuy: [], totalPrice: 0, cartItems: []});