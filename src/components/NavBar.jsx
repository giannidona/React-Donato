import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { CartWidget } from "./CartWidget";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const database = getFirestore();
    const refCollection = collection(database, "nfts");

    getDocs(refCollection)
      .then((snapshot) => {
        const categoriesData = new Set();
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          categoriesData.add(data.category);
        });
        setCategories([...categoriesData]);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías desde Firebase:", error);
      });
  }, []);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <NavLink className="nav-link" to={"/"}>
              NFTs
            </NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            {categories.map((item) => (
              <NavLink key={item} className="nav-link" to={`/category/${item}`}>
                {item}
              </NavLink>
            ))}
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    </>
  );
};
