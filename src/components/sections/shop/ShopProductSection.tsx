"use client";
import ProductCard from "@/components/cards/ProductCard";
import { client } from "@/sanity/lib/client";
import { ImportedData } from "@/types";
import { query } from "@/utils/query";
import { useEffect, useState } from "react";

function ShopProductSection() {
  const [PRODUCTS, setPRODUCTS] = useState<ImportedData[]>([]);
  useEffect(() => {
    const fetchDataFromSanity = async () => {
      try {
        const PRODUCTS = await client.fetch(query);
        setPRODUCTS(PRODUCTS);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataFromSanity();
  }, [])
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[32px] mt-[46px]">
        {PRODUCTS.map((item, index) => (
          <ProductCard {...item} key={index} />
        ))}
      </div>
    </section>
  );
}

export default ShopProductSection;
