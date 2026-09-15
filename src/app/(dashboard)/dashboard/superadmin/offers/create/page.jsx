"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import OfferForm from "@/features/dashboard/offers/offer-form";
import useApi from "@/hooks/use-api";

const SuperAdminCreateOfferPage =
    () => {
        const router =
            useRouter();

        const api =
            useApi();

        const [
            products,
            setProducts,
        ] = useState([]);

        const [
            loadingProducts,
            setLoadingProducts,
        ] = useState(true);

        const [
            saving,
            setSaving,
        ] = useState(false);

        useEffect(() => {
            const timer =
                setTimeout(
                    async () => {
                        setLoadingProducts(
                            true,
                        );

                        const result =
                            await api.get(
                                "/api/products?limit=100",
                                {},
                                {
                                    auth: true,
                                    showError:
                                        true,
                                },
                            );

                        const data =
                            Array.isArray(
                                result
                                    ?.data,
                            )
                                ? result.data
                                : [];

                        setProducts(
                            data,
                        );

                        setLoadingProducts(
                            false,
                        );
                    },
                    0,
                );

            return () =>
                clearTimeout(
                    timer,
                );
        }, []);

        const handleSubmit =
            async (
                offerData,
            ) => {
                setSaving(
                    true,
                );

                const result =
                    await api.post(
                        "/api/offers",
                        offerData,
                        {},
                        {
                            auth: true,
                            showSuccess:
                                false,
                        },
                    );

                setSaving(
                    false,
                );

                if (
                    !result
                        ?.success
                ) {
                    return;
                }

                toast.success(
                    "Offer created successfully.",
                );

                router.push(
                    "/dashboard/superadmin/offers",
                );

                router.refresh();
            };

        if (
            loadingProducts
        ) {
            return (
                <div className="bg-[#F7F5EF] p-6">
                    <p className="text-sm text-gray-500">
                        Loading products...
                    </p>
                </div>
            );
        }

        return (
            <div className="bg-[#F7F5EF] p-6">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                        Offer Management
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                        Create Offer
                    </h1>

                    <p className="mt-2 text-sm text-[#4B5563]">
                        Create a
                        promotional offer
                        for a seller
                        product.
                    </p>
                </div>

                {products.length ===
                    0 ? (
                    <div className="rounded-2xl border border-[#E5E2D8] bg-white p-6">
                        <p className="font-semibold text-[#001B08]">
                            No products
                            available.
                        </p>
                    </div>
                ) : (
                    <OfferForm
                        products={
                            products
                        }
                        loading={
                            saving
                        }
                        onSubmit={
                            handleSubmit
                        }
                        onCancel={() =>
                            router.push(
                                "/dashboard/superadmin/offers",
                            )
                        }
                    />
                )}
            </div>
        );
    };

export default SuperAdminCreateOfferPage;