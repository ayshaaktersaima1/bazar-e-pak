"use client";

import Link from "next/link";
import useApi from "@/hooks/use-api";

const AnalyticsLink = ({
    eventType,
    source,
    productId,
    shopId,
    categoryId,
    metadata,
    children,
    onClick,
    ...props
}) => {
    const api = useApi();

    const handleClick = () => {
        if (eventType) {
            api.post(
                "/api/analytics/events",
                {
                    eventType,
                    source,
                    productId,
                    shopId,
                    categoryId,
                    metadata,
                    page: window.location.pathname,
                },
                {},
                {
                    auth: false,
                    showError: false,
                    showSuccess: false,
                },
            );
        }

        onClick?.();
    };

    return (
        <Link
            {...props}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
};

export default AnalyticsLink;