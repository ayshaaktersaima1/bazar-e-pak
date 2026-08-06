import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/shared/ProductCard";
import products from "@/data/products";

const FurniturePage = () => {

    const furnitureProducts = products.filter(
        (product) => product.category === "furniture"
    );
    return (
        <main>
            <PageBanner
                title="Best Furniture"
                description="Explore practical and comfortable furniture for offices, classrooms and study spaces."
                imageClass="bg-[url('/images/furniture-page-banner.webp')]"
            />

            <section className="bg-[#F7F5EF] py-16">
                <div className="mx-auto w-[90%]">
                    {/* Section Heading */}
                    <div className="text-center">
                        <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                            Comfortable and Reliable
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                            Furniture Products
                        </h2>

                        <div className="mt-4 flex justify-center">
                            <span className="h-px w-24 bg-[#001B08]" />
                        </div>
                    </div>

                    {/* Product Cards */}
                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
                        {furnitureProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FurniturePage;