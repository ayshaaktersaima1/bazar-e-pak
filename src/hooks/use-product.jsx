"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(
                `${baseUrl}/api/products`,
                {
                    cache: "no-store",
                }
            );

            const data = await res.json();

            if (data.success) {
                setProducts(data.data || []);
            }

            setLoading(false);
        };

        fetchProducts();
    }, [baseUrl]);

    const getProductById = (productId) => {
        return products.find(
            (product) => product._id === productId
        );
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
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