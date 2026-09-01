import Link from "next/link";
import {
    FaHeadset,
    FaMicrophone,
    FaShieldAlt,
    FaUsers,
} from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";

const features = [
    {
        id: 1,
        title: "Trusted Sellers",
        description: "Verified and reliable sellers you can trust.",
        icon: FaUsers,
    },
    {
        id: 2,
        title: "Best Prices",
        description: "Competitive prices on all products.",
        icon: MdOutlineAttachMoney,
    },
    {
        id: 3,
        title: "Safe & Secure",
        description: "Your data and payments are fully protected.",
        icon: FaShieldAlt,
    },
    {
        id: 4,
        title: "Customer First",
        description: "Your satisfaction is always our priority.",
        icon: FaHeadset,
    },
];

const WhyChooseUs = () => {
    return (
        <section className="bg-[#F7F5EF] py-16">
            <div className="mx-auto grid w-[90%] items-center gap-20 lg:grid-cols-2">
                {/* Left Content */}
                <div>
                    <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Why Choose Us
                    </p>

                    <h2 className="mt-2 text-3xl font-bold leading-tight text-[#001B08] md:text-4xl">
                        Why Choose <span className="text-[#E8BB44]">
                            Bazaar E Pak?
                        </span>
                    </h2>

                    <div className="my-5 flex items-center gap-3">
                        <span className="h-px w-14 bg-[#E8BB44]" />

                    </div>

                    <p className="text-base leading-7 text-gray-600 md:text-lg">
                        We bring you quality products from trusted sellers
                        across Pakistan. Our goal is to provide convenience,
                        reliability and trust with every order.
                    </p>

                    <Link
                        href="/about"
                        className="mt-7 inline-flex rounded-md border border-[#001B08] px-5 py-3 font-semibold text-[#001B08] transition duration-300 hover:bg-[#001B08] hover:text-white"
                    >
                        Learn More About Us
                    </Link>
                </div>

                {/* Feature Box */}
                <div className="overflow-hidden rounded-xl bg-[#001B08] ">
                    <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.id}
                                    className={`flex flex-col items-center px-6 py-10 text-center
    ${index !== features.length - 1
                                            ? "border-b border-[#E8BB44]/30"
                                            : ""
                                        }
    ${index >= 2 ? "md:border-b-0" : ""}
    ${index % 2 === 0
                                            ? "md:border-r md:border-[#E8BB44]/30"
                                            : ""
                                        }
`}
                                >
                                    <Icon className="text-3xl text-[#E8BB44]" />

                                    <h3 className="mt-4 text-lg font-bold text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 max-w-64 text-sm leading-6 text-gray-300 md:text-base">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;