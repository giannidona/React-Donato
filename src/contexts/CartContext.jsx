import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].totalPrice =
          updatedItems[existingItemIndex].quantity * item.price;

        return updatedItems;
      } else {
        const newItem = {
          ...item,
          quantity,
          totalPrice: item.price * quantity,
        };

        return [...prevItems, newItem];
      }
    });
  };

  const totalPurchase = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const removeItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const clear = () => {
    setCartItems([]);
  };

  const isInCart = (id) => {
    return cartItems.some((cartItem) => cartItem.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        clear,
        isInCart,
        totalPurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
