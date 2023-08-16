import React from "react";
import { ItemCount } from "./ItemCount";
import { useCart } from "../contexts/CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ItemDetail = ({ prod }) => {
  const { addItem } = useCart();

  const handleAddToCart = (quantity) => {
    addItem(prod, quantity);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <img
            className="d-flex m-auto"
            src={`/img-products/${prod.img}`}
            alt="nft"
          />
        </Col>
        <Col>
          <h2>{prod.name}</h2>
          <p className="mb-0">{prod.details}</p>
          <p className="mb-0"> Stock: {prod.stock}</p>
          <p className="mb-0">Price: {prod.price} ETH</p>
          <p>{prod.category}</p>
          <div>
            <ItemCount stock={prod.stock} onAddToCart={handleAddToCart} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
