"use client";

import { getSingleProduct, ProductFromAPI } from "@/lib/api/products";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/components/common/loading";

export default function ProductDetailExtraInfoSection() {
  const { product_id } = useParams();
  const [product, setProduct] = useState<ProductFromAPI | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!product_id) return;
      try {
        setIsLoading(true);
        const data = await getSingleProduct(product_id as string);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [product_id]);

  if (isLoading) return <Loading />;

  if (!product) return <h1>Product not found</h1>;

  const { description, imageUrl, tags, category, discountPercentage, isNew } = product;
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex gap-[53px]">
        <p className="text-customGray text-normal md:text-[24px] font-semibold">
          Description
        </p>
        <p className="text-customGray text-normal md:text-[24px]">
          Additional Information
        </p>
        <p className="text-customGray text-normal md:text-[24px]">
          Reviews [5]
        </p>
      </div>
      <div className="mt-[37px] ">
        <p className="text-customGray text-normal max-w-3xl text-center">
          {description}
        </p>
      </div>

      {/* Additional Info Section */}
      <div className="mt-[37px] grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <div className="bg-primary-light p-6 rounded-[8px]">
          <h4 className="font-semibold mb-4">Product Details</h4>
          <div className="space-y-2">
            <div className="flex">
              <span className="text-gray-500 w-24">Category:</span>
              <span className="capitalize">{category || "N/A"}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-24">Tags:</span>
              <span>{tags?.join(", ") || "N/A"}</span>
            </div>
            {discountPercentage > 0 && (
              <div className="flex">
                <span className="text-gray-500 w-24">Discount:</span>
                <span className="text-success">{discountPercentage}% OFF</span>
              </div>
            )}
            {isNew && (
              <div className="flex">
                <span className="text-gray-500 w-24">Status:</span>
                <span className="text-primary font-medium">New Arrival</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col bg-primary-light rounded-[8px] justify-center items-center p-4">
          <Image
            src={imageUrl}
            alt="product"
            width={200}
            height={200}
            className="w-full max-w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
