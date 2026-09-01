import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5EF] px-5">
      <div className="w-full max-w-lg text-center">
        {/* 404 */}
        <div className="relative">
          <h1 className="text-8xl font-black tracking-tight text-[#001B08] sm:text-9xl">
            404
          </h1>

          <div className="mx-auto mt-[-12px] h-1 w-20 rounded-full bg-[#E8BB44]" />
        </div>

        {/* Content */}
        <h2 className="mt-7 text-2xl font-bold text-[#001B08] sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or may
          have been moved.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001B08] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E8BB44] hover:text-[#001B08]"
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#001B08] px-6 py-3 text-sm font-semibold text-[#001B08] transition hover:bg-[#001B08] hover:text-white"
          >
            <FaSearch />
            Browse Products
          </Link>
        </div>

        {/* Brand */}
        <p className="mt-10 text-xs font-medium tracking-wide text-gray-400">
          BAZAAR E PAK
        </p>
      </div>
    </main>
  );
}