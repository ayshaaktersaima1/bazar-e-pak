"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState([]);

  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchShops = async () => {
      const res = await fetch(
        `${baseUrl}/api/shops`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (data.success) {
        setShops(data.data || []);
      }
    };

    fetchShops();
  }, [baseUrl]);

  const getShopById = (shopId) => {
    return shops.find(
      (shop) => shop._id === shopId
    );
  };

  const getShopBySlug = (slug) => {
    return shops.find(
      (shop) => shop.slug === slug
    );
  };

  const getShopProducts = (shopId, products) => {
    return products.filter(
      (product) => product.shopId === shopId
    );
  };

  return (
    <ShopContext.Provider
      value={{
        shops,
        getShopById,
        getShopBySlug,
        getShopProducts,
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
      "useShop must be used inside ShopProvider"
    );
  }

  return context;
};

export default ShopContext;