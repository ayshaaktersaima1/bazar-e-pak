"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import PayfastPayment from "@/features/orders/payfast-payment";
import RequireCustomer from "@/features/orders/require-customer";
import useApi from "@/hooks/use-api";
import { formatMinor } from "@/utils/payments";

const PayContent = ({ orderId }) => {
  const { get } = useApi();
  const [order, setOrder] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let alive = true;

    get(`/api/orders/${orderId}`, {}, { showError: false }).then((result) => {
      if (!alive) return;

      if (result.success) setOrder(result.data);
      else setMissing(true);
    });

    return () => {
      alive = false;
    };
  }, [get, orderId]);

  if (missing) return <p className="text-center text-gray-600">We could not find this order.</p>;

  if (!order) return <p className="text-center text-sm text-gray-500">Loading order…</p>;

  const payable =
    order.paymentMethod === "payfast" && order.status === "pending" && ["unpaid", "failed", "pending"].includes(order.paymentStatus);

  if (!payable) {
    return (
      <div className="text-center">
        <p className="text-gray-600">This order does not need a payment right now.</p>
        <Link href={`/orders/${order.id}`} className="mt-4 inline-block font-semibold text-[#001B08] underline">View order</Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 border-b border-gray-100 pb-4 text-sm">
        <p className="font-semibold text-[#001B08]">Order {order.orderNumber}</p>
        <p className="text-gray-500">Total {formatMinor(order.totalMinor)}</p>
      </div>
      <PayfastPayment order={order} />
    </>
  );
};

const PayPage = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-[80vh] bg-[#F7F5EF] py-16">
      <div className="mx-auto w-full max-w-lg rounded-xl bg-white p-8 shadow-sm">
        <RequireCustomer>
          <PayContent orderId={orderId} />
        </RequireCustomer>
      </div>
    </div>
  );
};

export default PayPage;
