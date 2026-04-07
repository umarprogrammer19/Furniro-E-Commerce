"use client";

import { cn } from "@/lib/utils";
import { ImportedData } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainButton from "../common/MainButton";

function ProductCard({
  _id,
  title,
  imageUrl,
  price,
  description,
  discountPercentage,
  isNew,
  stock,
}: ImportedData) {
  const router = useRouter();

  const icons = [
    {
      iconUrl: "/images/share_icon.png",
      title: "Share",
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Product link copied to clipboard!");
      },
    },
    {
      iconUrl: "/images/compare.png",
      title: "Compare",
      link: "/comparison",
    },
    {
      iconUrl: "/images/like_icon.png",
      title: "Like",
      action: () => {
        alert("Added to favorites!");
      },
    },
  ];

  const cardVariant = {
    initial: { opacity: 0, x: 120, scale: 0.8 },
    animate: { opacity: 1, x: 0, scale: 1 },
  };

  const isOutOfStock = stock === 0;

  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileHover="animate"
      viewport={{ once: false }}
      transition={{ duration: 0.4 }}
      className={cn("relative", isOutOfStock && "opacity-60")}
    >
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          className="h-[301px] w-full object-cover rounded-md"
        />

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <span className="bg-error text-white px-4 py-2 font-bold text-lg">
              Out of Stock
            </span>
          </div>
        )}

        {discountPercentage !== undefined && discountPercentage > 0 && !isOutOfStock && (
          <div
            className={cn(
              "absolute top-[24px] right-[24px] w-[48px] h-[48px] rounded-full text-sm font-medium flex justify-center items-center",
              "bg-success text-white"
            )}
          >
            -{discountPercentage}%
          </div>
        )}

        {isNew && !isOutOfStock && discountPercentage === 0 && (
          <div
            className={cn(
              "absolute top-[24px] right-[24px] w-[48px] h-[48px] rounded-full text-sm font-medium flex justify-center items-center",
              "bg-primary text-white"
            )}
          >
            NEW
          </div>
        )}
      </div>

      <div className="bg-[#F4F5F7] p-4 rounded-b-md">
        <p className="text-customBlack text-xl font-semibold truncate">
          {title}
        </p>
        <p className="text-customGray font-medium text-sm py-2">
          {description?.slice(0, 158)}...
        </p>
        <div className="flex justify-between items-center">
          <p className="text-customBlack text-lg font-semibold">${price}</p>
          {!isOutOfStock ? (
            <p className="text-success text-sm font-medium">{stock} in stock</p>
          ) : (
            <p className="text-error text-sm font-medium">Out of stock</p>
          )}
        </div>
      </div>

      {/* Overlay */}
      <motion.div
        className={cn(
          "absolute inset-0 bg-[#3A3A3A]/80 opacity-0 hover:opacity-100 transition-opacity p-4"
        )}
        variants={cardVariant}
      >
        <div className="pt-[30%]">
          <div className="flex justify-center">
            <MainButton
              text={isOutOfStock ? "Out of Stock" : "View Product"}
              classes="bg-white text-primary font-bold hover:bg-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              action={() => router.push(`/shop/product/${_id}`)}
              disabled={isOutOfStock}
            />
          </div>
          <div className="flex justify-center gap-5 mt-6">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="flex items-center gap-1 hover:cursor-pointer"
                onClick={icon.action}
              >
                <Image
                  src={icon.iconUrl}
                  alt={`${icon.title} icon`}
                  width={15}
                  height={15}
                  className="object-contain"
                />
                {icon.link ? (
                  <Link href={icon.link} className="text-white">
                    {icon.title}
                  </Link>
                ) : (
                  <span className="text-white">{icon.title}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductCard;
