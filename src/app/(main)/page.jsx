import BestSellers from "@/components/homepage/BestSellers";
import Categories from "@/components/homepage/Categories";
import Features from "@/components/homepage/Features";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import FadeUp from "@/components/shared/FadeUp";
import ShopsSection from "@/components/homepage/ShopsSection";
import BannerDiscount from "@/components/homepage/BannerDiscount";
import MissionVission from "@/components/homepage/MissionVission";
import { serverApi } from "@/lib/server.js";

export default async function Home() {
  let cmsContent = [];

  try {
    cmsContent = await serverApi.get(
      "/api/cms/public?locale=en",
      {},
      {
        auth: false,
      },
    );
  } catch {
    cmsContent = [];
  }

  const heroContent = cmsContent.find(
    (item) => item.key === "homepage.hero",
  );

  const missionVisionContent = cmsContent.find(
    (item) => item.key === "homepage.vision-mission",
  );

  return (
    <div>
      <BannerDiscount cmsItem={heroContent} />

      <FadeUp>
        <MissionVission cmsItem={missionVisionContent} />
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
    </div>
  );
}