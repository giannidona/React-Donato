import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { ItemList } from "../components/ItemList";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const ItemListContainer = ({ greeting }) => {
  const [products, SetProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const database = getFirestore();
    const refCollection = collection(database, "nfts");
    const q = id
      ? query(refCollection, where("category", "==", id))
      : refCollection;

    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        SetProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de Firebase:", error);
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
