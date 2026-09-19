"use client";

import { useEffect, useRef } from "react";
import useApi from "@/hooks/use-api";

const CategoryViewTracker = ({
    categoryId,
    categorySlug,
}) => {
    const api = useApi();
    const trackedRef = useRef(null);

    useEffect(() => {
        if (!categoryId || trackedRef.current === categoryId) return;

        trackedRef.current = categoryId;

        const timer = setTimeout(() => {
            api.post(
                "/api/analytics/events",
                {
                    eventType: "CATEGORY_VIEW",
                    categoryId,
                    source: "category_page",
                    page: `/collection/${categorySlug}`,
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
    }, [categoryId, categorySlug]);

    return null;
};

export default CategoryViewTracker;