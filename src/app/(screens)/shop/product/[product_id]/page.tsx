"use client";

import ProductDetailExtraInfoSection from "@/components/sections/shop/product-detail/ProductDetailExtraInfoSection";
import ProductDetailRelatedSection from "@/components/sections/shop/product-detail/ProductDetailRelatedSection";
import ProductDetailShowcaseSection from "@/components/sections/shop/product-detail/ProductDetailShowcaseSection";
import ProductDetailTopSection from "@/components/sections/shop/product-detail/ProductDetailTopSection";
import { Separator } from "@/components/ui/separator";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{
    product_id: string;
  }>;
}) {
  const resolvedParams = await params;
  console.log(resolvedParams.product_id);
  return (
    <div className="mt-24 lg:mt-8">
      <ProductDetailTopSection product_id={"Detailed Page"} />
      <div className="mt-8 px-4 md:px-[50px] lg:px-[100px]">
        <ProductDetailShowcaseSection productId={resolvedParams.product_id} />
      </div>
      <div className="my-[40px]">
        <Separator />
      </div>
      <div className="mt-8 px-4 md:px-[50px] lg:px-[100px]">
        <ProductDetailExtraInfoSection />
      </div>

      <div className="my-[40px]">
        <Separator />
      </div>
      <div className="mt-8 px-4 md:px-[50px] lg:px-[100px]">
        <ProductDetailRelatedSection />
      </div>
    </div>
  );
}