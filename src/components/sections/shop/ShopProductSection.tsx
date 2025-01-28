"use client";

import ProductCard from "@/components/cards/ProductCard";
import MainButton from "@/components/common/MainButton";
import { useSearch } from "@/context/searchContext";
import { useFilter } from "@/context/filterContext";
import { client } from "@/sanity/lib/client";
import { ImportedData } from "@/types";
import { query } from "@/utils/query";
import { useEffect, useState } from "react";
import Loading from "@/components/common/loading";

function ShopProductSection() {
  const { searchQuery } = useSearch();
  const { minPrice, maxPrice, sortBy, category } = useFilter();
  const [PRODUCTS, setPRODUCTS] = useState<ImportedData[]>([]);
  const [skipNumberOfProducts, setSkipNumberOfProducts] = useState<number>(8);

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

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice;
    const matchesCategory =
      category === "all" || product.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesPrice && matchesCategory;
  });


  if (sortBy === "price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <section>
      {filteredProducts.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[32px] mt-[46px]">
        {filteredProducts.map((item, index) => (
          index < skipNumberOfProducts && <ProductCard {...item} key={index} />
        ))}
      </div> : <Loading />}
      <div className="flex justify-center my-[32px]">
        <MainButton
          action={() => {
            setSkipNumberOfProducts(skipNumberOfProducts + 4);
            if (skipNumberOfProducts > 24) {
              setSkipNumberOfProducts(8);
            }
          }}
          text="Show More"
          classes="bg-transparent hover:bg-transparent text-primary font-bold border border-primary h-[48px]"
        />
      </div>
    </section>
  );
}

export default ShopProductSection;
