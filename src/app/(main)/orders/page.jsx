import CustomerOrdersList from "@/features/orders/customer-orders-list";
import RequireCustomer from "@/features/orders/require-customer";

export const metadata = { title: "My Orders | Bazar-e-Pak" };

const OrdersPage = () => (
  <div className="min-h-screen bg-[#F7F5EF] py-12">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8BB44]">Your account</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#001B08] sm:text-4xl">My Orders</h1>
        <div className="mx-auto mt-3 h-0.5 w-16 bg-[#E8BB44]" />
      </div>

      <RequireCustomer>
        <CustomerOrdersList />
      </RequireCustomer>
    </div>
  </div>
);

export default OrdersPage;
