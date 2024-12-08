"use client";

import { Button } from "@/components/ui/button";
import StarIcon from "@/components/icons/star-icon";
import { Product } from "@/lib/constants"; // Ensure this is imported correctly
import Image from "next/image";

// Props type for Products component
interface ProductsProps {
  comparison: Product[];
  setComparison: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Props type for ProductCard component
interface ProductCardProps {
  product: Product;
  removeFromComparison: (id: string | number) => void;
}

export default function Products({ comparison, setComparison }: ProductsProps) {
  // Function to remove a product from the comparison list
  function removeFromComparison(id: string | number) {
    setComparison((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <>
      {comparison.length > 0 ? (
        comparison.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            removeFromComparison={removeFromComparison}
          />
        ))
      ) : (
        <div className="flex items-center justify-center border border-dashed border-[#afafaf] h-[200px] rounded-[10px]">
          <p className="text-myBlack text-sm">Select a product</p>
        </div>
      )}
    </>
  );
}

function ProductCard({ product, removeFromComparison }: ProductCardProps) {
  return (
    <div className="relative flex flex-col justify-between h-full gap-3 md:col-span-2 lg:col-span-1">
      <p
        className={`${product.type === 'NORMAL' ? "hidden" : "flex"} ${
          product.type === "DISCOUNTED"
            ? "p-2 bg-[#E97171]"
            : "py-2 px-3 bg-[#2EC1AC]"
        } text-white text-xs font-medium rounded-full absolute top-5 right-5`}
      >
        {product.type === "DISCOUNTED" ? product.typeValue : "New"}
      </p>
      <Image
        src={product.imageUrl}
        alt="Product Image"
        width={500}
        height={500}
        className="w-full h-[175px] rounded-[10px]"
      />
      <div className="w-full flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <p className="text-xl font-medium">{product.title}</p>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[#3A3A3A] text-sm font-semibold">
                {"Rs: " + product.price}
              </p>
              {product.type === "DISCOUNTED" && (
                <p className="text-[#B0B0B0] text-sm font-medium line-through">
                  {"Rs: " + product.otherPrice}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <p className="text-sm font-medium mt-0.5">4.2</p>
              <StarIcon className="w-4 h-4 fill-myOrange" />
            </div>
            <p className="text-sm text-[#9F9F9F]">200 reviews</p>
          </div>
        </div>
        <Button
          onClick={() => removeFromComparison(product.id)}
          className="text-[13px] px-2.5 py-2 h-fit bg-myOrange text-white outline-1 outline-myOrange hover:text-myOrange hover:bg-white hover:outline"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
