"use client";

import { useCart } from "@/hooks/use-cart";
import { CartList, CartSummary, EmptyCart } from "../../../components/cart";


const CartPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-[#F7F5EF] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8BB44]">
            Review Your Order
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#001B08] sm:text-4xl">
            Shopping Cart
          </h1>
          <div className="mx-auto mt-3 h-0.5 w-16 bg-[#E8BB44]"></div>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CartList cartItems={cartItems} />
            </div>
            <div>
              <CartSummary cartTotal={cartTotal} clearCart={clearCart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;