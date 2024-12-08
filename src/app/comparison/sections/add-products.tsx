"use client";

import { useState } from "react";
import { Product } from "@/lib/constants"; // Ensure Product type is imported correctly
import Products from "./compared-products"; // Correct import path for the Products component
import { PRODUCTS } from "@/lib/constants";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  const [comparison, setComparison] = useState<Product[]>([]); // Correct state initialization

  function addToComparison(product: Product) {
    setComparison((prev) => {
      if (!prev.some((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  }

  function handleClick(index: number) {
    const newProduct: any = PRODUCTS[index]; // Make sure PRODUCTS is of type Product[]
    addToComparison(newProduct);
  }

  return (
    <>
      <Products comparison={comparison} setComparison={setComparison} />

      <div className={`${comparison.length === 3 ? "hidden" : "flex"} w-full flex-col gap-1`}>
        <p className="text-xl font-medium">Add a product</p>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full bg-myOrange text-sm text-white font-medium h-10 flex items-center justify-start px-3 rounded-[7px]">
            Choose a product
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] max-h-[400px] overflow-y-auto">
            {PRODUCTS.map((item, index) => (
              <DropdownMenuItem
                key={item.id}
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
                      {"Rs: " + item.price}
                    </p>
                    {item.type === "DISCOUNTED" && (
                      <p className="text-[#B0B0B0] line-through text-[11px]">
                        {"Rs: " + item.otherPrice}
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
