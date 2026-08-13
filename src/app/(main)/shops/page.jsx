import shops from "@/data/shops";
import ShopCard from "../../../components/shared/ShopCard";

const ShopsPage = () => {
  return (
    <main className="min-h-screen bg-[#F7F5EF] py-16">
      {/* Heading */}
      <section className="mx-auto w-[90%] text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44] md:text-base">
          Discover Local Stores
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#001B08] md:text-5xl">
          Explore Our Shops
        </h1>

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-[#001B08]" />
          <span className="text-[#E8BB44]">★</span>
          <span className="h-px w-14 bg-[#001B08]" />
        </div>

      </section>

      {/* Shops */}
      <section className="mx-auto mt-12 w-[90%]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} variant="homepage" />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ShopsPage;
