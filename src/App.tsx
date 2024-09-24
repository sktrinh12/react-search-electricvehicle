import React from "react";
import Search from "./Search";
import CarDetails from "./CarDetails";
import Cart from './ShoppingCartPage';
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
