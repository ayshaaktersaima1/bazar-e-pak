import Link from "next/link";
import {
    FaArrowLeft,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhone,
    FaStar,
    FaStore,
} from "react-icons/fa";



import shops from "@/data/shops";
import products from "@/data/products";
import ProductCard from "../../../../components/shared/ProductCard";
import ShopCard from "../../../../components/shared/ShopCard";

const ShopDetailsPage = async ({ params }) => {
    const { id } = await params;

    const shop = shops.find((item) => item.id === Number(id));

    if (!shop) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F7F5EF] px-5">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Shop Not Found
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                        This shop does not exist
                    </h1>

                    <Link
                        href="/shops"
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#001B08] px-5 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
                    >
                        <FaArrowLeft />
                        Back to Shops
                    </Link>
                </div>
            </main>
        );
    }

    const shopProducts = products.filter(
        (product) => product.shopId === shop.id,
    );

    return (
        <main className="min-h-screen bg-[#F7F5EF]">
            {/* Shop Hero */}
            <section className="bg-[#001B08] py-12 md:py-16">
                <div className="mx-auto w-[90%]">
                    <Link
                        href="/shops"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition duration-300 hover:text-[#E8BB44]"
                    >
                        <FaArrowLeft />
                        Back to Shops
                    </Link>

                    <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        {/* Shop Image */}
                        <div className="overflow-hidden rounded-2xl bg-[#F7F5EF]">
                            <img
                                src={shop.image}
                                alt={shop.name}
                                className="h-64 w-full object-cover md:h-80 lg:h-96"
                            />
                        </div>

                        {/* Shop Information */}
                        <div className="text-white">
                            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                                <FaStore />
                                {shop.category}
                            </div>

                            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                                {shop.name}
                            </h1>

                            <div className="mt-5 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 rounded-full bg-[#E8BB44] px-3 py-1.5 text-sm font-bold text-[#001B08]">
                                    <FaStar />
                                    {shop.rating}
                                </div>

                                <span className="text-sm text-gray-300">
                                    {shop.totalReviews} Reviews
                                </span>

                                <span className="text-sm text-gray-300">
                                    {shopProducts.length} Products
                                </span>
                            </div>

                            <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                                {shop.description}
                            </p>

                            <div className="mt-7 grid gap-4 text-sm text-gray-300 sm:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <FaStore className="mt-1 shrink-0 text-[#E8BB44]" />
                                    <div>
                                        <p className="font-semibold text-white">
                                            Owner
                                        </p>
                                        <p className="mt-1">{shop.owner}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="mt-1 shrink-0 text-[#E8BB44]" />
                                    <div>
                                        <p className="font-semibold text-white">
                                            Location
                                        </p>
                                        <p className="mt-1">{shop.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FaPhone className="mt-1 shrink-0 text-[#E8BB44]" />
                                    <div>
                                        <p className="font-semibold text-white">
                                            Phone
                                        </p>
                                        <p className="mt-1">{shop.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FaEnvelope className="mt-1 shrink-0 text-[#E8BB44]" />
                                    <div>
                                        <p className="font-semibold text-white">
                                            Email
                                        </p>
                                        <p className="mt-1 break-all">
                                            {shop.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="py-16">
                <div className="mx-auto w-[90%]">
                    {/* Section Heading */}
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44]">
                            Shop Collection
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                            Products from {shop.name}
                        </h2>

                        <div className="mt-5 flex items-center justify-center gap-3">
                            <span className="h-px w-14 bg-[#001B08]" />
                            <span className="text-[#E8BB44]">★</span>
                            <span className="h-px w-14 bg-[#001B08]" />
                        </div>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500">
                            Explore the complete collection of products
                            available from {shop.name}.
                        </p>
                    </div>

                    {/* Product Grid */}
                    {shopProducts.length > 0 ? (
                        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {shopProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 rounded-xl bg-white p-10 text-center shadow-sm">
                            <FaStore className="mx-auto text-3xl text-[#E8BB44]" />

                            <h3 className="mt-4 text-xl font-bold text-[#001B08]">
                                No Products Available
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                This shop has not added any products yet.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            
        </main>
    );
};

export default ShopDetailsPage;