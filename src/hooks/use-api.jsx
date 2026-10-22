"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const useApi = () => {
    const [loading, setLoading] = useState(false);

    const request = useCallback(
        async (
            endpoint,
            options = {},
            config = {},
        ) => {
            const {
                auth = true,
                showSuccess = false,
                successMessage = "Operation successful",
                showError = true,
            } = config;

            setLoading(true);

            try {
                let token = null;

                if (auth) {
                    const { data } =
                        await authClient.token();

                    token = data?.token;
                }

                const response = await fetch(
                    `${BASE_URL}${endpoint}`,
                    {
                        ...options,
                        headers: {
                            Accept: "application/json",
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

                const contentType =
                    response.headers.get(
                        "content-type",
                    ) || "";

                let result = null;

                if (
                    contentType.includes(
                        "application/json",
                    )
                ) {
                    result = await response.json();
                } else {
                    const text =
                        await response.text();

                    result = {
                        success: false,
                        message:
                            text ||
                            "Invalid server response.",
                    };
                }

                if (!response.ok) {
                    throw new Error(
                        result?.message ||
                            `Request failed with status ${response.status}`,
                    );
                }

                if (
                    result &&
                    result.success === false
                ) {
                    throw new Error(
                        result.message ||
                            "API request failed.",
                    );
                }

                if (showSuccess) {
                    toast.success(
                        successMessage,
                    );
                }

                return {
                    data: result?.data ?? null,
                    pagination:
                        result?.pagination ?? null,
                    success:
                        result?.success ?? true,
                    error: null,
                };
            } catch (error) {
                console.error(
                    "API Error:",
                    error,
                );

                if (showError) {
                    toast.error(
                        error?.message ||
                            "Something went wrong.",
                    );
                }

                return {
                    data: null,
                    pagination: null,
                    success: false,
                    error,
                };
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    const get = useCallback(
        (endpoint, options = {}, config = {}) =>
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
            body = {},
            options = {},
            config = {},
        ) =>
            request(
                endpoint,
                {
                    ...options,
                    method: "POST",
                    body: JSON.stringify(body),
                },
                config,
            ),
        [request],
    );

    const put = useCallback(
        (
            endpoint,
            body = {},
            options = {},
            config = {},
        ) =>
            request(
                endpoint,
                {
                    ...options,
                    method: "PUT",
                    body: JSON.stringify(body),
                },
                config,
            ),
        [request],
    );

    const patch = useCallback(
        (
            endpoint,
            body = {},
            options = {},
            config = {},
        ) =>
            request(
                endpoint,
                {
                    ...options,
                    method: "PATCH",
                    body: JSON.stringify(body),
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

    // Raw binary upload (e.g. payment-proof screenshots). The backend expects the file itself as the
    // request body with its image Content-Type and metadata in the query string.
    const upload = useCallback(
        async (endpoint, file, query = {}, config = {}) => {
            const { showSuccess = false, successMessage = "Uploaded successfully", showError = true } = config;

            setLoading(true);

            try {
                const { data: tokenData } = await authClient.token();
                const params = new URLSearchParams();

                Object.entries(query).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        params.set(key, String(value));
                    }
                });

                const qs = params.toString();

                const response = await fetch(`${BASE_URL}${endpoint}${qs ? `?${qs}` : ""}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": file.type,
                        ...(tokenData?.token && { Authorization: `Bearer ${tokenData.token}` }),
                    },
                    body: file,
                });

                const result = await response.json().catch(() => null);

                if (!response.ok || result?.success === false) {
                    throw new Error(result?.message || `Upload failed with status ${response.status}`);
                }

                if (showSuccess) toast.success(successMessage);

                return { data: result?.data ?? null, pagination: null, success: true, error: null };
            } catch (error) {
                if (showError) toast.error(error?.message || "Upload failed.");

                return { data: null, pagination: null, success: false, error };
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    // Authenticated binary download (private files are not reachable through a plain <img src>).
    const blob = useCallback(async (endpoint, config = {}) => {
        const { showError = true } = config;

        try {
            const { data: tokenData } = await authClient.token();

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: tokenData?.token ? { Authorization: `Bearer ${tokenData.token}` } : {},
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null);

                throw new Error(result?.message || `Request failed with status ${response.status}`);
            }

            return { data: await response.blob(), success: true, error: null };
        } catch (error) {
            if (showError) toast.error(error?.message || "Could not load the file.");

            return { data: null, success: false, error };
        }
    }, []);

    return {
        get,
        post,
        put,
        patch,
        delete: remove,
        remove,
        upload,
        blob,
        loading,
    };
};

export default useApi;