"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
  whatsAppNumber: string;
}

export function FeaturedProducts({
  products,
  whatsAppNumber,
}: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<"featured" | "new">("featured");

  const featuredList = products.filter((p) => p.is_featured);
  const newArrivalsList = products.filter((p) => p.is_new_arrival);

  const displayedList = activeTab === "featured" ? featuredList : newArrivalsList;

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Handcrafted Showroom Highlights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Curated Masterpieces
            </h2>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center gap-2 bg-sand-100 p-1.5 rounded-2xl border border-sand-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "featured"
                  ? "bg-brand-900 text-white shadow-sm"
                  : "text-charcoal-700 hover:text-charcoal-900"
              }`}
            >
              Featured Collection ({featuredList.length})
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "new"
                  ? "bg-brand-900 text-white shadow-sm"
                  : "text-charcoal-700 hover:text-charcoal-900"
              }`}
            >
              New Arrivals ({newArrivalsList.length})
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayedList.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              whatsAppNumber={whatsAppNumber}
            />
          ))}
        </div>

        {/* View Full Catalog CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore Complete Furniture Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
