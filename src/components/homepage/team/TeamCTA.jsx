import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TeamCTA = () => {
  return (
    <section className="bg-[#E8BB44]">
      <div className="mx-auto flex w-[90%] max-w-7xl flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#001B08]/55">
            Discover Bazar-e-Pak
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
            Let&apos;s grow local businesses together.
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#001B08]/60">
            Discover businesses, products, services, and opportunities through
            Bazar-e-Pak.
          </p>
        </div>

        <Link
          href="/shops"
          className="btn shrink-0 border-0 bg-[#001B08] px-6 text-white hover:bg-white hover:text-[#001B08]"
        >
          Explore Shops
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
};

export default TeamCTA;