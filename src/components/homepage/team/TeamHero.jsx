import Link from "next/link";
import { FaArrowRight, FaUsers } from "react-icons/fa";

const TeamHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#001B08]">
      {/* Decorative Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#E8BB44] blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#E8BB44]/40 blur-3xl" />
      </div>

      {/* Subtle Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#F7F5EF 1px, transparent 1px), linear-gradient(90deg, #F7F5EF 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto flex min-h-[520px] w-[90%] max-w-7xl items-center py-20 md:min-h-[580px] md:py-24">
        <div className="w-full">
          {/* Eyebrow */}
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="badge h-auto gap-2 border border-[#E8BB44]/25 bg-[#E8BB44]/10 px-4 py-3 text-sm font-medium text-[#E8BB44]">
              <FaUsers className="text-xs" />
              The people behind Bazar-e-Pak
            </div>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-center text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-left md:text-6xl lg:text-7xl">
            Meet the people
            <span className="mt-2 block text-[#E8BB44]">
              building Bazar-e-Pak.
            </span>
          </h1>

          {/* Decorative Divider */}
          <div className="mt-7 flex items-center justify-center gap-3 md:justify-start">
            <span className="h-px w-12 bg-[#E8BB44]" />
            <span className="text-sm text-[#E8BB44]">★</span>
            <span className="h-px w-20 bg-[#E8BB44]/40" />
          </div>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-center text-base leading-7 text-white/65 sm:text-lg md:text-left md:leading-8">
            We are a small team with a shared goal — building a simple, useful,
            and reliable platform that connects people with local shops,
            products, and businesses.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="#team"
              className="btn h-12 min-h-12 border-0 bg-[#E8BB44] px-6 font-semibold text-[#001B08] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Meet Our Team
              <FaArrowRight className="text-sm" />
            </Link>

            <Link
              href="/about"
              className="btn h-12 min-h-12 border border-white/15 bg-white/5 px-6 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-[#E8BB44]/40 hover:bg-[#E8BB44]/10 hover:text-[#E8BB44]"
            >
              About Bazar-e-Pak
            </Link>
          </div>

          {/* Bottom Meta */}
          <div className="mt-12 flex items-center justify-center gap-6 text-xs font-medium uppercase tracking-widest text-white/35 md:justify-start">
            <span>People</span>
            <span className="h-1 w-1 rounded-full bg-[#E8BB44]" />
            <span>Passion</span>
            <span className="h-1 w-1 rounded-full bg-[#E8BB44]" />
            <span>Product</span>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#001B08] to-transparent"
      />
    </section>
  );
};

export default TeamHero;
