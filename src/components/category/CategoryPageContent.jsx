import PageBanner from "../PageBanner";
import CategoryProducts from "./CategoryProducts";


const CategoryPageContent = ({ category, categoryInfo }) => {
    return (
        <main>
            <PageBanner
                title={categoryInfo?.name}
                description={categoryInfo?.description}
                imageClass={categoryInfo?.image}
            />

            <section className="bg-[#F7F5EF] py-16">
                <div className="mx-auto w-[90%]">
                    <div className="text-center">
                        <p className="text-base font-semibold uppercase tracking-widest text-[#E8BB44]">
                            {categoryInfo?.name}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                            {categoryInfo?.name}
                        </h2>

                        <div className="mt-4 flex justify-center">
                            <span className="h-px w-24 bg-[#001B08]" />
                        </div>
                    </div>

                    <CategoryProducts categorySlug={category} />
                </div>
            </section>
        </main>
    );
};

export default CategoryPageContent;