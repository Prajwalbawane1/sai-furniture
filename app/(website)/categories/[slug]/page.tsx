import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  getCategoryBySlug, 
  getProducts, 
  getSiteSettings,
  getCategories 
} from "@/lib/data/api";
import { ProductGrid } from "@/components/products/ProductGrid";
import { generatePageMetadata } from "@/lib/seo";
import { ChevronRight, Layers, MessageCircle } from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return generatePageMetadata({
    title: `${category.name} Collection`,
    description:
      category.description ||
      `Explore our handcrafted collection of ${category.name} at Sai Furniture in Navegaon, Gadchiroli.`,
    path: `/categories/${category.slug}`,
    image: category.image_url || undefined,
  });
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, settings, products, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getSiteSettings(),
    getProducts({ categorySlug: slug, onlyActive: true }),
    getCategories(true),
  ]);

  if (!category) {
    notFound();
  }

  const categoryImageUrl =
    category.image_url ||
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-brand-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/categories" className="hover:text-brand-800 transition-colors">
            Categories
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-charcoal-800">{category.name}</span>
        </div>

        {/* Category Hero Banner */}
        <div className="mb-10 relative rounded-3xl overflow-hidden shadow-lg border border-sand-300 min-h-[260px] sm:min-h-[320px] flex items-center bg-charcoal-950">
          <Image
            src={categoryImageUrl}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/70 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 max-w-2xl text-white space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Layers className="h-3 w-3" />
              <span>{products.length} Products in Showroom</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-sm sm:text-base text-sand-200/90 leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Quick Category Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Link
            href="/products"
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-charcoal-700 border border-sand-300 hover:bg-sand-50"
          >
            All Products
          </Link>
          {allCategories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                c.slug === category.slug
                  ? "bg-brand-900 text-white shadow"
                  : "bg-white text-charcoal-700 border border-sand-300 hover:bg-sand-50"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          whatsAppNumber={settings.whatsapp}
          emptyTitle={`No products listed under ${category.name} yet`}
          emptyDescription="We are crafting new pieces in our Navegaon workshop daily. You can also place custom orders directly through WhatsApp."
        />

        {/* Bottom Custom Order Strip */}
        <div className="mt-16 rounded-3xl bg-white p-8 border border-sand-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Need custom sizing for {category.name}?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Tell our Navegaon craftsmen your specific room measurements and timber preference.
            </p>
          </div>
          <a
            href={getWhatsAppEnquiryUrl(
              settings.whatsapp,
              null,
              `Hi Sai Furniture, I would like to enquiry about custom sizing in the ${category.name} category.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow shrink-0"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>Chat with Craftsman</span>
          </a>
        </div>
      </div>
    </div>
  );
}
