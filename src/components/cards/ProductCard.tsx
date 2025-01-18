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
  dicountPercentage,
  isNew,
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

  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileHover="animate"
      viewport={{ once: false }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          className="h-[301px] w-full object-cover rounded-md"
        />

        {dicountPercentage !== undefined && (
          <div
            className={cn(
              "absolute top-[24px] right-[24px] w-[48px] h-[48px] rounded-full text-sm font-medium flex justify-center items-center",
              dicountPercentage > 0 ? "bg-success text-white" : isNew ? "bg-primary text-white" : ""
            )}
          >
            {dicountPercentage > 0
              ? `-${dicountPercentage}%`
              : isNew
                ? "NEW"
                : ""}
          </div>
        )}
      </div>

      <div className="bg-[#F4F5F7] p-4 rounded-b-md">
        <p className="text-customBlack text-xl font-semibold truncate">
          {title}
        </p>
        <p className="text-customGray font-medium text-sm py-2">
          {description.slice(0, 158)}...
        </p>
        <div className="flex justify-between items-center">
          <p className="text-customBlack text-lg font-semibold">${price}</p>
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
              text="View Product"
              classes="bg-white text-primary font-bold hover:bg-white px-4 py-2"
              action={() => router.push(`/shop/product/${_id}`)}
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
