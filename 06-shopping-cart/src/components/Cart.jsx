import { useId } from "react";
import "./Cart.css";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart.js";
import { CartItem } from "./CartItem.jsx";

export function Cart() {
  const cartCheckBoxId = useId();
  const { clearCart, cart, addToCart } = useCart();

  return (
    <>
      <label htmlFor={cartCheckBoxId} className="cart-button">
        <CartIcon />
      </label>
      <input id={cartCheckBoxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}></CartItem>
          ))}
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
