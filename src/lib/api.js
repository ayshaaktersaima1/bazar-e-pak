export const getData = async (endpoint, token) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "GET",
        headers,
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch data");
    }

    return data.data || [];
};