import React from "react";
import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="Products on SALE!" />
    </>
  );
}

export default App;
