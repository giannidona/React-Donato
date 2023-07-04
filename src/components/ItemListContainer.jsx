import { useState, useEffect } from "react";
import data from "../data/products.json";
import { Container, Row } from "react-bootstrap";
import { ItemList } from "../components/ItemList";
import { useParams } from "react-router-dom";

export const ItemListContainer = ({ greeting }) => {
  const [products, SetProducts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        res(data);
      }, 2000);
    });

    promise.then((result) => {
      if (id) {
        SetProducts(result.filter((prod) => prod.category === id));
      } else {
        SetProducts(result);
      }
    });
  }, [id]);
  return (
    <Container className="mt-4">
      <Row>
        {products.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <ItemList products={products} />
        )}
      </Row>
    </Container>
  );
};
