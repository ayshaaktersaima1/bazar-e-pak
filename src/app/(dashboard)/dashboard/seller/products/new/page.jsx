import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";
import NewProductClient from "./new-product-client";

const NewProductPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    const sellerId = session.user.id;

    const shopResponse = await serverApi.get(
        `/api/shops?sellerId=${encodeURIComponent(
            sellerId,
        )}&page=1&limit=1`,
        {},
        {
            auth: true,
            includeMeta: true,
        },
    );

    const shop =
        shopResponse?.data?.[0] ?? null;

    if (!shop?._id) {
        redirect("/dashboard/seller/shop");
    }

    const categoryResponse =
        await serverApi.get(
            "/api/categories?status=active&page=1&limit=100",
            {},
            {
                auth: false,
                includeMeta: true,
            },
        );

    return (
        <div className="mx-auto w-full max-w-5xl">
            <NewProductClient
                shopId={String(shop._id)}
                shopName={shop.name ?? ""}
                categories={
                    categoryResponse?.data ?? []
                }
            />
        </div>
    );
};

export default NewProductPage;