"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const useApi = () => {
  const request = async (endpoint, options = {}, config = {}) => {
    const {
      auth = true,
      showSuccess = false,
      successMessage = "Operation successful",
      showError = true,
    } = config;

    try {
      let token = null;

      if (auth) {
        const { data } = await authClient.token();
        token = data?.token;
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
      });

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "API request failed");
      }

      if (showSuccess) {
        toast.success(successMessage);
      }

      return result.data;
    } catch (error) {
      if (showError) {
        toast.error(error?.message || "Something went wrong");
      }

      return null;
    }
  };

  const get = (endpoint, options = {}, config = {}) =>
    request(
      endpoint,
      {
        ...options,
        method: "GET",
      },
      config,
    );

  const post = (endpoint, body, options = {}, config = {}) =>
    request(
      endpoint,
      {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      },
      config,
    );

  const put = (endpoint, body, options = {}, config = {}) =>
    request(
      endpoint,
      {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      },
      config,
    );

  const patch = (endpoint, body, options = {}, config = {}) =>
    request(
      endpoint,
      {
        ...options,
        method: "PATCH",
        body: JSON.stringify(body),
      },
      config,
    );

  const remove = (endpoint, options = {}, config = {}) =>
    request(
      endpoint,
      {
        ...options,
        method: "DELETE",
      },
      config,
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
