import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/shared/ProductCard";
import products from "@/data/products";

const AllProductsPage = () => {

    return (
        <main>
            <PageBanner
                title="All Products"
                description="Explore honey, fragrances, mobile accessories and furniture products available at Bazaar E Pak."
                imageClass="bg-[url('/images/all.webp')]"
            />

            <section className="bg-[#F7F5EF] py-16">
                <div className="mx-auto w-[90%]">
                    {/* Section Heading */}
                    <div className="text-center">
                        <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                            Explore Our Collection
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                            All Products
                        </h2>

                        <div className="mt-4 flex justify-center">
                            <span className="h-px w-24 bg-[#001B08]" />
                        </div>
                    </div>

                    {/* Product Cards */}
                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
                        {products.map((product) => (
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

export default AllProductsPage;