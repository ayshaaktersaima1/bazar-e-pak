"use client";

import { createContext, useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";



const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const [cart, setCart] = useState(null);

  const [loading, setLoading] = useState(Boolean(baseUrl));

  const [actionLoading, setActionLoading] = useState(false);

  // Token
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

  // Message
  const getUserMessage = (message, fallback) => {
    const messages = {
      "Unauthorized - No token provided": "Please log in to use your cart.",

      "Unauthorized - Invalid token":
        "Your session has expired. Please log in again.",

      "Product not found": "This product is no longer available.",

      "Product is currently unavailable":
        "This product is currently unavailable.",

      "Insufficient product stock": "Not enough stock is available.",

      "Cart item not found": "This item is no longer in your cart.",

      "Invalid product": "We couldn't identify this product.",

      "Failed to fetch cart": "We couldn't load your cart.",

      "Failed to add product to cart":
        "We couldn't add this product to your cart.",

      "Failed to update cart": "We couldn't update your cart.",

      "Failed to remove product": "We couldn't remove this item.",

      "Failed to clear cart": "We couldn't clear your cart.",
    };

    return messages[message] || fallback;
  };

  // Fetch cart
  const fetchCart = async () => {
    if (!baseUrl) {
      setCart(null);
      return null;
    }

    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        setCart(null);
        return null;
      }

      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "GET",
        headers,
        cache: "no-store",
      });

      const data = await response.json();

      if (response.status === 401) {
        setCart(null);
        return null;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      setCart(data.data || null);

      return data.data;
    } catch (error) {
      console.error("Cart fetch error:", error);

      setCart(null);

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load cart
  useEffect(() => {
    if (!baseUrl) return;

    setTimeout(() => fetchCart(), 0);
  }, [baseUrl]);

  // Add item
  const addToCart = async (product, quantity = 1) => {
    if (!product?._id) {
      toast.error("This product is unavailable.");

      return false;
    }

    if (quantity < 1) {
      toast.error("Please select at least one item.");

      return false;
    }

    try {
      setActionLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        toast.error("Please log in to add products to your cart.");

        return false;
      }

      const response = await fetch(`${baseUrl}/api/cart/items`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        toast.error("Please log in to add products to your cart.");

        return false;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to add product to cart");
      }

      setCart(data.data);

      toast.success(`${product.name} added to your cart.`);

      return true;
    } catch (error) {
      console.error("Add cart error:", error);

      toast.error(
        getUserMessage(
          error.message,
          "We couldn't add this product to your cart.",
        ),
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Update item
  const updateQuantity = async (productId, quantity) => {
    if (!productId) {
      toast.error("This cart item is unavailable.");

      return false;
    }

    if (quantity < 1) {
      return removeFromCart(productId);
    }

    try {
      setActionLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        toast.error("Please log in to update your cart.");

        return false;
      }

      const response = await fetch(`${baseUrl}/api/cart/items/${productId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          quantity,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        toast.error("Please log in to update your cart.");

        return false;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update cart");
      }

      setCart(data.data);

      return true;
    } catch (error) {
      console.error("Update cart error:", error);

      toast.error(
        getUserMessage(error.message, "We couldn't update your cart."),
      );

      await fetchCart();

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Increase
  const increaseQuantity = async (productId) => {
    const item = cart?.items?.find(
      (cartItem) =>
        cartItem.product?._id === productId || cartItem.product === productId,
    );

    if (!item) {
      toast.error("This item is no longer in your cart.");

      await fetchCart();

      return false;
    }

    return updateQuantity(productId, item.quantity + 1);
  };

  // Decrease
  const decreaseQuantity = async (productId) => {
    const item = cart?.items?.find(
      (cartItem) =>
        cartItem.product?._id === productId || cartItem.product === productId,
    );

    if (!item) {
      toast.error("This item is no longer in your cart.");

      await fetchCart();

      return false;
    }

    if (item.quantity === 1) {
      return removeFromCart(productId);
    }

    return updateQuantity(productId, item.quantity - 1);
  };

  // Remove item
  const removeFromCart = async (productId) => {
    if (!productId) {
      toast.error("This cart item is unavailable.");

      return false;
    }

    const item = cart?.items?.find(
      (cartItem) =>
        cartItem.product?._id === productId || cartItem.product === productId,
    );

    try {
      setActionLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        toast.error("Please log in to manage your cart.");

        return false;
      }

      const response = await fetch(`${baseUrl}/api/cart/items/${productId}`, {
        method: "DELETE",
        headers,
      });

      const data = await response.json();

      if (response.status === 401) {
        toast.error("Please log in to manage your cart.");

        return false;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to remove product");
      }

      setCart(data.data);

      toast.success(`${item?.productName || "Item"} removed from your cart.`);

      return true;
    } catch (error) {
      console.error("Remove cart error:", error);

      toast.error(
        getUserMessage(error.message, "We couldn't remove this item."),
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    const cartItems = cart?.items || [];

    if (!cartItems.length) {
      return true;
    }

    try {
      setActionLoading(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        toast.error("Please log in to clear your cart.");

        return false;
      }

      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "DELETE",
        headers,
      });

      const data = await response.json();

      if (response.status === 401) {
        toast.error("Please log in to clear your cart.");

        return false;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to clear cart");
      }

      setCart(data.data);

      toast.success("Your cart has been cleared.");

      return true;
    } catch (error) {
      console.error("Clear cart error:", error);

      toast.error(
        getUserMessage(error.message, "We couldn't clear your cart."),
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Refresh
  const refreshCart = async () => {
    return fetchCart();
  };

  // Items
  const cartItems = cart?.items || [];

  // Count
  const cartCount =
    cart?.totalItems ??
    cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);

  // Total
  const cartTotal =
    cart?.subtotal ??
    cartItems.reduce(
      (total, item) =>
        total + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        cartCount,
        cartTotal,

        loading,
        actionLoading,

        fetchCart,
        refreshCart,

        addToCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

export default CartContext;
