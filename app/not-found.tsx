import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">
        404 • Page Not Found
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
        Furniture Piece Not Located
      </h1>
      <p className="text-stone-600 max-w-md mb-8">
        The page or item you are looking for might have been relocated, renamed, or is currently unavailable.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-amber-300 font-medium text-sm hover:bg-stone-800 transition-colors shadow-md"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-800 font-medium text-sm hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Browse All Furniture</span>
        </Link>
      </div>
    </div>
  );
}
