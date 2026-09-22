"use client";

import { useCallback } from "react";

import useApi from "@/hooks/use-api";

const useAnalytics = () => {
    const { post } = useApi();

    const track = useCallback(
        ({
            eventType,
            productId,
            shopId,
            categoryId,
            searchKeyword,
            resultCount,
            source,
            page,
            metadata,
        }) => {
            if (!eventType) {
                return;
            }

            const data = {
                eventType,
                ...(productId && {
                    productId,
                }),
                ...(shopId && {
                    shopId,
                }),
                ...(categoryId && {
                    categoryId,
                }),
                ...(searchKeyword && {
                    searchKeyword,
                }),
                ...(typeof resultCount === "number" && {
                    resultCount,
                }),
                ...(source && {
                    source,
                }),
                ...(page && {
                    page,
                }),
                ...(metadata && {
                    metadata,
                }),
            };

            void post(
                "/api/analytics/events",
                data,
                {},
                {
                    showSuccess: false,
                    showError: false,
                },
            );
        },
        [post],
    );

    const trackProductView = useCallback(
        ({
            productId,
            source = "product_page",
            metadata,
        }) => {
            track({
                eventType: "PRODUCT_VIEW",
                productId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackProductClick = useCallback(
        ({
            productId,
            source = "product_page",
            metadata,
        }) => {
            track({
                eventType: "PRODUCT_CLICK",
                productId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackShopView = useCallback(
        ({
            shopId,
            source = "shop_page",
            metadata,
        }) => {
            track({
                eventType: "SHOP_VIEW",
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackShopClick = useCallback(
        ({
            shopId,
            source = "shop_page",
            metadata,
        }) => {
            track({
                eventType: "SHOP_CLICK",
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackWhatsAppClick = useCallback(
        ({
            shopId,
            productId,
            source = "shop_page",
            metadata,
        }) => {
            track({
                eventType: "WHATSAPP_CLICK",
                shopId,
                productId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackCallClick = useCallback(
        ({
            shopId,
            productId,
            source = "shop_page",
            metadata,
        }) => {
            track({
                eventType: "CALL_CLICK",
                shopId,
                productId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackWebsiteClick = useCallback(
        ({
            shopId,
            source = "shop_page",
            metadata,
        }) => {
            track({
                eventType: "WEBSITE_CLICK",
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackLocationClick = useCallback(
        ({
            shopId,
            source = "shop_page",
            metadata,
        }) => {
            track({
                eventType: "LOCATION_CLICK",
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackYouTubeClick = useCallback(
        ({
            shopId,
            source = "shop_page",
            metadata,
        }) => {
            track({
                eventType: "YOUTUBE_CLICK",
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackSocialClick = useCallback(
        ({
            shopId,
            source = "shop_page",
            metadata,
        }) => {
            track({
                eventType: "SOCIAL_CLICK",
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackShare = useCallback(
        ({
            productId,
            shopId,
            source = "share",
            metadata,
        }) => {
            track({
                eventType: "SHARE",
                productId,
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackCategoryView = useCallback(
        ({
            categoryId,
            source = "category_page",
            metadata,
        }) => {
            track({
                eventType: "CATEGORY_VIEW",
                categoryId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackAddToCart = useCallback(
        ({
            productId,
            shopId,
            source = "product_page",
            metadata,
        }) => {
            track({
                eventType: "ADD_TO_CART",
                productId,
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackSearch = useCallback(
        ({
            searchKeyword,
            resultCount,
            source = "search",
            metadata,
        }) => {
            track({
                eventType: "SEARCH",
                searchKeyword,
                resultCount,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackReviewCreated = useCallback(
        ({
            productId,
            shopId,
            source = "review",
            metadata,
        }) => {
            track({
                eventType: "REVIEW_CREATED",
                productId,
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackOrderCreated = useCallback(
        ({
            productId,
            shopId,
            source = "checkout",
            metadata,
        }) => {
            track({
                eventType: "ORDER_CREATED",
                productId,
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    const trackOrderCompleted = useCallback(
        ({
            productId,
            shopId,
            source = "order",
            metadata,
        }) => {
            track({
                eventType: "ORDER_COMPLETED",
                productId,
                shopId,
                source,
                metadata,
            });
        },
        [track],
    );

    return {
        track,
        trackProductView,
        trackProductClick,
        trackShopView,
        trackShopClick,
        trackWhatsAppClick,
        trackCallClick,
        trackWebsiteClick,
        trackLocationClick,
        trackYouTubeClick,
        trackSocialClick,
        trackShare,
        trackCategoryView,
        trackAddToCart,
        trackSearch,
        trackReviewCreated,
        trackOrderCreated,
        trackOrderCompleted,
    };
};

export default useAnalytics;