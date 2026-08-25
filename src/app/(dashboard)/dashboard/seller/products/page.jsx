import Link from "next/link";
import { Plus, Store } from "lucide-react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { serverApi } from "@/lib/server";
import ProductManagement from "@/components/dashboard/seller/product-management";

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

  if (!shop) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl border border-[#D9A928]/20 bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,43,18,0.06)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#002B12]/5">
              <Store className="h-6 w-6 text-[#D9A928]" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#002B12]">
              Create your shop first
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
              You need an active shop before you can create and manage products.
            </p>

            <Link
              href="/dashboard/seller/shop"
              className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#002B12] px-5 text-sm font-semibold text-white transition-all hover:bg-[#00451E] hover:shadow-md"
            >
              <Store className="h-4 w-4" />
              Manage Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const [productResponse, categoryResponse] = await Promise.all([
    serverApi.get(
      `/api/products?shopId=${encodeURIComponent(shop._id)}&page=1&limit=20`,
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
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#002B12]">Products</h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage your shop products and inventory.
          </p>
        </div>

        <Link
          href="/dashboard/seller/products/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#D9A928] px-5 text-sm font-semibold text-[#001B08] transition-all hover:bg-[#E8BB44]"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <ProductManagement
        shop={shop}
        initialProducts={productResponse?.data ?? []}
        initialPagination={
          productResponse?.pagination ?? {
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 1,
          }
        }
        categories={categoryResponse?.data ?? []}
      />
    </div>
  );
};

export default SellerProductsPage;
