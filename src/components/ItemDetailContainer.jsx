import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ItemDetail } from "./ItemDetail";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const database = getFirestore();
    const refDocument = doc(database, "nfts", id);

    getDoc(refDocument)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productData = { id: snapshot.id, ...snapshot.data() };
          setProduct(productData);
        } else {
          console.log("El producto no existe en Firebase.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el producto desde Firebase:", error);
      });
  }, [id]);

  return (
    <Container className="mt-4">
      <h1>Product Detail</h1>
      {product === null ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ItemDetail prod={product} />
        </div>
      )}
    </Container>
  );
};
