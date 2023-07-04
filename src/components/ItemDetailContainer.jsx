import { useState, useEffect } from "react";
import data from "../data/products.json";
import { Container } from "react-bootstrap";
import { ItemDetail } from "./ItemDetail";

export const ItemDetailContainer = (props) => {
  const [product, SetProduct] = useState([]);

  useEffect(() => {
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        res(data);
      }, 2000);
    });

    promise.then((result) => {
      SetProduct(result[1]);
    });
  }, []);
  return (
    <Container className="mt-4">
      <h1>Product Detail</h1>
      {product.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <ItemDetail prod={product} />
      )}
    </Container>
  );
};
