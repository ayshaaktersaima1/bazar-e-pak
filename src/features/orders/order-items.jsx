import Link from "next/link";

import { formatMinor } from "@/utils/payments";

const OrderItems = ({ items = [], totalMinor, refundedMinor = 0 }) => (
  <div className="overflow-hidden rounded-xl border border-gray-100">
    <div className="divide-y divide-gray-100">
      {items.map((item) => (
        <div key={`${item.productId}-${item.shopId}`} className="flex items-center justify-between gap-4 p-4 text-sm">
          <div className="min-w-0">
            <Link href={`/products/${item.productId}`} className="block truncate font-semibold text-[#001B08] hover:text-[#B78A10]">
              {item.productName || "Product"}
            </Link>
            <p className="mt-0.5 text-xs text-gray-500">
              {item.quantity} × {formatMinor(item.unitPriceMinor)}
              {item.discount > 0 && ` (${item.discount}% off)`}
            </p>
          </div>
          <p className="shrink-0 font-semibold text-[#001B08]">{formatMinor(item.lineTotalMinor)}</p>
        </div>
      ))}
    </div>

    <div className="space-y-1 bg-[#F7F5EF] p-4 text-sm">
      {refundedMinor > 0 && (
        <div className="flex justify-between text-gray-600">
          <span>Refunded</span>
          <span>− {formatMinor(refundedMinor)}</span>
        </div>
      )}
      <div className="flex justify-between text-base font-bold text-[#001B08]">
        <span>Total</span>
        <span>{formatMinor(totalMinor)}</span>
      </div>
    </div>
  </div>
);

export default OrderItems;
