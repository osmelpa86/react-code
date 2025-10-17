import { useContext } from "react";
import { Cart } from "../components/Cart";
import { CartContext } from "../context/cart/cart-context";

export function useCart() {
  const cartContext = useContext(CartContext);

  if (cartContext === undefined) {
    throw new Error("userCart must be within a CartProvider");
  }

  return cartContext;
}
