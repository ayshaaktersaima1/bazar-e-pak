"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/categories`, {
                method: "GET",
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to fetch categories"
                );
            }

            setCategories(data.data || []);

            return data.data || [];
        } catch (error) {
            console.error("Fetch categories error:", error);

            setCategories([]);

            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadCategories = async () => {
            await fetchCategories();
        };

        loadCategories();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                loading,
                fetchCategories,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CategoryContext);

    if (!context) {
        throw new Error("useCategory must be used inside CategoryProvider");
    }

    return context;
};

export default CategoryContext;