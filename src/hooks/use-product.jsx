"use client";

import { createContext, useContext } from "react";
import products from "@/data/products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const getProductById = (productId) => {
        return products.find(
            (product) => product.id === Number(productId)
        );
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                getProductById,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error(
            "useProduct must be used inside ProductProvider"
        );
    }

    return context;
};

export default ProductContext;