import {
    FaQuoteLeft,
    FaStar,
    FaRegStar,
    FaUserCircle,
} from "react-icons/fa";

const ReviewCard = ({
    review,
    variant = "default",
    showDate = true,
    className = "",
}) => {
    const rating = Math.min(5, Math.max(0, review.rating || 0));

    const variants = {
        default: {
            card: "bg-white rounded-2xl p-6 shadow-sm",
            quote: "text-[#E8BB44]",
            name: "text-[#001B08]",
            text: "text-gray-600",
            date: "text-gray-400",
        },

        dark: {
            card: "bg-[#001B08] rounded-2xl p-6",
            quote: "text-[#E8BB44]",
            name: "text-white",
            text: "text-gray-300",
            date: "text-gray-400",
        },

        bordered: {
            card: "rounded-2xl border border-gray-200 bg-white p-6",
            quote: "text-[#E8BB44]",
            name: "text-[#001B08]",
            text: "text-gray-600",
            date: "text-gray-400",
        },
    };

    const currentVariant = variants[variant] || variants.default;

    return (
        <article className={`${currentVariant.card} ${className}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                            variant === "dark"
                                ? "bg-white/10"
                                : "bg-[#F7F5EF]"
                        }`}
                    >
                        <FaUserCircle
                            className={`text-2xl ${
                                variant === "dark"
                                    ? "text-[#E8BB44]"
                                    : "text-[#001B08]"
                            }`}
                        />
                    </div>

                    <div>
                        <h3
                            className={`text-sm font-bold ${currentVariant.name}`}
                        >
                            {review.userName}
                        </h3>

                        {showDate && review.date && (
                            <p
                                className={`mt-1 text-xs ${currentVariant.date}`}
                            >
                                {review.date}
                            </p>
                        )}
                    </div>
                </div>

                <FaQuoteLeft
                    className={`text-xl ${currentVariant.quote}`}
                />
            </div>

            <div className="mt-5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) =>
                    index < rating ? (
                        <FaStar
                            key={index}
                            className="text-sm text-[#E8BB44]"
                        />
                    ) : (
                        <FaRegStar
                            key={index}
                            className={`text-sm ${
                                variant === "dark"
                                    ? "text-gray-600"
                                    : "text-gray-300"
                            }`}
                        />
                    ),
                )}

                <span
                    className={`ml-2 text-xs font-semibold ${currentVariant.text}`}
                >
                    {rating.toFixed(1)}
                </span>
            </div>

            <p
                className={`mt-4 text-sm leading-7 ${currentVariant.text}`}
            >
                {review.comment}
            </p>
        </article>
    );
};

export default ReviewCard;