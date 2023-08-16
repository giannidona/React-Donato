import React, { useContext } from "react";
import cart from "../assets/cart.svg";
import { Link } from "react-router-dom";
import CartContext from "../contexts/CartContext";

export const CartWidget = () => {
  const { cartItems } = useContext(CartContext);

  const totalAllProducts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link to="/cart" className="cart-widget text-decoration-none">
      <img src={cart} alt="cart" />
      {totalAllProducts > 0 && (
        <span className="cart-quantity text-light p-2">{totalAllProducts}</span>
      )}
    </Link>
  );
};
