"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import useApi from "@/hooks/use-api";
import ShopForm from "@/features/dashboard/seller/shop/shop-form";

export default function CreateSellerShopPage() {
    const api = useApi();

    const [loading, setLoading] = useState(false);

    const [seller, setSeller] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [sellerErrors, setSellerErrors] = useState({});

    const handleSellerChange = (event) => {
        const { name, value } = event.target;

        let newValue = value;

        if (name === "phoneNumber") {
            newValue = value.replace(/\D/g, "").slice(0, 11);
        }

        setSeller((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        setSellerErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateSeller = () => {
        const errors = {};

        if (!seller.name.trim()) {
            errors.name = "Seller name is required.";
        } else if (seller.name.trim().length < 2) {
            errors.name =
                "Seller name must be at least 2 characters.";
        }

        if (!seller.email.trim()) {
            errors.email = "Seller email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                seller.email.trim(),
            )
        ) {
            errors.email =
                "Enter a valid email address.";
        }

        if (!seller.phoneNumber.trim()) {
            errors.phoneNumber =
                "Phone number is required.";
        } else if (
            !/^03\d{9}$/.test(
                seller.phoneNumber.trim(),
            )
        ) {
            errors.phoneNumber =
                "Enter a valid 11-digit Pakistani mobile number starting with 03.";
        }

        if (!seller.password) {
            errors.password =
                "Password is required.";
        } else if (
            seller.password.length < 8
        ) {
            errors.password =
                "Password must be at least 8 characters.";
        }

        setSellerErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleCreateSellerAndShop = async (
        shopData,
    ) => {
        const isSellerValid = validateSeller();

        if (!isSellerValid) {
            toast.error(
                "Please fix the seller information.",
            );
            return;
        }

        let createdSellerId = null;

        try {
            setLoading(true);

            const {
                data: createdUser,
                error: sellerError,
            } =
                await authClient.admin.createUser({
                    name: seller.name.trim(),
                    email: seller.email.trim(),
                    password: seller.password,
                    role: "seller",

                    data: {
                        phoneNumber:
                            seller.phoneNumber.trim(),
                    },
                });

            if (sellerError) {
                toast.error(
                    sellerError.message ||
                    "Failed to create seller account.",
                );
                return;
            }

            const newSeller =
                createdUser?.user ||
                createdUser;

            createdSellerId =
                newSeller?.id ||
                newSeller?._id;

            if (!createdSellerId) {
                toast.error(
                    "Seller was created, but seller ID was not returned.",
                );
                return;
            }

            const shopResponse =
                await api.post(
                    "/api/shops",
                    {
                        ...shopData,
                        sellerId:
                            createdSellerId,
                    },
                    {},
                    {
                        auth: true,
                        showSuccess: false,
                        showError: false,
                    },
                );

            const createdShop =
                shopResponse?.data ||
                shopResponse;

            if (!createdShop?._id) {
                throw new Error(
                    "Shop could not be created.",
                );
            }

            toast.success(
                "Seller account and shop created successfully.",
            );

            setSeller({
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
            });

            setSellerErrors({});
        } catch (error) {
            console.error(
                "Create seller and shop error:",
                error,
            );

            if (createdSellerId) {
                try {
                    await authClient.admin.removeUser(
                        {
                            userId:
                                createdSellerId,
                        },
                    );
                } catch (
                rollbackError
                ) {
                    console.error(
                        "Seller rollback failed:",
                        rollbackError,
                    );
                }
            }

            toast.error(
                error?.message ||
                "Failed to create seller and shop.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">
                    Create Seller & Shop
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Create a seller account and
                    assign a new shop to that
                    seller.
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
                <div className="mb-8">
                    <h2 className="text-base font-semibold text-zinc-900">
                        Seller Account
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        These credentials will be
                        used by the seller to log
                        in.
                    </p>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                Seller Name
                            </label>

                            <input
                                name="name"
                                type="text"
                                value={
                                    seller.name
                                }
                                onChange={
                                    handleSellerChange
                                }
                                placeholder="Seller name"
                                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15"
                            />

                            {sellerErrors.name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        sellerErrors.name
                                    }
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                Seller Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={
                                    seller.email
                                }
                                onChange={
                                    handleSellerChange
                                }
                                placeholder="seller@example.com"
                                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15"
                            />

                            {sellerErrors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        sellerErrors.email
                                    }
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                Phone Number
                            </label>

                            <input
                                name="phoneNumber"
                                type="tel"
                                inputMode="numeric"
                                maxLength={11}
                                value={
                                    seller.phoneNumber
                                }
                                onChange={
                                    handleSellerChange
                                }
                                placeholder="03001234567"
                                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15"
                            />

                            {sellerErrors.phoneNumber && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        sellerErrors.phoneNumber
                                    }
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                                Password
                            </label>

                            <input
                                name="password"
                                type="password"
                                value={
                                    seller.password
                                }
                                onChange={
                                    handleSellerChange
                                }
                                placeholder="Create seller password"
                                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#D9A928] focus:ring-2 focus:ring-[#D9A928]/15"
                            />

                            {sellerErrors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        sellerErrors.password
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-8 border-t border-zinc-100 pt-8">
                    <h2 className="text-base font-semibold text-zinc-900">
                        Shop Information
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Create the shop that will
                        belong to this seller.
                    </p>
                </div>

                <ShopForm
                    onSubmit={
                        handleCreateSellerAndShop
                    }
                    loading={loading}
                    submitLabel="Create Seller & Shop"
                />
            </div>
        </div>
    );
}