"use client";
import { client } from "@/sanity/lib/client";
import ProductCard from "../cards/ProductCard";
import MainButton from "../common/MainButton";
import { ImportedData } from "@/types";
import React, { useEffect, useState } from "react";
import { query } from "@/utils/query";

function OurProductSection() {
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
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Our Product</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {PRODUCTS.map((item: ImportedData) => (
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
