import React, { createContext, useState, useContext } from 'react';
import { Car } from "./types";

interface CarContextType {
  carData: Car[] | null;
  setCarData: React.Dispatch<React.SetStateAction<Car[] | null>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carData, setCarData] = useState<Car[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <CarContext.Provider value={{ carData, setCarData, currentPage, setCurrentPage }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};
