import Image from "next/image";
import React from "react";

const MissionVission = () => {
  return (
    <section className="bg-[#F7F5EF] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-14 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#E8BB44]">
            Our Vision & Mission
          </p>

          <h2 className="font-serif text-4xl font-bold leading-tight text-[#001B08] sm:text-5xl">
            Building a Better Way to Shop
          </h2>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#001B08]" />
            <span className="text-sm text-[#E8BB44]">★</span>
            <span className="h-px w-14 bg-[#001B08]" />
          </div>
        </div>

        {/* Founder Content */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Founder Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <Image
                width={300}
                height={300}
                src="/images/owner.png"
                alt="Monkey Ali Zinna, Founder of Bazar-e-Pak"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>

            {/* Founder Badge */}
            <div className="absolute bottom-5 left-5 rounded-xl bg-[#001B08] px-5 py-4 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E8BB44]">
                Founder
              </p>

              <p className="mt-1 font-serif text-xl font-bold text-white">
                Monkey Ali Zinna
              </p>
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8BB44]">
              A Message From Our Founder
            </p>

            <blockquote className="font-serif text-3xl font-bold leading-[1.15] text-[#001B08] sm:text-4xl lg:text-[42px]">
              “Bazar-e-Pak isn&apos;t just about buying and selling. It&apos;s about
              creating trust between people, supporting local businesses, and
              making every online shopping experience a little better.”
            </blockquote>

            <div className="my-7 h-px w-full bg-[#001B08]/10" />

            <p className="max-w-2xl text-base leading-7 text-[#001B08]/70">
              Our mission is to bring trusted sellers, quality products, and
              everyday shoppers together in one simple marketplace. We want to
              make online shopping more accessible, transparent, and convenient
              while helping local businesses reach customers across Pakistan.
            </p>

            {/* Founder Info */}
            <div className="mt-8">
              <p className="font-serif text-xl font-bold text-[#001B08]">
                Monkey Ali Zinna
              </p>

              <p className="mt-1 text-sm text-[#001B08]/60">
                Founder & Owner, Bazar-e-Pak
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVission;
