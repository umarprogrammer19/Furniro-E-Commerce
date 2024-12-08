import Hero from "@/components/common/Hero";
import ShopBannerSection from "@/components/sections/shop/ShopBannerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddProducts from "./sections/add-products";
import ProductTable from "./sections/product-table";

export default function ComparisonPage() {
  return (
    <>
      <Hero title="Product Comparison" />

      <div className="w-screen flex justify-center">
        <div className="w-[80%]">
          <section className="container w-full grid md:grid-cols-4 gap-5 h-fit pt-10 pb-16">
            <div className="flex w-full flex-col gap-1 md:col-span-4 lg:col-span-1">
              <p className="text-xl font-medium">
                Go to Product page for more Products
              </p>

              <Button
                asChild
                variant="link"
                className="text-sm text-[#727272] font-medium underline w-fit bg-transparent hover:bg-transparent pl-0"
              >
                <Link href={`/shop`}>View more</Link>
              </Button>
            </div>

            <AddProducts />
          </section>

          <ProductTable />
        </div>
      </div>
      <ShopBannerSection />
    </>
  );
}
