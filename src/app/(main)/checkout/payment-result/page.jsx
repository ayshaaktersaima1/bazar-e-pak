"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import PayfastProgress from "@/features/orders/payfast-progress";
import RequireCustomer from "@/features/orders/require-customer";

// The API redirects here after the 3-D Secure bank page. The outcome always comes from the server.
const ResultContent = () => {
  const params = useSearchParams();
  const paymentId = params.get("paymentId");
  const orderId = params.get("orderId");
  const valid = /^[0-9a-f]{24}$/i.test(paymentId || "") && /^[0-9a-f]{24}$/i.test(orderId || "");

  return (
    <div className="min-h-[80vh] bg-[#F7F5EF] py-16">
      <div className="mx-auto w-full max-w-lg rounded-xl bg-white p-8 shadow-sm">
        {valid ? (
          <RequireCustomer>
            <PayfastProgress paymentId={paymentId} orderHref={`/orders/${orderId}`} retryHref={`/orders/${orderId}/pay`} />
          </RequireCustomer>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">This payment link is not valid.</p>
            <Link href="/orders" className="mt-4 inline-block font-semibold text-[#001B08] underline">Go to my orders</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentResultPage = () => (
  <Suspense fallback={null}>
    <ResultContent />
  </Suspense>
);

export default PaymentResultPage;
