"use client";
import ProductCard from "../cards/ProductCard";
import MainButton from "../common/MainButton";
import { ImportedData } from "@/types";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { query } from "@/utils/query";
import { useSearch } from "@/context/searchContext";

function OurProductSection() {
  const { searchQuery } = useSearch();
  const [PRODUCTS, setPRODUCTS] = useState<ImportedData[]>([]);

  useEffect(() => {
    const fetchDataFromSanity = async () => {
      try {
        const PRODUCTS = await client.fetch(query);
        setPRODUCTS(PRODUCTS);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataFromSanity();
  }, []);

  // Filter the products based on the search query
  const filteredProducts = PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Our Product</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {filteredProducts.map((item: ImportedData) => (
          <ProductCard {...item} key={item._id} />
        ))}
      </div>
      <div className="flex justify-center my-[32px]">
        <MainButton
          text="Show More"
          classes="bg-transparent hover:bg-transparent text-primary font-bold border border-primary h-[48px]"
        />
      </div>
    </section>
  );
}

export default OurProductSection;
