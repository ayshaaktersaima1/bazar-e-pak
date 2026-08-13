"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ReviewCard from "./ReviewCard";

import "swiper/css";
import "swiper/css/pagination";

const ShopReview = ({
    reviews = [],
    variant = "default",
}) => {
    if (!reviews.length) {
        return (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Reviews
                </p>

                <h3 className="mt-2 text-xl font-bold text-[#001B08]">
                    No Reviews Yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    This shop does not have any reviews yet.
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={reviews.length > 1}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="pb-12!"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id} className="h-auto!">
                        <ReviewCard
                            review={review}
                            variant={variant}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background: #001b08;
                    opacity: 0.25;
                }

                .swiper-pagination-bullet-active {
                    background: #e8bb44;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default ShopReview;