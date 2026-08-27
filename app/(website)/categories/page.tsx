import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/data/api";
import { generatePageMetadata } from "@/lib/seo";
import { ChevronRight, ArrowRight, Layers } from "lucide-react";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Furniture Categories & Departments",
    description:
      "Explore all furniture categories at Sai Furniture: Living Room Sofas, Teakwood Beds, Dining Tables, Wardrobes, TV Units, and Bespoke Custom Furniture in Navegaon.",
    path: "/categories",
  });
}

export default async function CategoriesPage() {
  const categories = await getCategories(true);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-brand-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-charcoal-800">Categories</span>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-700">
            <Layers className="h-4 w-4" />
            <span>Showroom Departments</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900">
            Explore by Furniture Category
          </h1>
          <p className="text-sm text-charcoal-600">
            Browse our wide selection of handcrafted furniture tailored for modern Indian households across Vidarbha.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const imageUrl =
              cat.image_url ||
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col rounded-3xl bg-white border border-sand-200 overflow-hidden shadow-sm hover:shadow-luxury-hover transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand-100">
                  <Image
                    src={imageUrl}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold uppercase tracking-wider text-amber-300">
                      {cat.product_count !== undefined
                        ? `${cat.product_count} Items`
                        : "Catalog"}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-brand-800 transition-colors">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-xs text-charcoal-600 mt-2 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-xs font-semibold text-brand-800 group-hover:text-brand-950">
                    <span>Browse Collection</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
