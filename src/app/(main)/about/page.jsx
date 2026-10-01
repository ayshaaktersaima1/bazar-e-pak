import Image from "next/image";
import { serverApi } from "@/lib/server.js";

const AboutPage = async () => {
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

    const aboutContent = cmsContent.find(
        (item) => item.key === "about.page",
    );

    const content = aboutContent?.content || {};

    const eyebrow = content.eyebrow || "Our Story";

    const heading =
        content.heading ||
        "Trusted by Thousands, Chosen for Quality";

    const paragraphs =
        Array.isArray(content.paragraphs) &&
            content.paragraphs.length > 0
            ? content.paragraphs
            : [
                "Bazaar E Pak was founded with a simple mission — to bring high-quality, original and premium products to our customers at the best possible prices.",
                "From 100% pure honey to long-lasting fragrances, reliable mobile accessories and stylish furniture, we carefully select every product to ensure quality and customer satisfaction.",
                "Your trust motivates us to keep improving and delivering excellence every day.",
            ];

    const image =
        content.image || "/images/aboutUs.webp";

    return (
        <main className="bg-[#F7F5EF] py-16">
            <section className="mx-auto grid w-[90%] items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="overflow-hidden rounded-xl shadow-md">
                    <Image
                        src={image}
                        alt="Bazaar E Pak store"
                        width={800}
                        height={650}
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>

                <div>
                    <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                        {eyebrow}
                    </p>

                    <h1 className="mt-2 text-3xl font-bold leading-tight text-[#001B08] md:text-4xl lg:text-5xl">
                        {heading}
                    </h1>

                    <div className="my-5 flex items-center gap-3">
                        <span className="h-px w-26 bg-[#001B08]" />
                    </div>

                    <div className="space-y-5 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                        {paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;