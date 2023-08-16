import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export const Cart = () => {
  const { cartItems, removeItem, clear } = useCart();

  const [localCartItems, setLocalCartItems] = useState(cartItems);

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const totalPurchase = localCartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    if (
      newQuantity >= 1 &&
      newQuantity <= cartItems.find((item) => item.id === itemId).stock
    ) {
      const updatedCartItems = localCartItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.price,
            }
          : item
      );

      setLocalCartItems(updatedCartItems);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {localCartItems.map((item) => (
            <li key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <h5>{item.name}</h5>{" "}
                <div>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="btn btn-primary btn-sm ml-2"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <p>Price: {item.totalPrice} ETH</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="mt-3">
          <h5>Total purchase: {totalPurchase} ETH</h5>
          <Link to="/checkout" className="btn btn-primary mt-2">
            Finalize Purchase
          </Link>
        </div>
      )}
      <button className="btn btn-secondary mt-3" onClick={clear}>
        Empty Cart
      </button>
    </div>
  );
};
