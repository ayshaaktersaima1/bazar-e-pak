import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { ReviewTable } from "@/features/dashboard/seller/reviews";
import { serverApi } from "@/lib/server";


const SellerReviewsPage = async () => {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "seller") {
    redirect("/dashboard");
  }

  const productsResponse = await serverApi.get(
    "/api/products/seller?page=1&limit=100",
    {},
    {
      auth: true,
      includeMeta: true,
    },
  );

  const products = productsResponse?.data?.products ?? productsResponse?.data ?? [];

  const productIds = products
    .map((product) => product._id)
    .filter(Boolean);

  const reviewResponses = await Promise.all(
    productIds.map((productId) =>
      serverApi.get(
        `/api/reviews?productId=${productId}&page=1&limit=100`,
        {},
        {
          auth: true,
          includeMeta: true,
        },
      ),
    ),
  );

  const reviews = reviewResponses.flatMap((response) =>
    Array.isArray(response?.data?.reviews)
      ? response.data.reviews
      : Array.isArray(response?.data)
        ? response.data
        : [],
  );

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce(
        (sum, review) => sum + Number(review.rating || 0),
        0,
      ) / totalReviews
      : 0;

  const ratingCounts = {
    5: reviews.filter((review) => Number(review.rating) === 5).length,
    4: reviews.filter((review) => Number(review.rating) === 4).length,
    3: reviews.filter((review) => Number(review.rating) === 3).length,
    2: reviews.filter((review) => Number(review.rating) === 2).length,
    1: reviews.filter((review) => Number(review.rating) === 1).length,
  };

  const summary = {
    totalReviews,
    averageRating: Number(averageRating.toFixed(1)),
    ratingCounts,
  };

  return (
    <div className="bg-[#F7F5EF] p-6">
      <ReviewTable
        reviews={reviews}
        pagination={{
          page: 1,
          limit: 100,
          total: totalReviews,
          totalPages: 1,
        }}
        summary={summary}
      />
    </div>
  );
};

export default SellerReviewsPage;