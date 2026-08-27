"use client";

import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { SearchX, MessageCircle } from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  whatsAppNumber?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ProductGrid({
  products,
  whatsAppNumber = "919876543210",
  emptyTitle = "No furniture found",
  emptyDescription = "We couldn't find any products matching your current selection. Looking for custom sizes?",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white border border-sand-200 p-12 text-center my-8 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sand-100 text-brand-700 mb-4">
          <SearchX className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
          {emptyTitle}
        </h3>
        <p className="text-sm text-charcoal-600 max-w-md mb-6 leading-relaxed">
          {emptyDescription}
        </p>
        <a
          href={getWhatsAppEnquiryUrl(whatsAppNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow transition-all"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          <span>Ask Sai Furniture on WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          whatsAppNumber={whatsAppNumber}
        />
      ))}
    </div>
  );
}
