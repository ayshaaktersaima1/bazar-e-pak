import Image from "next/image";

const AboutPage = () => {
    return (
        <main className="bg-[#F7F5EF] py-16">
            <section className="mx-auto grid w-[90%] items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Left Image */}
                <div className="overflow-hidden rounded-xl shadow-md">
                    <Image
                        src="/images/aboutUs.webp"
                        alt="Bazaar E Pak store"
                        width={800}
                        height={650}
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>

                {/* Right Content */}
                <div>
                    <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Our Story
                    </p>

                    <h1 className="mt-2 text-3xl font-bold leading-tight text-[#001B08] md:text-4xl lg:text-5xl">
                        Trusted by Thousands,
                        <br />
                        Chosen for Quality
                    </h1>

                    <div className="my-5 flex items-center gap-3">
                        <span className="h-px w-26 bg-[#001B08]" />

                    </div>

                    <div className="space-y-5 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                        <p>
                            Bazaar E Pak was founded with a simple mission — to
                            bring high-quality, original and premium products to
                            our customers at the best possible prices.
                        </p>

                        <p>
                            From 100% pure honey to long-lasting fragrances,
                            reliable mobile accessories and stylish furniture,
                            we carefully select every product to ensure quality
                            and customer satisfaction.
                        </p>

                        <p>
                            Your trust motivates us to keep improving and
                            delivering excellence every day.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;