"use client";

import {
    createContext,
    useContext,
    useState,
} from "react";
import toast from "react-hot-toast";
import useApi from "./use-api";

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
    const api = useApi();

    const [shops, setShops] = useState([]);
    const [myShop, setMyShop] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchShops = async (params = {}) => {
        try {
            setLoading(true);

            const query = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                ) {
                    query.set(key, String(value));
                }
            });

            const queryString = query.toString();

            const response = await api.get(
                `/api/shops${queryString ? `?${queryString}` : ""}`,
                {},
                {
                    auth: true,
                    showError: false,
                },
            );

            const shopList = Array.isArray(response)
                ? response
                : Array.isArray(response?.data)
                  ? response.data
                  : [];

            setShops(shopList);

            return shopList;
        } catch (error) {
            console.error("Fetch shops error:", error);
            setShops([]);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchMyShop = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                "/api/shops/my-shop",
                {},
                {
                    auth: true,
                    showError: false,
                },
            );

            const shop =
                response?.data?.shop ||
                response?.data ||
                response?.shop ||
                null;

            setMyShop(shop);

            if (shop) {
                setShops((prev) => {
                    const exists = prev.some(
                        (item) =>
                            String(item._id) ===
                            String(shop._id),
                    );

                    if (exists) {
                        return prev.map((item) =>
                            String(item._id) ===
                            String(shop._id)
                                ? shop
                                : item,
                        );
                    }

                    return [shop, ...prev];
                });
            }

            return shop;
        } catch (error) {
            console.error("Fetch my shop error:", error);
            setMyShop(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchShopById = async (shopId) => {
        if (!shopId) return null;

        try {
            const response = await api.get(
                `/api/shops/${shopId}`,
                {},
                {
                    auth: true,
                    showError: false,
                },
            );

            return response?.data || response || null;
        } catch (error) {
            console.error("Fetch shop error:", error);
            return null;
        }
    };

    const fetchShopBySlug = async (slug) => {
        if (!slug) return null;

        try {
            const response = await api.get(
                `/api/shops/slug/${encodeURIComponent(slug)}`,
                {},
                {
                    auth: false,
                    showError: false,
                },
            );

            return response?.data || response || null;
        } catch (error) {
            console.error(
                "Fetch shop by slug error:",
                error,
            );

            return null;
        }
    };

    const getShopById = (shopId) => {
        if (!shopId) return null;

        return shops.find(
            (shop) =>
                String(shop._id) === String(shopId),
        ) || null;
    };

    const getShopBySlug = (slug) => {
        if (!slug) return null;

        return shops.find(
            (shop) => shop.slug === slug,
        ) || null;
    };

    const getShopProducts = (
        shopId,
        products = [],
    ) => {
        if (!shopId) return [];

        return products.filter(
            (product) =>
                String(product.shopId) ===
                String(shopId),
        );
    };

    const createShop = async (shopData) => {
        try {
            setActionLoading(true);

            const response = await api.post(
                "/api/shops",
                shopData,
                {},
                {
                    auth: true,
                    showSuccess: true,
                    successMessage:
                        "Shop created successfully.",
                },
            );

            const newShop =
                response?.data || response;

            if (newShop) {
                setMyShop(newShop);

                setShops((prev) => [
                    newShop,
                    ...prev.filter(
                        (shop) =>
                            String(shop._id) !==
                            String(newShop._id),
                    ),
                ]);
            }

            return newShop || null;
        } catch (error) {
            console.error(
                "Create shop error:",
                error,
            );

            return null;
        } finally {
            setActionLoading(false);
        }
    };

    const updateShop = async (
        shopId,
        shopData,
    ) => {
        if (!shopId) return null;

        try {
            setActionLoading(true);

            const response = await api.patch(
                `/api/shops/${shopId}`,
                shopData,
                {},
                {
                    auth: true,
                    showSuccess: true,
                    successMessage:
                        "Shop updated successfully.",
                },
            );

            const updatedShop =
                response?.data || response;

            if (updatedShop) {
                setMyShop((prev) =>
                    prev &&
                    String(prev._id) ===
                        String(shopId)
                        ? {
                              ...prev,
                              ...updatedShop,
                          }
                        : updatedShop,
                );

                setShops((prev) =>
                    prev.map((shop) =>
                        String(shop._id) ===
                        String(shopId)
                            ? {
                                  ...shop,
                                  ...updatedShop,
                              }
                            : shop,
                    ),
                );
            }

            return updatedShop || null;
        } catch (error) {
            console.error(
                "Update shop error:",
                error,
            );

            return null;
        } finally {
            setActionLoading(false);
        }
    };

    const deleteShop = async (shopId) => {
        if (!shopId) return false;

        try {
            setActionLoading(true);

            await api.delete(
                `/api/shops/${shopId}`,
                {},
                {
                    auth: true,
                    showSuccess: true,
                    successMessage:
                        "Shop deleted successfully.",
                },
            );

            setShops((prev) =>
                prev.filter(
                    (shop) =>
                        String(shop._id) !==
                        String(shopId),
                ),
            );

            setMyShop((prev) =>
                prev &&
                String(prev._id) ===
                    String(shopId)
                    ? null
                    : prev,
            );

            return true;
        } catch (error) {
            console.error(
                "Delete shop error:",
                error,
            );

            return false;
        } finally {
            setActionLoading(false);
        }
    };

    const updateShopStatus = async (
        shopId,
        status,
    ) => {
        if (!shopId || !status) return null;

        try {
            setActionLoading(true);

            const response = await api.patch(
                `/api/shops/${shopId}/status`,
                { status },
                {},
                {
                    auth: true,
                    showSuccess: true,
                    successMessage:
                        "Shop status updated successfully.",
                },
            );

            const updatedShop =
                response?.data || response;

            if (updatedShop) {
                setMyShop((prev) =>
                    prev &&
                    String(prev._id) ===
                        String(shopId)
                        ? {
                              ...prev,
                              ...updatedShop,
                          }
                        : prev,
                );

                setShops((prev) =>
                    prev.map((shop) =>
                        String(shop._id) ===
                        String(shopId)
                            ? {
                                  ...shop,
                                  ...updatedShop,
                              }
                            : shop,
                    ),
                );
            }

            return updatedShop || null;
        } catch (error) {
            console.error(
                "Update shop status error:",
                error,
            );

            return null;
        } finally {
            setActionLoading(false);
        }
    };

    const refreshShops = async (
        params = {},
    ) => {
        return fetchShops(params);
    };

    const refreshMyShop = async () => {
        return fetchMyShop();
    };

    return (
        <ShopContext.Provider
            value={{
                shops,
                myShop,
                loading,
                actionLoading,

                fetchShops,
                refreshShops,

                fetchMyShop,
                refreshMyShop,

                fetchShopById,
                fetchShopBySlug,

                getShopById,
                getShopBySlug,
                getShopProducts,

                createShop,
                updateShop,
                deleteShop,
                updateShopStatus,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error(
            "useShop must be used inside ShopProvider",
        );
    }

    return context;
};

export default ShopContext;