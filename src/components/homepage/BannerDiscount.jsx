import Image from "next/image";
import Link from "next/link";

const BannerDiscount = () => {
    return (
        <section className="relative h-[85vh] min-h-[520px] overflow-hidden lg:h-[82vh] lg:min-h-[560px] xl:min-h-[620px]">
            {/* Mobile Background */}
            <Image
                src="/images/discountBannerMbll.png"
                alt="14 August Independence Day Sale"
                fill
                priority
                className="object-cover object-center md:hidden"
            />

            {/* Tablet + Desktop Background */}
            <Image
                src="/images/discountBanner1.webp"
                alt="14 August Independence Day Sale"
                fill
                priority
                className="hidden object-cover object-center md:block lg:object-right"
            />

            {/* Content */}
            <div className="relative mx-auto flex h-full w-[90%] items-center">
                {/* Left Content */}
                <div className="mx-auto w-full max-w-md text-center md:mx-0 md:w-[60%] md:max-w-xl lg:w-[45%] lg:max-w-xl">

                    <p className="text-xs font-semibold uppercase tracking-widest text-[#001B08] md:text-sm lg:text-base">
                        14 August Independence Day Sale
                    </p>

                    {/* Main Heading */}
                    <h1 className="mt-3 text-2xl font-bold uppercase leading-tight text-[#001B08] sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
                        Celebrate Freedom
                    </h1>

                    {/* Secondary Heading */}
                    <h2 className="mt-1 text-2xl font-semibold italic leading-tight text-[#001B08] sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
                        Celebrate Savings!
                    </h2>

                    {/* Up To */}
                    <div className="mt-4 flex items-center justify-center gap-3 xl:mt-6">
                        <span className="h-px w-10 bg-[#E8BB44] md:w-14 lg:w-16 xl:w-20" />

                        <p className="text-sm font-semibold uppercase tracking-widest text-[#001B08] md:text-base">
                            Up To
                        </p>

                        <span className="h-px w-10 bg-[#E8BB44] md:w-14 lg:w-16 xl:w-20" />
                    </div>

                    {/* Discount */}
                    <div className="mt-1 flex items-end justify-center gap-2">
                        <span className="text-7xl font-bold leading-none text-[#001B08] sm:text-8xl md:text-8xl lg:text-8xl xl:text-[130px]">
                            70
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

                    {/* Offer */}
                    <div className="mt-3 flex justify-center">
                        <div className="bg-[#E8BB44] px-5 py-2 md:px-7 lg:px-8 xl:px-9 xl:py-2.5">
                            <p className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-[#001B08] md:text-sm lg:text-sm xl:text-base">
                                ★ On Everything ★
                            </p>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="mt-4 flex justify-center xl:mt-6">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-3 rounded-md bg-[#001B08] px-6 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08] md:px-8 md:text-base lg:px-8 lg:py-2.5 xl:px-9 xl:py-3"
                        >
                            Shop Now
                            <span className="text-lg">→</span>
                        </Link>
                    </div>
                </div>

                {/* Badge */}
                <div className="absolute right-2 top-3 md:right-3 md:top-5 lg:right-[3%] lg:top-[6%]">
                    <Image
                        src="/images/discount.webp"
                        alt="Limited Time Only 14 August Mega Deals"
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