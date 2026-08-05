import Image from "next/image";
import Link from "next/link";
import {
    FaArrowRight,
    FaChair,
    FaHeadphones,
    FaPumpSoap,
} from "react-icons/fa";
import { GiHoneyJar } from "react-icons/gi";

const categories = [
    {
        id: 1,
        title: "Pure Forest Honey",
        description: "Berry Honey, Acacia Honey and more",
        image: "/images/b1.webp",
        href: "/products/honey",
        icon: GiHoneyJar,
    },
    {
        id: 2,
        title: "Mehak Collection",
        description: "Body Spray, Perfumes and Pen Perfume",
        image: "/images/b1.webp",
        href: "/products/mehak-collection",
        icon: FaPumpSoap,
    },
    {
        id: 3,
        title: "Mobile Accessories",
        description: "Chargers, Headphones, Power Bank and more",
        image: "/images/b1.webp",
        href: "/products/mobile-accessories",
        icon: FaHeadphones,
    },
    {
        id: 4,
        title: "Best Furniture",
        description: "Office Table, Chairs, Sofa and more",
        image: "/images/b1.webp",
        href: "/products/furniture",
        icon: FaChair,
    },
];

const Categories = () => {
    return (
        <section className="bg-[#F7F5EF] py-16">
            <div className="mx-auto w-[90%]">
                {/* Section Heading */}
                <div className="text-center">
                    <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Explore Our Categories
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                        Shop By Category
                    </h2>

                    <div className="mt-4 flex justify-center">
                        <span className="h-px w-24 bg-[#001B08]" />
                    </div>
                </div>

                {/* Category Cards */}
                {/* Category Cards */}
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-8">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <div
                                key={category.id}
                                className="relative flex flex-col rounded-xl bg-white p-3 shadow-md transition duration-300 hover:-translate-y-2"
                            >
                                {/* Category Icon */}
                                <div className="absolute -top-8 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-[#001B08] text-2xl text-[#E8BB44] lg:-top-7 lg:h-14 lg:w-14 lg:text-xl xl:-top-8 xl:h-16 xl:w-16 xl:text-2xl">
                                    <Icon />
                                </div>

                                {/* Category Image */}
                                <div className="overflow-hidden rounded-lg">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        width={500}
                                        height={400}
                                        className="h-56 w-full object-cover transition duration-500 hover:scale-105 lg:h-44 xl:h-56"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col px-3 pb-4 pt-5 text-center lg:px-1 lg:pt-4 xl:px-3 xl:pt-5">
                                    <h3 className="text-xl font-bold text-[#001B08] lg:text-base xl:text-xl">
                                        {category.title}
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-60 text-base leading-6 text-gray-600 lg:text-sm lg:leading-5 xl:text-base xl:leading-6">
                                        {category.description}
                                    </p>

                                    <Link
                                        href={category.href}
                                        className="mx-auto mt-5 inline-flex items-center gap-2 rounded-md bg-[#001B08] px-5 py-2.5 text-base font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08] lg:px-4 lg:py-2 lg:text-sm xl:px-5 xl:py-2.5 xl:text-base"
                                    >
                                        Shop Now
                                        <FaArrowRight className="text-sm" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;