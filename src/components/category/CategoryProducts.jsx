"use client";

import { useProduct } from "@/hooks/use-product";
import ProductCard from "../shared/ProductCard";


const CategoryProducts = ({ category }) => {
    const { products } = useProduct();

    const categoryProducts = products?.filter(
        (product) => product?.category === category
    );

    return (
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
            {categoryProducts?.map((product) => (
                <ProductCard
                    variant="homepage"
                    key={product?._id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default CategoryProducts;