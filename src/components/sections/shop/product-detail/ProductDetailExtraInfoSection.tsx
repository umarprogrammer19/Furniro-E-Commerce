"use cleint";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductDetailExtraInfoSection() {
  const { product_id } = useParams();
  const [desc, setDescription] = useState();
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const query = `*[_type == "product"]{_id,description,"imageUrl":imageUrl.asset->url}`;
        const product = await client.fetch(query);
        const index = product.findIndex((item: { _id: string }) => item._id == product_id);
        setDescription(product[index]);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchDescription();
  }, []);

  if (!desc) return <h1>Description Does Not Provided</h1>;

  const { description, imageUrl } = desc;
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
        <p className="text-customGray text-normal">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[70%] mt-[37px]">
        <div className=" flex flex-col bg-primary-light  rounded-[8px] justify-center items-center">
          <Image
            src={imageUrl}
            alt="product"
            width={200}
            height={200}
            className="w-full"
          />
        </div>
        <div className=" flex flex-col bg-primary-light  rounded-[8px] justify-center items-center">
          <Image
            src={imageUrl}
            alt="product"
            width={200}
            height={200}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
