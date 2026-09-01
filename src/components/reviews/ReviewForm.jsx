"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const ReviewForm = ({
    reviewType,
    productId,
    shopId,
    onReviewAdded,
}) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            console.log("Comment is empty");
            return;
        }

        const { data } = await authClient.token();

        const token = data?.token;

        if (!token) {
            console.log("Token not found");
            return;
        }

        const res = await fetch(
            `${baseUrl}/api/reviews`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    reviewType,
                    productId,
                    shopId,
                    rating,
                    comment,
                }),
            }
        );

        const result = await res.json();

        if (!res.ok) {
            toast.error(
                result.message || "Failed to submit review"
            );
            return;
        }

        if (result.success) {
            onReviewAdded(result.data);

            setRating(5);
            setComment("");
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="border-b border-[#E8BB44]/20 p-6"
        >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <h3 className="text-lg font-bold text-[#001B08]">
                    Write a Review
                </h3>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                        Your Rating
                    </span>

                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                            >
                                <FaStar
                                    size={20}
                                    className={
                                        star <= rating
                                            ? "text-[#E8BB44]"
                                            : "text-gray-200"
                                    }
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-[#001B08]">
                    Your Review
                </label>

                <textarea
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                    placeholder={
                        reviewType === "shop"
                            ? "Share your experience about this shop..."
                            : "Share your experience about this product..."
                    }
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-white p-4 text-[#001B08] outline-none placeholder:text-gray-400 focus:border-[#E8BB44]"
                />
            </div>

            <button
                type="submit"
                className="mt-4 flex items-center gap-2 rounded-md bg-[#001B08] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#003812]"
            >
                Submit Review
                <FiSend size={15} />
            </button>
        </form>
    );
};

export default ReviewForm;