"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-stone-900 text-stone-100 p-6 font-sans">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-amber-400">Application Error</h2>
          <p className="text-sm text-stone-300">
            A critical error occurred. Please refresh the page to reload the application.
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-amber-500 text-stone-950 font-semibold rounded-xl hover:bg-amber-400 transition-colors"
          >
            Reload App
          </button>
        </div>
      </body>
    </html>
  );
}
