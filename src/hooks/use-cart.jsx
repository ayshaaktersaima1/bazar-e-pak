"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");

        if (storedCart) {
            setTimeout(() => setCartItems(JSON.parse(storedCart)), 0);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        const existingItem = cartItems.find(
            (item) => item.id === product._id,
        );

        if (existingItem) {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item,
                ),
            );

            toast.success(`${product.name} quantity increased`);
            return;
        }

        setCartItems((prevItems) => [
            ...prevItems,
            {
                ...product,
                quantity,
            },
        ]);

        toast.success(`${product.name} added to cart`);
    };

    const removeFromCart = (productId) => {
        const item = cartItems.find(
            (item) => item.id === productId,
        );

        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId),
        );

        if (item) {
            toast.success(`${item.name} removed from cart`);
        }
    };

    const increaseQuantity = (productId) => {
        const item = cartItems.find(
            (item) => item.id === productId,
        );

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item,
            ),
        );

        if (item) {
            toast.success(`${item.name} quantity increased`);
        }
    };

    const decreaseQuantity = (productId) => {
        const item = cartItems.find(
            (item) => item.id === productId,
        );

        if (!item) return;

        if (item.quantity === 1) {
            setCartItems((prevItems) =>
                prevItems.filter(
                    (item) => item.id !== productId,
                ),
            );

            toast.success(`${item.name} removed from cart`);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item,
            ),
        );

        toast.success(`${item.name} quantity decreased`);
    };

    const clearCart = () => {
        setCartItems([]);
        toast.success("Cart cleared successfully");
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total +
            (item.discountPrice ?? item.price) * item.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
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
        throw new Error(
            "useCart must be used inside CartProvider",
        );
    }

    return context;
};

export default CartContext;