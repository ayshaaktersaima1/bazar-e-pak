import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";
import ProductList from "../../../../../features/dashboard/seller/product/product-list";

const SellerProductsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const sellerId = session.user.id;

  const shopResponse = await serverApi.get(
    `/api/shops?sellerId=${encodeURIComponent(sellerId)}&page=1&limit=1`,
    {},
    {
      auth: true,
      includeMeta: true,
    },
  );

  const shop = shopResponse?.data?.[0];

  if (!shop?._id) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#002B12]">
              Create your shop first
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Create a shop before managing products.
            </p>

            <Link
              href="/dashboard/seller/shop"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-[#002B12] px-5 text-sm font-semibold text-white"
            >
              Manage Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const [productResponse, categoryResponse] = await Promise.all([
    serverApi.get(
      `/api/products?shopId=${encodeURIComponent(shop._id)}&page=1&limit=${20}`,
      {},
      {
        auth: true,
        includeMeta: true,
      },
    ),

    serverApi.get(
      "/api/categories?status=active&page=1&limit=100",
      {},
      {
        auth: false,
        includeMeta: true,
      },
    ),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <ProductList
        shopId={String(shop._id)}
        shopName={shop.name ?? ""}
        initialProducts={productResponse?.data ?? []}
        initialPagination={productResponse?.pagination ?? {}}
        categories={categoryResponse?.data ?? []}
      />
    </div>
  );
};

export default SellerProductsPage;
