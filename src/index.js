import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./components/CartContext";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsVuSpkFI4a8KD05wC2ZtI9M0ehtG31Xc",
  authDomain: "e-commercedonato.firebaseapp.com",
  projectId: "e-commercedonato",
  storageBucket: "e-commercedonato.appspot.com",
  messagingSenderId: "981704191282",
  appId: "1:981704191282:web:c371ad7765cf649c96bb2b",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
