import Banner from "@/components/homepage/Banner";
import BestSellers from "@/components/homepage/BestSellers";
import Categories from "@/components/homepage/Categories";
import Features from "@/components/homepage/Features";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import FadeUp from "@/components/shared/FadeUp";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FadeUp>
        <Features />
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
    </div>

  );
}
