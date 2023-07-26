import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export const Cart = () => {
  const { cartItems, removeItem, clear } = useCart();

  const totalPurchase = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <h5>{item.name}</h5>{" "}
                <p>
                  - Cantidad: {item.quantity} - Precio: {item.totalPrice} ETH
                </p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="mt-3">
          <h5>Total de la compra: {totalPurchase} ETH</h5>
          <Link to="/checkout" className="btn btn-primary mt-2">
            Finalizar Compra
          </Link>
        </div>
      )}
      <button className="btn btn-secondary mt-3" onClick={clear}>
        Vaciar Carrito
      </button>
    </div>
  );
};
