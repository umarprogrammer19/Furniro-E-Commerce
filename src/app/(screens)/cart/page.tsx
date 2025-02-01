import ShopBannerSection from "@/components/sections/shop/ShopBannerSection";
import CartList from "./sections/cart-list";
import CartTotals from "./sections/cart-totals";
import Hero from "@/components/common/Hero";

export default function CartPage() {
  return (
    <>
      <Hero title="Cart" />

      <section className="w-full grid lg:flex justify-between grid-cols-4 gap-5 lg:gap-10 py-10">
        <div className="relative left-[20%] lg:left-0 w-[90vw] lg:w-[80%] mx-auto flex lg:flex-row flex-col justify-between">
          <CartList />
          <CartTotals />
        </div>
      </section>

      <ShopBannerSection />
    </>
  );
}
