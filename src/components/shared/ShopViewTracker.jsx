"use client";

import { useEffect, useRef } from "react";
import useApi from "@/hooks/use-api";

const ShopViewTracker = ({ shopId }) => {
    const api = useApi();
    const trackedRef = useRef(null);

    useEffect(() => {
        if (!shopId || trackedRef.current === shopId) return;

        trackedRef.current = shopId;

        const timer = setTimeout(() => {
            api.post(
                "/api/analytics/events",
                {
                    eventType: "SHOP_VIEW",
                    shopId,
                    source: "shop_details",
                    page: `/shops/${shopId}`,
                },
                {},
                {
                    auth: false,
                    showError: false,
                    showSuccess: false,
                },
            );
        }, 0);

        return () => clearTimeout(timer);
    }, [shopId]);

    return null;
};

export default ShopViewTracker;