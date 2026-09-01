"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { authClient, useSession } from "@/lib/auth-client";
import ReviewForm from "../reviews/ReviewForm";

const ShopReviewSection = ({
    shopId,
    initialReviews,
}) => {
    const { data: session } = useSession();

    const [reviews, setReviews] = useState(
        initialReviews || []
    );

    const [deleteReviewId, setDeleteReviewId] =
        useState(null);

    const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL;

    const getToken = async () => {
        const { data } = await authClient.token();

        return data?.token;
    };

    const handleReviewAdded = (newReview) => {
        setReviews((previousReviews) => [
            newReview,
            ...previousReviews,
        ]);
    };

    const handleDelete = async (reviewId) => {
        const token = await getToken();

        if (!token) return;

        const res = await fetch(
            `${baseUrl}/api/reviews/${reviewId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const result = await res.json();

        if (result.success) {
            setReviews((previousReviews) =>
                previousReviews.filter(
                    (review) =>
                        review._id !== reviewId
                )
            );
        }
    };

    const openDeleteModal = (reviewId) => {
        setDeleteReviewId(reviewId);

        document
            .getElementById(
                "delete_shop_review_modal"
            )
            .showModal();
    };

    const confirmDelete = async () => {
        if (!deleteReviewId) return;

        await handleDelete(deleteReviewId);

        document
            .getElementById(
                "delete_shop_review_modal"
            )
            .close();

        setDeleteReviewId(null);
    };

    const averageRating =
        reviews.length > 0
            ? reviews.reduce(
                (total, review) =>
                    total + review.rating,
                0
            ) / reviews.length
            : 0;

    const getRatingCount = (star) => {
        return reviews.filter(
            (review) =>
                review.rating === star
        ).length;
    };

    return (
        <section className="mt-10">
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">

                {/* Left Side */}
                <div className="rounded-xl border border-[#E8BB44]/30 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#001B08]">
                        Shop Reviews
                    </h3>

                    <div className="mt-2 h-[2px] w-8 bg-[#E8BB44]" />

                    <div className="mt-8 flex items-center gap-3">
                        <span className="text-4xl font-semibold text-[#001B08]">
                            {averageRating.toFixed(1)}
                        </span>

                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(
                                (star) => (
                                    <FaStar
                                        key={star}
                                        size={17}
                                        className={
                                            star <=
                                                Math.round(
                                                    averageRating
                                                )
                                                ? "text-[#E8BB44]"
                                                : "text-gray-200"
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                        Based on {reviews.length} Reviews
                    </p>

                    <div className="mt-8 space-y-4">
                        {[5, 4, 3, 2, 1].map(
                            (star) => {
                                const count =
                                    getRatingCount(
                                        star
                                    );

                                const percentage =
                                    reviews.length > 0
                                        ? (count /
                                            reviews.length) *
                                        100
                                        : 0;

                                return (
                                    <div
                                        key={star}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="w-12 text-sm text-[#001B08]">
                                            {star} Stars
                                        </span>

                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-[#E8BB44]"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>

                                        <span className="w-6 text-right text-sm text-gray-500">
                                            {count}
                                        </span>
                                    </div>
                                );
                            }
                        )}
                    </div>

                    <div className="mt-10 rounded-xl border border-[#E8BB44]/30 bg-[#FFF9E9] p-5">
                        <h4 className="font-semibold text-[#001B08]">
                            Share Your Experience
                        </h4>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Tell others about your
                            experience with this shop.
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="overflow-hidden rounded-xl border border-[#E8BB44]/30 bg-white shadow-sm">

                    {session?.user && (
                        <ReviewForm
                            reviewType="shop"
                            shopId={shopId}
                            onReviewAdded={
                                handleReviewAdded
                            }
                        />
                    )}

                    <div>
                        {reviews.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No shop reviews yet.
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="border-b border-gray-100 p-6 last:border-b-0"
                                >
                                    <div className="flex items-start justify-between gap-5">
                                        <div>
                                            <p className="font-semibold text-[#001B08]">
                                                {review.userName ||
                                                    "Customer"}
                                            </p>

                                            <div className="mt-2 flex gap-1">
                                                {[
                                                    1,
                                                    2,
                                                    3,
                                                    4,
                                                    5,
                                                ].map(
                                                    (
                                                        star
                                                    ) => (
                                                        <FaStar
                                                            key={
                                                                star
                                                            }
                                                            size={
                                                                14
                                                            }
                                                            className={
                                                                star <=
                                                                    review.rating
                                                                    ? "text-[#E8BB44]"
                                                                    : "text-gray-200"
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {review.createdAt && (
                                                <span className="text-xs text-gray-400">
                                                    {new Date(
                                                        review.createdAt
                                                    ).toLocaleDateString()}
                                                </span>
                                            )}

                                            {review.userId ===
                                                session
                                                    ?.user
                                                    ?.id && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                review._id
                                                            )
                                                        }
                                                        className="text-red-600 hover:opacity-60"
                                                    >
                                                        <FiTrash2
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>
                                                )}
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-gray-600">
                                        {
                                            review.comment
                                        }
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <dialog
                id="delete_shop_review_modal"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box bg-white text-[#001B08]">
                    <h3 className="text-lg font-bold">
                        Delete Review?
                    </h3>

                    <p className="py-4 text-gray-600">
                        Are you sure you want to
                        delete this shop review?
                    </p>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">
                                Cancel
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="btn border-none bg-red-600 text-white hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </dialog>
        </section>
    );
};

export default ShopReviewSection;