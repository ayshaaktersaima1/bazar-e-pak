import Link from "next/link";
import Image from "next/image";

import {
  FaArrowLeft,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaStore,
} from "react-icons/fa";

import ProductCard from "../../../../components/shared/ProductCard";
import ShopReview from "@/components/shared/ShopReview";

const ShopDetailsPage = async ({ params }) => {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  // Get this shop
  const shopRes = await fetch(
    `${baseUrl}/api/shops/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!shopRes.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5EF] px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
            Shop Not Found
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
            This shop does not exist
          </h1>

          <Link
            href="/shops"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#001B08] px-5 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#E8BB44] hover:text-[#001B08]"
          >
            <FaArrowLeft />
            Back to Shops
          </Link>
        </div>
      </main>
    );
  }

  const shopData = await shopRes.json();
  const shop = shopData.data;

  // Get products of this shop
  const productRes = await fetch(
    `${baseUrl}/api/products?shopId=${shop._id}`,
    {
      cache: "no-store",
    }
  );

  const productData = await productRes.json();
  const shopProducts = productData.data || [];

  // Get reviews of this shop
  const reviewRes = await fetch(
    `${baseUrl}/api/reviews?reviewType=shop&shopId=${shop._id}`,
    {
      cache: "no-store",
    }
  );

  const reviewData = await reviewRes.json();
  const shopReviews = reviewData.data || [];

  const averageRating =
    shopReviews.length > 0
      ? shopReviews.reduce(
        (total, review) => total + review.rating,
        0
      ) / shopReviews.length
      : 0;

  return (
    <main className="min-h-screen bg-[#F7F5EF]">

      {/* Shop Hero */}
      <section className="bg-[#001B08] py-12 md:py-16">
        <div className="mx-auto w-[90%]">

          <Link
            href="/shops"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition duration-300 hover:text-[#E8BB44]"
          >
            <FaArrowLeft />
            Back to Shops
          </Link>

          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">

            {/* Shop Image */}
            <div className="overflow-hidden rounded-2xl bg-[#F7F5EF]">
              <Image
                width={800}
                height={500}
                src={
                  shop.banner ||
                  shop.logo ||
                  "/images/placeholder.webp"
                }
                alt={shop.name}
                className="h-64 w-full object-cover md:h-80 lg:h-96"
              />
            </div>

            {/* Shop Information */}
            <div className="text-white">

              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                <FaStore />
                {shop.status}
              </div>

              <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                {shop.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2 rounded-full bg-[#E8BB44] px-3 py-1.5 text-sm font-bold text-[#001B08]">
                  <FaStar />

                  {shopReviews.length > 0
                    ? averageRating.toFixed(1)
                    : "0.0"}
                </div>

                <span className="text-sm text-gray-300">
                  {shopReviews.length} Reviews
                </span>

                <span className="text-sm text-gray-300">
                  {shopProducts.length} Products
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                {shop.description}
              </p>

              <div className="mt-7 grid gap-4 text-sm text-gray-300 sm:grid-cols-2">

                {/* Seller */}
                <div className="flex items-start gap-3">
                  <FaStore className="mt-1 shrink-0 text-[#E8BB44]" />

                  <div>
                    <p className="font-semibold text-white">
                      Seller
                    </p>

                    <p className="mt-1 break-all">
                      {shop.sellerId}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-[#E8BB44]" />

                  <div>
                    <p className="font-semibold text-white">
                      Location
                    </p>

                    <p className="mt-1">
                      {shop.address || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <FaPhone className="mt-1 shrink-0 text-[#E8BB44]" />

                  <div>
                    <p className="font-semibold text-white">
                      Phone
                    </p>

                    <p className="mt-1">
                      {shop.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 shrink-0 text-[#E8BB44]" />

                  <div>
                    <p className="font-semibold text-white">
                      Email
                    </p>

                    <p className="mt-1 break-all">
                      {shop.email || "Not provided"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto w-[90%]">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44]">
              Shop Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
              Products from {shop.name}
            </h2>

            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-14 bg-[#001B08]" />

              <span className="text-[#E8BB44]">
                ★
              </span>

              <span className="h-px w-14 bg-[#001B08]" />
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500">
              Explore the complete collection of products
              available from {shop.name}.
            </p>
          </div>

          {/* Product Grid */}
          {shopProducts.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shopProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl bg-white p-10 text-center shadow-sm">

              <FaStore className="mx-auto text-3xl text-[#E8BB44]" />

              <h3 className="mt-4 text-xl font-bold text-[#001B08]">
                No Products Available
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                This shop has not added any products yet.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[90%]">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44]">
              Customer Reviews
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
              What Customers Say
            </h2>

            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-14 bg-[#001B08]" />

              <span className="text-[#E8BB44]">
                ★
              </span>

              <span className="h-px w-14 bg-[#001B08]" />
            </div>
          </div>

          <ShopReview
            shopId={shop._id}
            initialReviews={shopReviews}
          />

        </div>
      </section>

    </main>
  );
};

export default ShopDetailsPage;