import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<ItemListContainer greeting="Products" />}
        ></Route>
        <Route
          path="/category/:id"
          element={<ItemListContainer greeting="Products" />}
        ></Route>
        <Route path="/item/:id" element={<ItemDetailContainer />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
