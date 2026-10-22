"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  FaExclamationTriangle,
  FaHome,
  FaRedo,
} from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5EF] px-5 py-12">
      <section className="w-full max-w-lg text-center">
        {/* Error Icon */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#E8BB44]/20" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#001B08] text-[#E8BB44] shadow-lg shadow-[#001B08]/10">
            <FaExclamationTriangle className="text-2xl" />
          </div>
        </div>

        {/* Error Message */}
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#9A7414]">
          Unexpected Error
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#001B08] sm:text-4xl">
          Oops! Something went wrong.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          We couldn&apos;t complete your request this time.
          We&apos;re sorry for the inconvenience. Please try again
          or return to the homepage to continue browsing.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#001B08] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#123D20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001B08] active:scale-[0.98]"
          >
            <FaRedo className="text-xs" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#001B08]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#001B08] transition duration-200 hover:border-[#001B08] hover:bg-[#001B08]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001B08] active:scale-[0.98]"
          >
            <FaHome className="text-sm" />
            Back to Home
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-[#001B08]/10 pt-5">
          <p className="text-xs leading-6 text-gray-500">
            If the problem persists, please try again in a few
            moments. Thank you for your patience.
          </p>
        </div>
      </section>
    </main>
  );
}