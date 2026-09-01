import Image from "next/image";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5EF] px-5">
      <div className="flex flex-col items-center text-center">
        {/* Spinner */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-gray-200 border-t-[#001B08]" />

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#001B08]">
            <Image
              src={"/images/logo.webp"}
              alt="Bazar-e-Pak"
              width={100}
              height={100}
            />
          </div>
        </div>

        <h2 className="mt-6 text-xl font-bold text-[#001B08]">
          Loading Bazaar E Pak
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while we get things ready...
        </p>
      </div>
    </main>
  );
}
