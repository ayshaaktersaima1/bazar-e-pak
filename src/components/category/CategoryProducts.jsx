"use client";

import { useProduct } from "@/hooks/use-product";
import ProductCard from "../shared/ProductCard";

const CategoryProducts = ({ categoryId }) => {
    const {
        getProductsByCategory,
        loading,
    } = useProduct();

    if (loading) {
        return (
            <div className="py-12 text-center">
                <p className="text-sm text-[#667085]">
                    Loading products...
                </p>
            </div>
        );
    }

    const categoryProducts = categoryId
        ? getProductsByCategory(categoryId)
        : [];

    return (
        <div className="mt-10">
            {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
                    {categoryProducts.map((product) => (
                        <ProductCard
                            variant="homepage"
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <p className="text-sm text-[#667085]">
                        No products found in this category.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CategoryProducts;