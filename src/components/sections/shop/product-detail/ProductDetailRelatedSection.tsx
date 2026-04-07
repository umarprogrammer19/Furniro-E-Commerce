"use client";

import ProductCard from "@/components/cards/ProductCard";
import MainButton from "@/components/common/MainButton";
import Loading from "@/components/common/loading";
import { getProducts, ProductFromAPI } from "@/lib/api/products";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";

function ProductDetailRelatedSection() {
  const [data, setData] = useState<ProductFromAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts(1, 8); // Fetch 8 products for related section
        setData(response.products);
      } catch (error) {
        console.error("Error fetching related products:", error);
        toast({
          title: "Error",
          description: "Failed to load related products.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [toast]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Related Products</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {data.map((item) => (
          <ProductCard
            _id={item._id}
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
            description={item.description}
            discountPercentage={item.discountPercentage}
            isNew={item.isNew}
            stock={item.stock}
            tags={item.tags}
            category={item.category}
            key={item._id}
          />
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
