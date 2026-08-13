"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import products from "@/data/products";
import shops from "@/data/shops";
import ShopInfo from "../../../../components/shared/ShopInfo";
import ProductInfo from "../../../../components/shared/ProductInfo";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const router = useRouter();

  const product = products.find((item) => item.slug === slug);

  const shop = product
    ? shops.find((item) => item.id === product.shopId)
    : null;

  if (!product) {
    return (
      <main className="bg-[#F7F5EF] py-20">
        <div className="mx-auto w-[90%] text-center">
          <h1 className="text-3xl font-bold text-[#001B08]">
            Product Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The product you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  const productCount = products.filter(
    (item) => item.shopId === product.shopId,
  ).length;

  return (
    <main className="bg-[#F7F5EF] py-10 md:py-14">
      <section className="mx-auto w-[90%]">
        {/* Shop Information */}
        <ShopInfo shop={shop} productCount={productCount} />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-xl bg-white p-5 shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={700}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          {/* Product Information */}
          <ProductInfo product={product} onAdded={() => router.push("/cart")} />
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
