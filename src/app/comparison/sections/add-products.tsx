"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Products from "./compared-products";
import { PRODUCTS } from "@/lib/constants";
import Image from "next/image";

// Type definition for Product
export type Products = {
  id: string | number;
  title: string;
  imageUrl: string;
  description?: string;
  price: string | number; // Allow both string and number
  otherPrice?: string | number; // Allow both string and number
  type?: string; // Keep this as a string if it's not constrained
  typeValue?: string; // Optional propertytional original price for discounted products
};


export default function AddProducts() {
  const [comparison, setComparison] = useState<Products[]>([]);

  // Function to add a product to the comparison list
  function addToComparison(product: Products) {
    setComparison((prev) => {
      if (!prev.some((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  }

  // Handles the click event when selecting a product
  function handleClick(index: number) {
    const newProduct: Products = PRODUCTS[index];
    addToComparison(newProduct);
  }

  return (
    <>
      {/* Display compared products */}
      <Products comparison={comparison} setComparison={setComparison} />

      {/* Dropdown menu for adding products */}
      <div
        className={`${comparison.length === 3 ? "hidden" : "flex"
          } w-full flex-col gap-1`}
      >
        <p className="text-xl font-medium">Add a product</p>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full bg-myOrange text-sm text-white font-medium h-10 flex items-center justify-start px-3 rounded-[7px]">
            Choose a product
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] max-h-[400px] overflow-y-auto">
            {PRODUCTS.map((item, index) => (
              <DropdownMenuItem
                key={item.id} // Use item.id as the key for better uniqueness
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
                  <p className="text-sm font-semibold leading-none">
                    {item.title}
                  </p>
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
