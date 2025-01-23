"use client";

import { createContext, useContext, useState } from "react";

type FilterContextType = {
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    setMinPrice: (price: number) => void;
    setMaxPrice: (price: number) => void;
    setSortBy: (sort: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(Infinity);
    const [sortBy, setSortBy] = useState<string>("default");

    return (
        <FilterContext.Provider
            value={{ minPrice, maxPrice, sortBy, setMinPrice, setMaxPrice, setSortBy }}
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
