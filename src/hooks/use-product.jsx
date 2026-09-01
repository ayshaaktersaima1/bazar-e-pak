"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { data: session } = useSession();

  const getToken = () => {
    return session?.session?.token || session?.token || null;
  };

  const request = async (endpoint, options = {}, requiresAuth = false) => {
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_SERVER_URL is not configured");
    }

    const token = getToken();

    if (requiresAuth && !token) {
      throw new Error("Authentication required");
    }

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (requiresAuth) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}/api/products${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  };

  const fetchProducts = async (query = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const queryString = params.toString();

      const data = await request(queryString ? `?${queryString}` : "");

      setProducts(data.data || []);

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        if (!baseUrl) {
          throw new Error("NEXT_PUBLIC_SERVER_URL is not configured");
        }

        const response = await fetch(`${baseUrl}/api/products`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (!cancelled && response.ok && data.success) {
          setProducts(data.data || []);
          setError(null);
          setLoading(false);
        } else if (!cancelled) {
          setError(data.message || "Failed to fetch products");
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.message || "Failed to fetch products");
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  const getProductById = async (productId) => {
    const data = await request(`/${productId}`);

    return data.data;
  };

  const getProductFromState = (productId) => {
    return products.find((product) => product._id === productId);
  };

  const createProduct = async (productData) => {
    const data = await request(
      "",
      {
        method: "POST",
        body: JSON.stringify(productData),
      },
      true,
    );

    const product = data.data;

    setProducts((current) => [product, ...current]);

    return product;
  };

  const updateProduct = async (productId, productData) => {
    const data = await request(
      `/${productId}`,
      {
        method: "PATCH",
        body: JSON.stringify(productData),
      },
      true,
    );

    const updatedProduct = data.data;

    setProducts((current) =>
      current.map((product) =>
        product._id === productId ? updatedProduct : product,
      ),
    );

    return updatedProduct;
  };

  const deleteProduct = async (productId) => {
    const data = await request(
      `/${productId}`,
      {
        method: "DELETE",
      },
      true,
    );

    setProducts((current) =>
      current.filter((product) => product._id !== productId),
    );

    return data;
  };

  const getProductsByShop = (shopId) => {
    return products.filter(
      (product) => String(product.shopId) === String(shopId),
    );
  };

  const getProductsByCategory = (categoryId) => {
    return products.filter(
      (product) => String(product.categoryId) === String(categoryId),
    );
  };

  const getFeaturedProducts = () => {
    return products.filter((product) => product.isFeatured === true);
  };

  const getBestSellingProducts = () => {
    return [...products].sort((a, b) => {
      const salesA = a.purchaseCount || 0;
      const salesB = b.purchaseCount || 0;

      if (salesB !== salesA) {
        return salesB - salesA;
      }

      const ratingA = a.averageRating || 0;
      const ratingB = b.averageRating || 0;

      return ratingB - ratingA;
    });
  };

  const searchProducts = async (search, options = {}) => {
    return fetchProducts({
      ...options,
      search,
    });
  };

  const filterProducts = async (filters = {}) => {
    return fetchProducts(filters);
  };

  const refreshProducts = async (query = {}) => {
    return fetchProducts(query);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,

        fetchProducts,
        refreshProducts,

        getProductById,
        getProductFromState,

        createProduct,
        updateProduct,
        deleteProduct,

        searchProducts,
        filterProducts,

        getProductsByShop,
        getProductsByCategory,

        getFeaturedProducts,
        getBestSellingProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used inside ProductProvider");
  }

  return context;
};

export default ProductContext;
