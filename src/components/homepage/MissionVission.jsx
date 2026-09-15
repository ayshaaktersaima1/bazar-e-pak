import Image from "next/image";

const MissionVission = ({ cmsItem = null }) => {
  const content = cmsItem?.content || {};

  const sectionLabel =
    content.sectionLabel ||
    "Our Vision & Mission";

  const heading =
    content.heading ||
    "Building a Better Way to Shop";

  const founderImage =
    content.founderImage ||
    "/images/owner.png";

  const founderName =
    content.founderName ||
    "Monkey Ali Zinna";

  const founderRole =
    content.founderRole ||
    "Founder & Owner, Bazar-e-Pak";

  const messageLabel =
    content.messageLabel ||
    "A Message From Our Founder";

  const quote =
    content.quote ||
    "Bazar-e-Pak isn't just about buying and selling. It's about creating trust between people, supporting local businesses, and making every online shopping experience a little better.";

  const mission =
    content.mission ||
    "Our mission is to bring trusted sellers, quality products, and everyday shoppers together in one simple marketplace. We want to make online shopping more accessible, transparent, and convenient while helping local businesses reach customers across Pakistan.";

  const imageAlt =
    content.imageAlt ||
    `${founderName}, Founder of Bazar-e-Pak`;

  return (
    <section className="bg-[#F7F5EF] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-14 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#E8BB44]">
            {sectionLabel}
          </p>

          <h2 className="font-serif text-4xl font-bold leading-tight text-[#001B08] sm:text-5xl">
            {heading}
          </h2>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#001B08]" />
            <span className="text-sm text-[#E8BB44]">★</span>
            <span className="h-px w-14 bg-[#001B08]" />
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <Image
                width={300}
                height={300}
                src={founderImage}
                alt={imageAlt}
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>

            <div className="absolute bottom-5 left-5 rounded-xl bg-[#001B08] px-5 py-4 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E8BB44]">
                Founder
              </p>

              <p className="mt-1 font-serif text-xl font-bold text-white">
                {founderName}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8BB44]">
              {messageLabel}
            </p>

            <blockquote className="font-serif text-3xl font-bold leading-[1.15] text-[#001B08] sm:text-4xl lg:text-[42px]">
              “{quote}”
            </blockquote>

            <div className="my-7 h-px w-full bg-[#001B08]/10" />

            <p className="max-w-2xl text-base leading-7 text-[#001B08]/70">
              {mission}
            </p>

            <div className="mt-8">
              <p className="font-serif text-xl font-bold text-[#001B08]">
                {founderName}
              </p>

              <p className="mt-1 text-sm text-[#001B08]/60">
                {founderRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVission;