import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/shared/ProductCard";
import products from "@/data/products";



const HoneyPage = () => {

    const honeyProducts = products.filter(
        (product) => product.category === "honey"
    );
    return (
        <main>
            <PageBanner
                title="Pure Forest Honey"
                description="Discover our natural Berry Honey and Acacia Honey, carefully selected for rich taste and premium quality."
                imageClass="bg-[url('/images/p1Honey.webp')]"
            />

            <section className="bg-[#F7F5EF] py-16">
                <div className="mx-auto w-[90%]">
                    <div className="text-center">
                        <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                            Pure and Natural
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                            Honey Products
                        </h2>

                        <div className="mt-4 flex justify-center">
                            <span className="h-px w-24 bg-[#001B08]" />
                        </div>
                    </div>

                    <div className="mt-10 grid gap-8 lg:gap-5 xl:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {honeyProducts.map((product) => (
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

export default HoneyPage;