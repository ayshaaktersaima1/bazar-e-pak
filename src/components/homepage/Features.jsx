import {
    FaHeadset,
    FaShieldAlt,
    FaTruck,
} from "react-icons/fa";
import { FaAward, FaCreditCard } from "react-icons/fa6";

const features = [
    {
        id: 1,
        title: "100% Trusted",
        description: "Verified products and trusted sellers.",
        icon: FaShieldAlt,
    },
    {
        id: 2,
        title: "Premium Quality",
        description: "Best quality products at reasonable prices.",
        icon: FaAward,
    },
    {
        id: 3,
        title: "Fast Delivery",
        description: "Quick and safe delivery across Pakistan.",
        icon: FaTruck,
    },
    {
        id: 4,
        title: "Secure Shopping",
        description: "Safe payments and secure transactions.",
        icon: FaCreditCard,
    },
    {
        id: 5,
        title: "Customer Support",
        description: "We are here to help you whenever needed.",
        icon: FaHeadset,
    },
];

const Features = () => {
    return (
        <section className="hidden lg:block bg-[#F7F5EF] py-10">
            <div className="mx-auto grid w-[90%] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3 xl:gap-8">
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={feature.id}
                            className="flex flex-col items-center px-4 text-center lg:px-1 xl:px-4"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#001B08] text-2xl text-[#E8BB44]">
                                <Icon />
                            </div>

                            <h3 className="mt-4 text-base font-bold uppercase text-[#001B08] lg:whitespace-nowrap lg:text-sm xl:text-lg">
                                {feature.title}
                            </h3>

                            <p className="mt-2 max-w-48 text-sm leading-6 text-gray-600 ">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Features;