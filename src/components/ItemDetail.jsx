import { React, useState } from "react";
import { ItemCount } from "./ItemCount";
import { useCart } from "./CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ItemDetail = ({ prod }) => {
  const [cartItemCount, setCartItemCount] = useState(1);
  const { addItem, isInCart } = useCart();

  const handleCartItemCountChange = (newCount) => {
    setCartItemCount(newCount);
  };

  const handleAddToCart = () => {
    if (!isInCart(prod.id)) {
      addItem(prod, cartItemCount);
    }
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
          <p className="mb-0">{prod.price}</p>
          <p>{prod.category}</p>
          <div>
            <ItemCount
              initialValue={cartItemCount}
              stock={prod.stock}
              onCountChange={handleCartItemCountChange}
              onAddToCart={handleAddToCart}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
