"use client";

import { createContext, useContext } from "react";
import shops from "@/data/shops";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const getShopById = (shopId) => {
    return shops.find((shop) => shop.id === Number(shopId));
  };

  const getShopBySlug = (slug) => {
    return shops.find((shop) => shop.slug === slug);
  };

  const getShopProducts = (shopId, products) => {
    const shop = getShopById(shopId);

    if (!shop) return [];

    return products.filter((product) => shop.productIds.includes(product.id));
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
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
};

export default ShopContext;
