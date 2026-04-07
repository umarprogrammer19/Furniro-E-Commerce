"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/context/searchContext";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "../cards/ProductCard";
import Loading from "../common/loading";
import MainButton from "../common/MainButton";
import { getProducts, ProductFromAPI } from "@/lib/api/products";

function OurProductSection() {
  const { searchQuery } = useSearch();
  const { toast } = useToast();
  const [PRODUCTS, setPRODUCTS] = useState<ProductFromAPI[]>([]);
  const [skipNumberOfProducts, setSkipNumberOfProducts] = useState<number>(8);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts(1, 100);
        setPRODUCTS(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Filter the products based on the search query
  const filteredProducts = PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Our Product</p>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
          {filteredProducts.map(
            (item, index) =>
              index < skipNumberOfProducts && (
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
              )
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-customGray text-lg">No products found.</p>
        </div>
      )}
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
