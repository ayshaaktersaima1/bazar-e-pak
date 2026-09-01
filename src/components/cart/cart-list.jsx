"use client";

import ProductCard from "../shared/ProductCard";



export const CartList = ({ cartItems }) => {
  return (
    <div className="flex flex-col gap-4">
      {cartItems.map((item) => (
        <ProductCard key={item._id} product={item} variant="cart" />
      ))}
    </div>
  );
};