"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../../lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    const role = session?.user?.role ?? "customer";

    if (role === "seller" || role === "admin" || role === "customer") {
      router.replace(`/dashboard/${role}`);
      return;
    }

    router.replace("/dashboard/customer");
  }, [session, status, router]);

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <p className="text-sm text-zinc-500">Loading dashboard...</p>
    </div>
  );
}
