import { notFound } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/shared/ProductCard";
import categories from "@/data/categories";
import products from "@/data/products";

const CategoryPage = async ({ params }) => {
    const { category } = await params;

    const categoryInfo = categories?.find(
        (item) => item?.category === category
    );

    if (!categoryInfo) {
        notFound();
    }

    const categoryProducts = products?.filter(
        (product) => product?.category === category
    );

    return (
        <main>
            <PageBanner
                title={categoryInfo?.title}
                description={categoryInfo?.description}
                imageClass={categoryInfo?.imageClass}
            />

            <section className="bg-[#F7F5EF] py-16">
                <div className="mx-auto w-[90%]">
                    <div className="text-center">
                        <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                            {categoryInfo?.subtitle}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                            {categoryInfo?.sectionTitle}
                        </h2>

                        <div className="mt-4 flex justify-center">
                            <span className="h-px w-24 bg-[#001B08]" />
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
                        {categoryProducts?.map((product) => (
                            <ProductCard
                            variant="homepage"
                                key={product?.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CategoryPage;