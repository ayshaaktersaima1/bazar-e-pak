"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL;

const useApi = () => {
    const request = useCallback(
        async (
            endpoint,
            options = {},
            config = {},
        ) => {
            const {
                auth = true,
                showSuccess = false,
                successMessage =
                    "Operation successful",
                showError = true,
            } = config;

            try {
                let token = null;

                if (auth) {
                    const { data } =
                        await authClient.token();

                    token = data?.token;
                }

                const response =
                    await fetch(
                        `${BASE_URL}${endpoint}`,
                        {
                            ...options,

                            headers: {
                                "Content-Type":
                                    "application/json",

                                ...(token && {
                                    Authorization:
                                        `Bearer ${token}`,
                                }),

                                ...options.headers,
                            },
                        },
                    );

                let result;

                try {
                    result =
                        await response.json();
                } catch {
                    throw new Error(
                        "Invalid server response",
                    );
                }

                if (
                    !response.ok ||
                    !result.success
                ) {
                    throw new Error(
                        result.message ||
                            "API request failed",
                    );
                }

                if (showSuccess) {
                    toast.success(
                        successMessage,
                    );
                }

                return {
                    data: result.data,
                    pagination:
                        result.pagination ??
                        null,
                };
            } catch (error) {
                if (showError) {
                    toast.error(
                        error?.message ||
                            "Something went wrong",
                    );
                }

                return {
                    data: null,
                    pagination: null,
                    error,
                };
            }
        },
        [],
    );

    const get = useCallback(
        (
            endpoint,
            options = {},
            config = {},
        ) =>
            request(
                endpoint,
                {
                    ...options,
                    method: "GET",
                },
                config,
            ),
        [request],
    );

    const post = useCallback(
        (
            endpoint,
            body,
            options = {},
            config = {},
        ) =>
            request(
                endpoint,
                {
                    ...options,
                    method: "POST",
                    body: JSON.stringify(
                        body,
                    ),
                },
                config,
            ),
        [request],
    );

    const put = useCallback(
        (
            endpoint,
            body,
            options = {},
            config = {},
        ) =>
            request(
                endpoint,
                {
                    ...options,
                    method: "PUT",
                    body: JSON.stringify(
                        body,
                    ),
                },
                config,
            ),
        [request],
    );

    const patch = useCallback(
        (
            endpoint,
            body,
            options = {},
            config = {},
        ) =>
            request(
                endpoint,
                {
                    ...options,
                    method: "PATCH",
                    body: JSON.stringify(
                        body,
                    ),
                },
                config,
            ),
        [request],
    );

    const remove = useCallback(
        (
            endpoint,
            options = {},
            config = {},
        ) =>
            request(
                endpoint,
                {
                    ...options,
                    method: "DELETE",
                },
                config,
            ),
        [request],
    );

    return {
        get,
        post,
        put,
        patch,
        delete: remove,
    };
};

export default useApi;