import React from "react";
import { getProducts, getCategories, getSiteSettings } from "@/lib/data/api";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilter } from "@/components/products/ProductFilter";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: "newest" | "price_asc" | "price_desc" | "name_asc";
  }>;
}

export async function generateMetadata({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categoryTitle = params.category ? ` - ${params.category.replace(/-/g, " ")}` : "";
  return generatePageMetadata({
    title: `Furniture Catalog Directory${categoryTitle}`,
    description:
      "Browse our comprehensive collection of solid teakwood beds, luxury sofa sets, modular wardrobes, and custom dining furniture at Sai Furniture, Navegaon.",
    path: "/products",
  });
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categorySlug = params.category && params.category !== "all" ? params.category : undefined;
  const search = params.search || undefined;
  const sortBy = params.sort || "newest";

  const [categories, settings, products] = await Promise.all([
    getCategories(true),
    getSiteSettings(),
    getProducts({
      categorySlug,
      search,
      sortBy,
      onlyActive: true,
    }),
  ]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-brand-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-charcoal-800">Catalog Directory</span>
        </div>

        {/* Page Hero Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-brand-950 via-charcoal-900 to-brand-900 p-8 sm:p-12 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              <span>Sai Furniture Showroom Catalog</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Furniture Collections
            </h1>
            <p className="text-sm sm:text-base text-sand-200/90 leading-relaxed">
              Explore solid wood beds, plush sofa sets, dining ensembles, and modern storage. Click on any item for full specifications or instant WhatsApp enquiry.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <ProductFilter
          categories={categories}
          totalProductsCount={products.length}
        />

        {/* Product Grid */}
        <ProductGrid
          products={products}
          whatsAppNumber={settings.whatsapp}
          emptyTitle={
            search
              ? `No furniture matching "${search}"`
              : "No furniture available in this category"
          }
          emptyDescription="We are constantly adding handcrafted items to our Navegaon showroom. Looking for specific dimensions or wood polish? Chat with us on WhatsApp!"
        />
      </div>
    </div>
  );
}
