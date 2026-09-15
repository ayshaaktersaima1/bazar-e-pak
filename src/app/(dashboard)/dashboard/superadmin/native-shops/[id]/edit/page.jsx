"use client";

import {
    useEffect,
    useState,
} from "react";
import {
    useParams,
    useRouter,
} from "next/navigation";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";
import ShopForm from "@/features/dashboard/seller/shop/shop-form";

export default function EditNativeShopPage() {
    const params = useParams();
    const router = useRouter();

    const {
        get,
        patch,
    } = useApi();

    const shopId = params?.id;

    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const loadShop = async () => {
            try {
                const response = await get(
                    `/api/native-shops/${shopId}`,
                    {},
                    {
                        auth: true,
                        showError: false,
                    },
                );

                if (cancelled) return;

                const shopData =
                    response?.data || response;

                setShop(shopData || null);
            } catch (error) {
                if (cancelled) return;

                console.error(
                    "Fetch native shop error:",
                    error,
                );

                toast.error(
                    error?.message ||
                    "Failed to load native shop.",
                );

                setShop(null);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        if (shopId) {
            loadShop();
        }

        return () => {
            cancelled = true;
        };
    }, [get, shopId]);

    const handleUpdate = async (shopData) => {
        try {
            setSaving(true);

            const response = await patch(
                `/api/native-shops/${shopId}`,
                shopData,
                {},
                {
                    auth: true,
                    showSuccess: false,
                    showError: false,
                },
            );

            const updatedShop =
                response?.data || response;

            if (!updatedShop?._id) {
                throw new Error(
                    "Native shop could not be updated.",
                );
            }

            toast.success(
                "Native shop updated successfully.",
            );

            router.push(
                "/dashboard/superadmin/native-shops",
            );
        } catch (error) {
            console.error(
                "Update native shop error:",
                error,
            );

            toast.error(
                error?.message ||
                "Failed to update native shop.",
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-[#002B12]" />
            </div>
        );
    }

    if (!shop) {
        return (
            <div className="mx-auto max-w-4xl">
                <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center">
                    <h1 className="text-lg font-semibold text-zinc-900">
                        Native Shop Not Found
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        This native shop does not exist
                        or has been deleted.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">
                    Edit Native Shop
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Update this PakBazaar-owned shop.
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
                <ShopForm
                    initialData={shop}
                    showSlug
                    onSubmit={handleUpdate}
                    loading={saving}
                    submitLabel="Update Native Shop"
                />
            </div>
        </div>
    );
}