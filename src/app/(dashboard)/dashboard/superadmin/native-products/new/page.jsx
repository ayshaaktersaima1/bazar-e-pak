
import NativeProductFormWrapper from "@/features/dashboard/superadmin/native-products/native-product-form-wrapper";
import { serverApi } from "@/lib/server";

const NewNativeProductPage = async () => {
    const result = await serverApi.get(
        "/api/categories",
        {},
        {
            auth: true,
            includeMeta: true,
        },
    );

    const categories = Array.isArray(result?.data)
        ? result.data
        : [];

    const activeCategories =
        categories.filter(
            (category) =>
                category.status === "active",
        );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#001B08]">
                    Add Native Product
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Create a product managed directly by PakBazaar.
                </p>
            </div>

            <div className="rounded-2xl border border-[#E5E2D8] bg-white p-6">
                <NativeProductFormWrapper
                    categories={
                        activeCategories
                    }
                />
            </div>
        </div>
    );
};

export default NewNativeProductPage;