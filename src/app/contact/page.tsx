import Hero from "@/components/common/Hero";
import ShopBannerSection from "@/components/sections/shop/ShopBannerSection";
import GetInTouch from "./sections/get-in-touch";

export default function ContactPage() {
  return (
    <>
      <Hero title="Contact"/>

      <GetInTouch />

      <ShopBannerSection/>
    </>
  );
}
