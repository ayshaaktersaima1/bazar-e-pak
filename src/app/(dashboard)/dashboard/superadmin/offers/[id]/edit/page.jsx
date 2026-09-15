import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import EditOfferPage from "@/features/dashboard/offers/edit-offer-page";

const SuperAdminEditOfferPage =
    async () => {
        const session =
            await auth.api.getSession({
                headers:
                    await headers(),
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
            <EditOfferPage
                role="superadmin"
            />
        );
    };

export default SuperAdminEditOfferPage;