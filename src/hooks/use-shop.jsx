"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const getAuthHeaders = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        return null;
      }

      return {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData.token}`,
      };
    } catch {
      return null;
    }
  };

  const getResponseData = async (response, fallbackMessage) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      throw new Error(data.message || fallbackMessage);
    }

    return data;
  };

  const fetchShops = async (params = {}) => {
    if (!baseUrl) {
      setLoading(false);
      setShops([]);
      return [];
    }

    try {
      setLoading(true);

      const query = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.set(key, String(value));
        }
      });

      const queryString = query.toString();

      const response = await fetch(
        `${baseUrl}/api/shops${queryString ? `?${queryString}` : ""}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await getResponseData(response, "Failed to fetch shops");

      const shopList = data.data || [];

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

  useEffect(() => {
    if (!baseUrl) {
      setTimeout(() => setLoading(false));
      return;
    }

    let cancelled = false;

    const loadShops = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/shops`, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json().catch(() => ({}));

        if (!cancelled && response.ok && data.success) {
          setShops(data.data || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Fetch shops error:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadShops();

    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  const fetchShopById = async (shopId) => {
    if (!shopId || !baseUrl) {
      return null;
    }

    try {
      const response = await fetch(`${baseUrl}/api/shops/${shopId}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await getResponseData(response, "Failed to fetch shop");

      return data.data || null;
    } catch (error) {
      console.error("Fetch shop by ID error:", error);

      return null;
    }
  };

  const fetchShopBySlug = async (slug) => {
    if (!slug || !baseUrl) {
      return null;
    }

    try {
      const response = await fetch(`${baseUrl}/api/shops/slug/${slug}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await getResponseData(response, "Failed to fetch shop");

      return data.data || null;
    } catch (error) {
      console.error("Fetch shop by slug error:", error);

      return null;
    }
  };

  const getShopById = (shopId) => {
    return shops.find((shop) => String(shop._id) === String(shopId));
  };

  const getShopBySlug = (slug) => {
    return shops.find((shop) => shop.slug === slug);
  };

  const getShopProducts = (shopId, products = []) => {
    return products.filter(
      (product) => String(product.shopId) === String(shopId),
    );
  };

  const createShop = async (shopData) => {
    if (!baseUrl) {
      return false;
    }

    try {
      setActionLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        toast.error("Please log in to create a shop.");

        return false;
      }

      const response = await fetch(`${baseUrl}/api/shops`, {
        method: "POST",
        headers,
        body: JSON.stringify(shopData),
      });

      const data = await getResponseData(response, "Failed to create shop");

      const newShop = data.data;

      setShops((prev) => [newShop, ...prev]);

      toast.success("Shop created successfully.");

      return newShop;
    } catch (error) {
      console.error("Create shop error:", error);

      toast.error(error.message || "Failed to create shop.");

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updateShop = async (shopId, shopData) => {
    if (!shopId || !baseUrl) {
      return false;
    }

    try {
      setActionLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        toast.error("Please log in to update the shop.");

        return false;
      }

      const response = await fetch(`${baseUrl}/api/shops/${shopId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(shopData),
      });

      const data = await getResponseData(response, "Failed to update shop");

      const updatedShop = data.data;

      setShops((prev) =>
        prev.map((shop) =>
          String(shop._id) === String(shopId) ? updatedShop : shop,
        ),
      );

      toast.success("Shop updated successfully.");

      return updatedShop;
    } catch (error) {
      console.error("Update shop error:", error);

      toast.error(error.message || "Failed to update shop.");

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteShop = async (shopId) => {
    if (!shopId || !baseUrl) {
      return false;
    }

    try {
      setActionLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        toast.error("Please log in to delete the shop.");

        return false;
      }

      const response = await fetch(`${baseUrl}/api/shops/${shopId}`, {
        method: "DELETE",
        headers,
      });

      await getResponseData(response, "Failed to delete shop");

      setShops((prev) =>
        prev.filter((shop) => String(shop._id) !== String(shopId)),
      );

      toast.success("Shop deleted successfully.");

      return true;
    } catch (error) {
      console.error("Delete shop error:", error);

      toast.error(error.message || "Failed to delete shop.");

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updateShopStatus = async (shopId, status) => {
    if (!shopId || !status || !baseUrl) {
      return false;
    }

    try {
      setActionLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        toast.error("Please log in to update shop status.");

        return false;
      }

      const response = await fetch(`${baseUrl}/api/shops/${shopId}/status`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          status,
        }),
      });

      const data = await getResponseData(
        response,
        "Failed to update shop status",
      );

      const updatedShop = data.data;

      setShops((prev) =>
        prev.map((shop) =>
          String(shop._id) === String(shopId)
            ? {
                ...shop,
                ...updatedShop,
              }
            : shop,
        ),
      );

      toast.success("Shop status updated successfully.");

      return updatedShop;
    } catch (error) {
      console.error("Update shop status error:", error);

      toast.error(error.message || "Failed to update shop status.");

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const refreshShops = async (params = {}) => {
    return fetchShops(params);
  };

  return (
    <ShopContext.Provider
      value={{
        shops,
        loading,
        actionLoading,

        fetchShops,
        refreshShops,

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
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
};

export default ShopContext;
