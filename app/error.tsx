"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">
        Notice
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
        Something went wrong
      </h2>
      <p className="text-stone-600 max-w-md mb-8 text-sm">
        We encountered an issue while loading this view. Please try reloading or head back to the showroom homepage.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-amber-300 font-medium text-sm hover:bg-stone-800 transition-colors shadow-md"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-800 font-medium text-sm hover:bg-stone-100 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
