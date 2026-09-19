
import ProductCard from "@/components/shared/ProductCard";
import ShopCard from "@/components/shared/ShopCard";
import { serverApi } from "@/lib/server";


const SearchPage = async ({ searchParams }) => {
    const params = await searchParams;
    const query = String(params?.q || "").trim();

    let results = {
        products: [],
        shops: [],
        total: 0,
    };

    if (query) {
        try {
            const data = await serverApi.get(
                `/api/search?q=${encodeURIComponent(query)}&limit=50&source=search_page`,
                {},
                {
                    auth: false,
                },
            );

            results = {
                products: Array.isArray(data?.products)
                    ? data.products
                    : [],
                shops: Array.isArray(data?.shops)
                    ? data.shops
                    : [],
                total: Number(data?.total || 0),
            };
        } catch {
            results = {
                products: [],
                shops: [],
                total: 0,
            };
        }
    }

    return (
        <main className="min-h-screen bg-[#F7F5EF] py-12 md:py-16">
            <div className="mx-auto w-[90%] max-w-7xl">
                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44]">
                        Search
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
                        Search Results
                    </h1>

                    {query && (
                        <p className="mt-3 text-[#001B08]/60">
                            {results.total} result
                            {results.total === 1 ? "" : "s"} found for{" "}
                            <span className="font-semibold text-[#001B08]">
                                &quot;{query}&quot;
                            </span>
                        </p>
                    )}
                </div>

                {!query ? (
                    <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-[#001B08]">
                            Start searching
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Use the search box in the navbar to find products and shops.
                        </p>
                    </div>
                ) : results.total === 0 ? (
                    <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-[#001B08]">
                            No Results Found
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            We couldn&apos;t find any products or shops matching
                            &quot;{query}&quot;.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {results.products.length > 0 && (
                            <section>
                                <div className="mb-6 flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E8BB44]">
                                            Products
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-[#001B08]">
                                            Matching Products
                                        </h2>
                                    </div>

                                    <span className="text-sm text-[#001B08]/50">
                                        {results.products.length} found
                                    </span>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {results.products.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {results.shops.length > 0 && (
                            <section>
                                <div className="mb-6 flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E8BB44]">
                                            Shops
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-[#001B08]">
                                            Matching Shops
                                        </h2>
                                    </div>

                                    <span className="text-sm text-[#001B08]/50">
                                        {results.shops.length} found
                                    </span>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {results.shops.map((shop) => (
                                        <ShopCard
                                            key={shop._id}
                                            shop={shop}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default SearchPage;