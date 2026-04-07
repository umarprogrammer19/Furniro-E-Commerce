"use client";

import { Button } from "@/components/ui/button";
import StarIcon from "@/components/icons/star-icon";
import Image from "next/image";
import { ProductFromAPI } from "@/lib/api/products";

// Props type for Products component
interface ProductsProps {
  comparison: ProductFromAPI[];
  setComparison: React.Dispatch<React.SetStateAction<ProductFromAPI[]>>;
}

// Props type for ProductCard component
interface ProductCardProps {
  product: ProductFromAPI;
  removeFromComparison: (id: string) => void;
}

export default function Products({ comparison, setComparison }: ProductsProps) {
  // Function to remove a product from the comparison list
  function removeFromComparison(id: string) {
    setComparison((prev) => prev.filter((product) => product._id !== id));
  }

  return (
    <>
      {comparison.length > 0 ? (
        comparison.map((product) => (
          <ProductCard
            key={product._id}
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
  // Determine badge type based on product data
  const getBadge = () => {
    if (product.stock === 0) {
      return { text: "Out of Stock", className: "bg-error", show: true };
    }
    if (product.discountPercentage > 0) {
      return { text: `-${product.discountPercentage}%`, className: "bg-[#E97171]", show: true };
    }
    if (product.isNew) {
      return { text: "New", className: "bg-[#2EC1AC]", show: true };
    }
    return { text: "", className: "", show: false };
  };

  const badge = getBadge();

  return (
    <div className="relative flex flex-col justify-between h-full gap-3 md:col-span-2 lg:col-span-1">
      {badge.show && (
        <p
          className={`py-2 px-3 ${badge.className} text-white text-xs font-medium rounded-full absolute top-5 right-5`}
        >
          {badge.text}
        </p>
      )}
      <Image
        src={product.imageUrl}
        alt="Product Image"
        width={500}
        height={500}
        className="w-full h-[175px] rounded-[10px] object-cover"
      />
      <div className="w-full flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <p className="text-xl font-medium truncate max-w-[200px]">{product.title}</p>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[#3A3A3A] text-sm font-semibold">
                {"Rs: " + product.price.toLocaleString()}
              </p>
              {product.discountPercentage > 0 && (
                <p className="text-[#B0B0B0] text-sm font-medium">
                  -{product.discountPercentage}%
                </p>
              )}
            </div>
            {/* Stock indicator */}
            <p className={`text-xs ${product.stock === 0 ? 'text-error' : product.stock <= 5 ? 'text-orange-500' : 'text-success'}`}>
              {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
            </p>
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
          onClick={() => removeFromComparison(product._id)}
          className="text-[13px] px-2.5 py-2 h-fit bg-myOrange text-white outline-1 outline-myOrange hover:text-myOrange hover:bg-white hover:outline"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
