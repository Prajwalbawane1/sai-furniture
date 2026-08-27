"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { formatPriceDisplay, getWhatsAppEnquiryUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  whatsAppNumber?: string;
}

export function ProductCard({
  product,
  whatsAppNumber = "919876543210",
}: ProductCardProps) {
  const coverImage =
    product.images?.find((img) => img.is_cover)?.image_url ||
    product.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

  const priceText = formatPriceDisplay(
    product.price_type,
    product.price,
    product.price_max
  );

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-sand-200 overflow-hidden shadow-sm hover:shadow-luxury-hover transition-all duration-300">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <Image
            src={coverImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges Over Image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.is_featured && (
            <Badge variant="featured" size="sm">
              Featured
            </Badge>
          )}
          {product.is_new_arrival && (
            <Badge variant="new" size="sm">
              New Arrival
            </Badge>
          )}
        </div>

        {/* Category Pill Over Image */}
        {product.category && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-charcoal-950/70 text-white backdrop-blur-md">
              {product.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 justify-between space-y-4">
        <div className="space-y-1.5">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal-900 line-clamp-1 group-hover:text-brand-800 transition-colors">
              {product.name}
            </h3>
          </Link>

          {product.material && (
            <p className="text-xs text-charcoal-500 line-clamp-1">
              <span className="font-medium text-charcoal-700">Material:</span> {product.material}
            </p>
          )}

          {product.short_description && (
            <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
              {product.short_description}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-sand-100 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-charcoal-400 font-medium">Pricing</span>
            <span className="text-sm sm:text-base font-bold text-brand-900">
              {priceText}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sand-300 bg-white py-2 px-3 text-xs font-semibold text-charcoal-800 hover:bg-sand-50 hover:border-brand-300 transition-colors text-center"
            >
              <span>Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <a
              href={getWhatsAppEnquiryUrl(whatsAppNumber, product)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 text-xs font-semibold shadow-sm transition-all text-center"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
