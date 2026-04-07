"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getProducts, ProductFromAPI } from "@/lib/api/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import Products from "./compared-products";

export type Products = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: string | number;
  otherPrice?: string | number;
  type?: string;
  typeValue?: string;
};

export default function AddProducts() {
  const [comparison, setComparison] = useState<any[]>([]);
  const [PRODUCTS, setPRODUCTS] = useState<ProductFromAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts(1, 100);
        setPRODUCTS(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  function addToComparison(product: any) {
    setComparison((prev) => {
      if (!prev.some((item) => item._id === product._id)) {
        return [...prev, product];
      }
      return prev;
    });
  }

  function handleClick(index: number) {
    const newProduct = PRODUCTS[index];
    addToComparison(newProduct);
  }

  return (
    <>
      <Products comparison={comparison} setComparison={setComparison} />

      <div className={`${comparison.length === 3 ? "hidden" : "flex"} w-full flex-col gap-1`}>
        <p className="text-xl font-medium">Add a product</p>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full bg-myOrange text-sm text-white font-medium h-10 flex items-center justify-start px-3 rounded-[7px]">
            {isLoading ? "Loading..." : "Choose a product"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] max-h-[400px] overflow-y-auto">
            {PRODUCTS.map((item, index) => (
              <DropdownMenuItem
                key={item._id}
                className="px-3 flex items-center w-full gap-3"
                onClick={() => handleClick(index)}
              >
                <Image
                  src={item.imageUrl}
                  alt="Product image"
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-[3px]"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold leading-none">{item.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[#3A3A3A] text-[11px] font-semibold">
                      {"$" + item.price}
                    </p>
                    {item.discountPercentage > 0 && (
                      <p className="text-[#B0B0B0] line-through text-[11px]">
                        - {item.discountPercentage}%
                      </p>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
