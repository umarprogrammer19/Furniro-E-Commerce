import BrowseTheRangeSection from "@/components/sections/BrowseTheRangeSection";
import SlickRoomSLider from "@/components/sections/Hero-Slider";
import HeroSection from "@/components/sections/HeroSection";
import OurProductSection from "@/components/sections/OurProductSection";
import ShareSetupSection from "@/components/sections/ShareSetupSection";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <div className="flex flex-col gap-[56px] mx-4 md:mx-[130px]">
        <BrowseTheRangeSection />
        <OurProductSection />
      </div>
      <div>
        <SlickRoomSLider />
      </div>
      <div className="mt-[56px]">
        <ShareSetupSection />
      </div>
    </main>
  );
}