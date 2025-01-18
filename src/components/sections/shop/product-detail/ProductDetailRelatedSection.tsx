"use client";
import ProductCard from "@/components/cards/ProductCard";
import MainButton from "@/components/common/MainButton";
import { client } from "@/sanity/lib/client";
import { ImportedData } from "@/types";
import React, { useEffect, useState } from "react";

function ProductDetailRelatedSection() {
  const [data, setData] = useState<ImportedData[]>([]);
  const query = `*[_type == "product"]{
        _id,
        title,
        "imageUrl": imageUrl.asset->url,
        price,
        tags,
        description,
        dicountPercentage,
        isNew,  
      }`
  useEffect(() => {
    const fetchDataFromSanity = async () => {
      try {
        const PRODUCTS = await client.fetch(query);
        setData(PRODUCTS);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataFromSanity();
  }, [])

  return (
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Related Products</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {data.map((item, index) => (
          index < 8 && <ProductCard {...item} key={index} />
        ))}
      </div>
      <div className="flex justify-center mt-[32px]">
        <MainButton
          text="Show More"
          classes="bg-transparent hover:bg-transparent text-primary font-bold border border-primary h-[48px]"
        />
      </div>
    </section>
  );
}

export default ProductDetailRelatedSection;
