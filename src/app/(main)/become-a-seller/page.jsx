"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Store } from "lucide-react";

import {
    authClient,
    useSession,
} from "@/lib/auth-client";
import useApi from "@/hooks/use-api";
import SellerApplicationForm from "@/features/seller-application/seller-application-form";

export default function BecomeSellerPage() {
    const router = useRouter();

    const {
        data: session,
        isPending,
        refetch,
    } = useSession();

    const {
        get,
        post,
        loading,
    } = useApi();

    const [application, setApplication] =
        useState(null);

    const [
        checkingApplication,
        setCheckingApplication,
    ] = useState(true);

    const role = String(
        session?.user?.role ?? "",
    )
        .trim()
        .toLowerCase();

    useEffect(() => {
        if (isPending) return;

        if (!session?.user) {
            router.replace("/login");
            return;
        }

        if (
            role !== "customer" &&
            role !== "seller"
        ) {
            router.replace("/");
            return;
        }

        const fetchApplication = async () => {
            const result = await get(
                "/api/seller-applications/me",
                {},
                {
                    showError: false,
                },
            );

            if (result.success) {
                setApplication(result.data);

                if (
                    result.data?.status === "approved" &&
                    role === "customer"
                ) {
                    await authClient.getSession({
                        query: {
                            disableCookieCache: true,
                        },
                    });

                    await refetch();
                }
            } else {
                setApplication(null);
            }

            setCheckingApplication(false);
        };

        const timer = setTimeout(() => {
            fetchApplication();
        }, 0);

        const interval = setInterval(() => {
            fetchApplication();
        }, 10000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [
        isPending,
        session?.user,
        role,
        router,
        get,
        refetch,
    ]);

    const handleSubmit = async (formData) => {
        const result = await post(
            "/api/seller-applications",
            formData,
            {},
            {
                showSuccess: true,
                successMessage:
                    "Seller application submitted successfully",
            },
        );

        if (!result.success) {
            return;
        }

        setApplication(result.data);
    };

    if (
        isPending ||
        checkingApplication
    ) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-[#F7F5EF]">
                <p className="text-sm text-zinc-500">
                    Loading...
                </p>
            </div>
        );
    }

    if (!session?.user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-[#F7F5EF] px-4 py-10 md:px-6">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#D9A928]">
                        <Store className="h-4 w-4" />

                        Seller Application
                    </div>

                    <h1 className="text-3xl font-bold text-[#001B08]">
                        Become a Seller
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                        Apply to become a PakBazaar seller.
                        Your application will be reviewed
                        before seller access is activated.
                    </p>
                </div>

                {/* Existing Application */}
                {application ? (
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="text-xl font-semibold text-[#001B08]">
                            Application Status
                        </h2>

                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                                    Business Name
                                </p>

                                <p className="mt-1 text-sm font-medium text-zinc-800">
                                    {application.businessName}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                                    Business Type
                                </p>

                                <p className="mt-1 text-sm font-medium text-zinc-800">
                                    {application.businessType ||
                                        "Not specified"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                                    Status
                                </p>

                                <span
                                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${application.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : application.status === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : application.status === "suspended"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-amber-100 text-amber-700"
                                        }`}
                                >
                                    {application.status}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                                    Submitted
                                </p>

                                <p className="mt-1 text-sm font-medium text-zinc-800">
                                    {application.submittedAt
                                        ? new Date(
                                            application.submittedAt,
                                        ).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>
                        </div>

                        {application.rejectionReason && (
                            <div className="mt-6 rounded-xl bg-red-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                                    Review Note
                                </p>

                                <p className="mt-2 text-sm text-red-700">
                                    {application.rejectionReason}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* New Application */
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                        <SellerApplicationForm
                            user={session.user}
                            onSubmit={handleSubmit}
                            loading={loading}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}