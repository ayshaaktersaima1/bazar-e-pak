import Image from "next/image";
import Link from "next/link";

const BannerDiscount = ({ cmsItem = null }) => {
    const content = cmsItem?.content || {};

    const eyebrow =
        content.eyebrow ||
        "14 August Independence Day Sale";

    const heading =
        content.heading ||
        "Celebrate Freedom";

    const subheading =
        content.subheading ||
        "Celebrate Savings!";

    const upToText =
        content.upToText ||
        "Up To";

    const discount =
        content.discount ??
        "70";

    const offerText =
        content.offerText ||
        "★ On Everything ★";

    const ctaText =
        content.ctaText ||
        "Shop Now";

    const ctaHref =
        content.ctaHref ||
        "/products";

    const mobileImage =
        content.mobileImage ||
        "/images/discountBannerMbll.png";

    const desktopImage =
        content.desktopImage ||
        "/images/discountBanner1.webp";

    const badgeImage =
        content.badgeImage ||
        "/images/discount.webp";

    const imageAlt =
        content.imageAlt ||
        "14 August Independence Day Sale";

    return (
        <section className="relative h-[85vh] min-h-[520px] overflow-hidden lg:h-[82vh] lg:min-h-[560px] xl:min-h-[620px]">
            {/* Mobile Background */}
            <Image
                src={mobileImage}
                alt={imageAlt}
                fill
                priority
                className="object-cover object-center md:hidden"
            />

            {/* Tablet + Desktop Background */}
            <Image
                src={desktopImage}
                alt={imageAlt}
                fill
                priority
                className="hidden object-cover object-center md:block lg:object-right"
            />

            <div className="relative mx-auto flex h-full w-[90%] items-center">
                <div className="mx-auto w-full max-w-md text-center md:mx-0 md:w-[60%] md:max-w-xl lg:w-[45%] lg:max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#001B08] md:text-sm lg:text-base">
                        {eyebrow}
                    </p>

                    <h1 className="mt-3 text-2xl font-bold uppercase leading-tight text-[#001B08] sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
                        {heading}
                    </h1>

                    <h2 className="mt-1 text-2xl font-semibold italic leading-tight text-[#001B08] sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
                        {subheading}
                    </h2>

                    <div className="mt-4 flex items-center justify-center gap-3 xl:mt-6">
                        <span className="h-px w-10 bg-[#E8BB44] md:w-14 lg:w-16 xl:w-20" />

                        <p className="text-sm font-semibold uppercase tracking-widest text-[#001B08] md:text-base">
                            {upToText}
                        </p>

                        <span className="h-px w-10 bg-[#E8BB44] md:w-14 lg:w-16 xl:w-20" />
                    </div>

                    <div className="mt-1 flex items-end justify-center gap-2">
                        <span className="text-7xl font-bold leading-none text-[#001B08] sm:text-8xl md:text-8xl lg:text-8xl xl:text-[130px]">
                            {discount}
                        </span>

                        <div className="mb-1 flex flex-col items-start md:mb-2">
                            <span className="text-4xl font-bold leading-none text-[#001B08] md:text-5xl lg:text-5xl xl:text-6xl">
                                %
                            </span>

                            <span className="text-xl font-bold leading-none text-[#001B08] md:text-2xl lg:text-2xl xl:text-3xl">
                                OFF
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex justify-center">
                        <div className="bg-[#E8BB44] px-5 py-2 md:px-7 lg:px-8 xl:px-9 xl:py-2.5">
                            <p className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-[#001B08] md:text-sm lg:text-sm xl:text-base">
                                {offerText}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center xl:mt-6">
                        <Link
                            href={ctaHref}
                            className="inline-flex items-center gap-3 rounded-md bg-[#001B08] px-6 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08] md:px-8 md:text-base lg:px-8 lg:py-2.5 xl:px-9 xl:py-3"
                        >
                            {ctaText}
                            <span className="text-lg">→</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute right-2 top-3 md:right-3 md:top-5 lg:right-[3%] lg:top-[6%]">
                    <Image
                        src={badgeImage}
                        alt={imageAlt}
                        width={300}
                        height={300}
                        className="h-26 w-26 object-contain sm:h-28 sm:w-28 md:h-50 md:w-50 lg:h-60 lg:w-60 xl:h-70 xl:w-70"
                    />
                </div>
            </div>
        </section>
    );
};

export default BannerDiscount;