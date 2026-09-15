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

import OfferForm from "./offer-form";
import useApi from "@/hooks/use-api";

const EditOfferPage = ({
    role = "seller",
}) => {
    const router =
        useRouter();

    const params =
        useParams();

    const api =
        useApi();

    const offerId =
        params?.id;

    const [
        offer,
        setOffer,
    ] = useState(null);

    const [
        products,
        setProducts,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        saving,
        setSaving,
    ] = useState(false);

    useEffect(() => {
        if (!offerId) {
            return;
        }

        const timer =
            setTimeout(
                async () => {
                    setLoading(
                        true,
                    );

                    const offersResult =
                        await api.get(
                            "/api/offers?limit=100",
                            {},
                            {
                                auth: true,
                                showError:
                                    true,
                            },
                        );

                    const offerList =
                        Array.isArray(
                            offersResult
                                ?.data,
                        )
                            ? offersResult.data
                            : [];

                    const currentOffer =
                        offerList.find(
                            (item) =>
                                String(
                                    item._id,
                                ) ===
                                String(
                                    offerId,
                                ),
                        );

                    if (
                        !currentOffer
                    ) {
                        toast.error(
                            "Offer not found.",
                        );

                        router.push(
                            `/dashboard/${role}/offers`,
                        );

                        return;
                    }

                    setOffer(
                        currentOffer,
                    );

                    const productsResult =
                        await api.get(
                            "/api/products?limit=100",
                            {},
                            {
                                auth: true,
                                showError:
                                    true,
                            },
                        );

                    const productList =
                        Array.isArray(
                            productsResult
                                ?.data,
                        )
                            ? productsResult.data
                            : [];

                    setProducts(
                        productList,
                    );

                    setLoading(
                        false,
                    );
                },
                0,
            );

        return () =>
            clearTimeout(
                timer,
            );
    }, [
        offerId,
        role,
    ]);

    const handleSubmit =
        async (
            offerData,
        ) => {
            if (!offerId) {
                return;
            }

            setSaving(
                true,
            );

            const result =
                await api.patch(
                    `/api/offers/${offerId}`,
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
                !result?.success
            ) {
                return;
            }

            toast.success(
                "Offer updated successfully.",
            );

            router.push(
                `/dashboard/${role}/offers`,
            );

            router.refresh();
        };

    if (loading) {
        return (
            <div className="bg-[#F7F5EF] p-6">
                <p className="text-sm text-gray-500">
                    Loading offer...
                </p>
            </div>
        );
    }

    if (!offer) {
        return null;
    }

    return (
        <div className="bg-[#F7F5EF] p-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                    Offer Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                    Edit Offer
                </h1>

                <p className="mt-2 text-sm text-[#4B5563]">
                    Update discount,
                    dates and status for
                    this offer.
                </p>
            </div>

            <OfferForm
                offer={
                    offer
                }
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
                        `/dashboard/${role}/offers`,
                    )
                }
            />
        </div>
    );
};

export default EditOfferPage;