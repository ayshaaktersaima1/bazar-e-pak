// import Banner from "@/components/homepage/Banner";

import BestSellers from "@/components/homepage/BestSellers";
import Categories from "@/components/homepage/Categories";
import Features from "@/components/homepage/Features";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import FadeUp from "@/components/shared/FadeUp";
import Image from "next/image";
import ShopsSection from "../../components/homepage/ShopsSection";
import BannerDiscount from "@/components/homepage/BannerDiscount";
import MissionVission from "../../components/homepage/MissionVission";
import WhatsAppFloat from "../../components/shared/WhatsAppFloat";
import BackToTop from "../../components/shared/BackToTop";

export default function Home() {
  return (
    <div>
      {/* <Banner></Banner> */}
      <BannerDiscount></BannerDiscount>

      <FadeUp>
        <MissionVission></MissionVission>
      </FadeUp>
      <FadeUp>
        <Features />
      </FadeUp>

      <FadeUp>
        <ShopsSection />
      </FadeUp>
      <FadeUp>
        <Categories />
      </FadeUp>

      <FadeUp>
        <WhyChooseUs />
      </FadeUp>

      <FadeUp>
        <BestSellers />
      </FadeUp>

      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
}
