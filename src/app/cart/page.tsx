import ShopBannerSection from "@/components/sections/shop/ShopBannerSection";
import CartList from "./sections/cart-list";
import CartTotals from "./sections/cart-totals";
import Hero from "@/components/common/Hero";

export default function CartPage() {
  return (
    <>
      <Hero title="Cart" />

      <section className="sm:container w-full grid lg:flex justify-between grid-cols-4 gap-5 lg:gap-10 py-10">
        {/* <CartList /> */}
        {/* <CartTotals /> */}
      </section>

      <ShopBannerSection />
    </>
  );
}
