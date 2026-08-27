import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { ArrowRight } from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              Browse by Department
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-2">
              Featured Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-900 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const isLarge = idx === 0 || idx === 3;
            const imageUrl =
              cat.image_url ||
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-sm hover:shadow-luxury-hover border border-sand-200 transition-all duration-300"
              >
                {/* Background Image */}
                <Image
                  src={imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-medium tracking-wider text-amber-300 uppercase mb-1">
                    {cat.product_count !== undefined
                      ? `${cat.product_count} Models Available`
                      : "Collection"}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug group-hover:text-amber-200 transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-sand-200/80 line-clamp-1 mt-1 hidden sm:block">
                      {cat.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
