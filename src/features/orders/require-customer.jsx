"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSession } from "@/lib/auth-client";

// Client-side gate for customer-only pages. The backend enforces the same rule on every endpoint.
const RequireCustomer = ({ children }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const role = String(session?.user?.role ?? "").toLowerCase();

  useEffect(() => {
    if (!isPending && !session?.user) router.replace("/login");
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  if (role !== "customer") {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-2xl font-bold text-[#001B08]">Customer accounts only</h1>
        <p className="mt-2 text-sm text-gray-500">
          Orders and checkout are available to customer accounts. Use your dashboard to manage the platform.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 rounded-md bg-[#001B08] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E8BB44] hover:text-[#001B08]"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return children;
};

export default RequireCustomer;
