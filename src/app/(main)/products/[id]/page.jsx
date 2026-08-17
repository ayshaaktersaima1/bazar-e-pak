"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useProduct } from "@/hooks/use-product";
import { useShop } from "@/hooks/use-shop";

import ShopInfo from "../../../../components/shared/ShopInfo";
import ProductInfo from "../../../../components/shared/ProductInfo";
import ReviewSection from "@/components/reviews/ReviewSection";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    products,
    loading,
    getProductById,
  } = useProduct();

  const { getShopById } = useShop();

  const product = getProductById(id);

  const shop = product
    ? getShopById(product.shopId)
    : null;

  // Wait until products finish loading
  if (loading) {
    return (
      <main className="bg-[#F7F5EF] py-20">
        <div className="mx-auto w-[90%] text-center">
          <p className="text-lg font-medium text-[#001B08]">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  // Only show not found after loading is finished
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
        <ShopInfo
          shop={shop}
          productCount={productCount}
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-xl bg-white p-5 shadow-sm">
            <Image
              src={
                product.images?.[0]
              }
              alt={product.name}
              width={700}
              height={700}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          {/* Product Information */}
          <ProductInfo
            product={product}
            onAdded={() => router.push("/cart")}
          />
        </div>

        {/* Product Reviews */}
        <ReviewSection productId={product._id} />

      </section>
    </main>
  );
};

export default ProductDetailsPage;