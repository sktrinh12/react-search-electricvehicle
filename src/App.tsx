import React from "react";
import Search from "./Search";
import CarDetails from "./CarDetails";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
      </Routes>
  );
};

export default App;
