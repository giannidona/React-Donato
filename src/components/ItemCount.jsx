import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export const ItemCount = ({ stock, onAddToCart }) => {
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCartButtonClick = () => {
    onAddToCart(count);
    console.log("anda");
  };

  return (
    <div className="d-flex justify-content-between">
      <ButtonGroup className="mr-3">
        <Button onClick={handleDecrease}>-</Button>
        <p className="m-auto p-2">{count}</p>
        <Button onClick={handleIncrease}>+</Button>
      </ButtonGroup>
      <div className="ml-2">
        <Button onClick={handleAddToCartButtonClick}>Add to cart</Button>
      </div>
    </div>
  );
};
