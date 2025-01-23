"use client";

import { createContext, useContext, useState } from "react";

type FilterContextType = {
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  category: string;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setSortBy: (sort: string) => void;
  setCategory: (category: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [sortBy, setSortBy] = useState<string>("default");
  const [category, setCategory] = useState<string>("all");

  return (
    <FilterContext.Provider
      value={{
        minPrice,
        maxPrice,
        sortBy,
        category,
        setMinPrice,
        setMaxPrice,
        setSortBy,
        setCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
