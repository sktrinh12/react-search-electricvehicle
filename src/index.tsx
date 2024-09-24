import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CarProvider } from "./CarContext";
import { CartProvider } from "./CartContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <CarProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CarProvider>
  </BrowserRouter>,
);
