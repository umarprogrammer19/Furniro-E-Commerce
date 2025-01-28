"use client";
import { useSearch } from "@/context/searchContext";
import { client } from "@/sanity/lib/client";
import { ImportedData } from "@/types";
import { query } from "@/utils/query";
import { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import Loading from "../common/loading";
import MainButton from "../common/MainButton";

function OurProductSection() {
  const { searchQuery } = useSearch();
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
      {filteredProducts.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {filteredProducts.map((item: ImportedData, index: number) => (
          index < skipNumberOfProducts && <ProductCard {...item} key={item._id} />
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

export default OurProductSection;
