"use client";

import ProductCard from "@/components/cards/ProductCard";
import MainButton from "@/components/common/MainButton";
import { useSearch } from "@/context/searchContext";
import { useFilter } from "@/context/filterContext";
import { useEffect, useState } from "react";
import Loading from "@/components/common/loading";
import { getProducts, ProductFromAPI } from "@/lib/api/products";
import { useToast } from "@/components/ui/use-toast";

function ShopProductSection() {
  const { searchQuery } = useSearch();
  const { minPrice, maxPrice, sortBy, category } = useFilter();
  const [PRODUCTS, setPRODUCTS] = useState<ProductFromAPI[]>([]);
  const [skipNumberOfProducts, setSkipNumberOfProducts] = useState<number>(8);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts(1, 100); // Fetch all products for client-side filtering
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[32px] mt-[46px]">
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
          <p className="text-customGray text-lg">No products found matching your criteria.</p>
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

export default ShopProductSection;
