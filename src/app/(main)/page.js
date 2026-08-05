import Banner from "@/components/homepage/Banner";
import BestSellers from "@/components/homepage/BestSellers";
import Categories from "@/components/homepage/Categories";
import Features from "@/components/homepage/Features";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <Categories></Categories>
      <WhyChooseUs></WhyChooseUs>
      <BestSellers></BestSellers>
    </div>

  );
}
