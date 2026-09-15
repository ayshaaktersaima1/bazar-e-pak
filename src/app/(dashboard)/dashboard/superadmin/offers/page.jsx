import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import AllOffersTable from "@/features/dashboard/offers/all-offers-table";

const SuperAdminOffersPage =
    async () => {
        const requestHeaders =
            await headers();

        const session =
            await auth.api.getSession({
                headers:
                    requestHeaders,
            });

        if (!session?.user) {
            redirect("/login");
        }

        if (
            session.user.role !==
            "super_admin"
        ) {
            redirect(
                "/dashboard",
            );
        }

        return (
            <div className="bg-[#F7F5EF] p-6">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#E8BB44]">
                            Offer Management
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-[#001B08]">
                            Offers & Discounts
                        </h1>

                        <p className="mt-2 text-sm text-[#4B5563]">
                            Manage promotional
                            offers across all
                            seller products.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/superadmin/offers/create"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D9A928] px-5 text-sm font-semibold text-[#001B08] transition hover:bg-[#E8BB44]"
                    >
                        <Plus
                            size={17}
                        />

                        Create Offer
                    </Link>
                </div>

                <AllOffersTable
                    role="superadmin"
                />
            </div>
        );
    };

export default SuperAdminOffersPage;