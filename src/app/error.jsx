"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5EF] px-5">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#001B08] text-[#E8BB44] shadow-lg">
          <FaExclamationTriangle className="text-3xl" />
        </div>

        {/* Content */}
        <h1 className="mt-7 text-3xl font-bold text-[#001B08] sm:text-4xl">
          Something Went Wrong
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
          We couldn&apos;t load this page properly. Please try again or return
          to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001B08] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E8BB44] hover:text-[#001B08]"
          >
            <FaRedo />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#001B08] px-6 py-3 text-sm font-semibold text-[#001B08] transition hover:bg-[#001B08] hover:text-white"
          >
            <FaHome />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}