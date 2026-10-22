import CustomerOrderDetail from "@/features/orders/customer-order-detail";
import RequireCustomer from "@/features/orders/require-customer";

export const metadata = { title: "Order | Bazar-e-Pak" };

const OrderDetailPage = async ({ params }) => {
  const { orderId } = await params;

  return (
    <div className="min-h-screen bg-[#F7F5EF] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RequireCustomer>
          <CustomerOrderDetail orderId={orderId} />
        </RequireCustomer>
      </div>
    </div>
  );
};

export default OrderDetailPage;
