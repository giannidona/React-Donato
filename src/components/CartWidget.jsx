import React, { useContext } from "react";
import cart from "../assets/cart.svg";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";

export const CartWidget = () => {
  const { cartItems } = useContext(CartContext);

  const uniqueProducts = new Set(cartItems.map((item) => item.id));
  const totalDifferentProducts = uniqueProducts.size;

  return (
    <Link to="/cart" className="cart-widget text-decoration-none">
      <img src={cart} alt="cart" />
      {totalDifferentProducts > 0 && (
        <span className="cart-quantity text-light p-2">
          {totalDifferentProducts}
        </span>
      )}
    </Link>
  );
};
