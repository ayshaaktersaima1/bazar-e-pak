import AllNativeProductsTable from "@/features/dashboard/superadmin/native-products/all-native-products-table";
import { serverApi } from "@/lib/server";

const NativeProductsPage = async () => {
    const result = await serverApi.get(
        "/api/native-products?page=1&limit=20",
        {},
        {
            auth: true,
            includeMeta: true,
        },
    );

    const products = Array.isArray(result?.data)
        ? result.data
        : [];

    const pagination = result?.pagination ?? {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#001B08]">
                    Native Products
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage products created directly by PakBazaar.
                </p>
            </div>

            <AllNativeProductsTable
                initialProducts={products}
                initialPagination={pagination}
            />
        </div>
    );
};

export default NativeProductsPage;