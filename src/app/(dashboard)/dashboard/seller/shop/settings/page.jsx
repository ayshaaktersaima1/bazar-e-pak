import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ShopSettings from "../../../../../../features/dashboard/seller/shop/shop-settings";


export default async function ShopSettingsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    return <ShopSettings sellerId={session.user.id} />;
}