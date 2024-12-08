"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/constants"; // Import your product list
import Products from "./compared-products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AddProducts() {
  const [comparison, setComparison] = useState<any[]>([]); // State to manage selected products

  function addToComparison(product: any) {
    // Add product to comparison if not already added
    setComparison((prev) => {
      if (!prev.some((item) => item.id === product.id)) {
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
      <Products comparison={comparison} setComparison={setComparison} /> {/* Pass comparison data */}

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
                key={index}
                className="px-3 flex items-center w-full gap-3"
                onClick={() => handleClick(index)}
              >
                <img
                  src={item.imageUrl}
                  alt="Product image"
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
