import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ShopPage from "@/components/dashboard/seller/shop/shop-page";

export default async function SellerShopPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return <ShopPage sellerId={session.user.id} />;
}