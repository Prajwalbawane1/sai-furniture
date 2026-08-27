"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { Category } from "@/types";

interface ProductFilterProps {
  categories: Category[];
  totalProductsCount: number;
}

export function ProductFilter({
  categories,
  totalProductsCount,
}: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchVal = formData.get("search") as string;
    updateFilters("search", searchVal.trim());
  };

  const handleClearAll = () => {
    router.push(pathname);
  };

  const hasActiveFilters = currentSearch || (currentCategory && currentCategory !== "all") || currentSort !== "newest";

  return (
    <div className="space-y-4 mb-8">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
          <input
            type="text"
            name="search"
            defaultValue={currentSearch}
            placeholder="Search by furniture name, material, or keyword..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-sand-300 bg-white text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 shadow-sm"
          />
          {currentSearch && (
            <button
              type="button"
              onClick={() => updateFilters("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Sort and Count */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-sand-300 shadow-sm text-xs text-charcoal-700">
            <ArrowUpDown className="h-3.5 w-3.5 text-brand-600" />
            <select
              value={currentSort}
              onChange={(e) => updateFilters("sort", e.target.value)}
              className="bg-transparent font-medium text-charcoal-800 focus:outline-none cursor-pointer pr-1"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline px-2 py-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => updateFilters("category", "all")}
          className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
            currentCategory === "all" || !currentCategory
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-white text-charcoal-700 border border-sand-300 hover:bg-sand-50 hover:border-brand-400"
          }`}
        >
          All Items ({totalProductsCount})
        </button>

        {categories.map((cat) => {
          const isSelected = currentCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => updateFilters("category", cat.slug)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-brand-900 text-white shadow-sm"
                  : "bg-white text-charcoal-700 border border-sand-300 hover:bg-sand-50 hover:border-brand-400"
              }`}
            >
              <span>{cat.name}</span>
              {cat.product_count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-brand-800 text-sand-200"
                      : "bg-sand-100 text-charcoal-600"
                  }`}
                >
                  {cat.product_count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
