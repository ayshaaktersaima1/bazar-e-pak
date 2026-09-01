import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const request = async (
  endpoint,
  options = {},
  config = {},
) => {
  const {
    auth: requiresAuth = true,
    includeMeta = false,
  } = config;

  let token = null;

  if (requiresAuth) {
    const { token: authToken } = await auth.api.getToken({
      headers: await headers(),
    });

    token = authToken;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...options.headers,
    },
    cache: "no-store",
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "API request failed",
    );
  }

  if (includeMeta) {
    return {
      data: result.data,
      pagination: result.pagination ?? null,
      meta: result.meta ?? null,
    };
  }

  return result.data;
};

export const serverApi = {
  get: (
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

  post: (
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
        body: JSON.stringify(body),
      },
      config,
    ),

  put: (
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
        body: JSON.stringify(body),
      },
      config,
    ),

  patch: (
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
        body: JSON.stringify(body),
      },
      config,
    ),

  delete: (
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
};