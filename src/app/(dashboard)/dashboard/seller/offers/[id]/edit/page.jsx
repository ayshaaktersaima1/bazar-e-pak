import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import EditOfferPage from "@/features/dashboard/offers/edit-offer-page";

const SellerEditOfferPage =
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
            "seller"
        ) {
            redirect(
                "/dashboard",
            );
        }

        return (
            <EditOfferPage
                role="seller"
            />
        );
    };

export default SellerEditOfferPage;