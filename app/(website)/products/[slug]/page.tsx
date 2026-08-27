import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  getProductBySlug, 
  getRelatedProducts, 
  getSiteSettings 
} from "@/lib/data/api";
import { ImageGallery } from "@/components/products/ImageGallery";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { 
  formatPriceDisplay, 
  getWhatsAppEnquiryUrl 
} from "@/lib/utils";
import { 
  generatePageMetadata, 
  generateProductSchema, 
  generateBreadcrumbSchema 
} from "@/lib/seo";
import { 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  Layers, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Share2, 
  MapPin 
} from "lucide-react";
import { ProductDetailActions } from "./ProductDetailActions";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const coverImage =
    product.images?.find((img) => img.is_cover)?.image_url ||
    product.images?.[0]?.image_url;

  return generatePageMetadata({
    title: product.name,
    description:
      product.short_description ||
      product.description ||
      `Buy ${product.name} at Sai Furniture in Navegaon, Gadchiroli. Solid wood, custom sizing, and local delivery.`,
    path: `/products/${product.slug}`,
    image: coverImage,
    keywords: [
      product.name,
      product.category?.name || "Furniture",
      product.material || "Wood",
      "Sai Furniture Gadchiroli",
    ],
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category_id,
    product.id,
    4
  );

  const priceText = formatPriceDisplay(
    product.price_type,
    product.price,
    product.price_max
  );

  const productSchema = generateProductSchema(product, settings);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.category?.name || "Category", url: `/categories/${product.category?.slug}` },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-brand-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-brand-800 transition-colors">
            Catalog
          </Link>
          {product.category && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href={`/categories/${product.category.slug}`}
                className="hover:text-brand-800 transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-charcoal-900 truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white p-6 sm:p-10 rounded-3xl border border-sand-200 shadow-sm">
          {/* Left Column: Multi-image Gallery */}
          <div className="lg:col-span-7">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Specifications & Enquiries */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category & Badge header */}
            <div className="flex flex-wrap items-center gap-2">
              {product.category && (
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="px-3 py-1 rounded-lg bg-brand-50 text-brand-800 border border-brand-200 text-xs font-semibold hover:bg-brand-100 transition-colors"
                >
                  {product.category.name}
                </Link>
              )}
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

            {/* Product Title & Price */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal-900 leading-tight">
                {product.name}
              </h1>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-brand-900">
                  {priceText}
                </span>
                {product.price_type === "starting_at" && (
                  <span className="text-xs text-charcoal-500 font-medium">
                    (Varies based on size & wood polish)
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            {product.short_description && (
              <p className="text-sm text-charcoal-600 leading-relaxed border-t border-sand-200 pt-4">
                {product.short_description}
              </p>
            )}

            {/* Specifications Specs List */}
            <div className="rounded-2xl bg-[#FAF8F5] p-4 sm:p-5 border border-sand-200 space-y-3 text-xs sm:text-sm">
              <h4 className="font-bold text-charcoal-900 uppercase tracking-wider text-[11px]">
                Specifications & Materials
              </h4>

              {product.material && (
                <div className="flex items-start justify-between py-1.5 border-b border-sand-200/70 gap-2">
                  <span className="text-charcoal-500 font-medium shrink-0">
                    Primary Material:
                  </span>
                  <span className="font-semibold text-charcoal-800 text-right">
                    {product.material}
                  </span>
                </div>
              )}

              {product.dimensions && (
                <div className="flex items-start justify-between py-1.5 border-b border-sand-200/70 gap-2">
                  <span className="text-charcoal-500 font-medium shrink-0">
                    Dimensions:
                  </span>
                  <span className="font-semibold text-charcoal-800 text-right">
                    {product.dimensions}
                  </span>
                </div>
              )}

              {product.color_options && product.color_options.length > 0 && (
                <div className="flex items-start justify-between py-1.5 border-b border-sand-200/70 gap-2">
                  <span className="text-charcoal-500 font-medium shrink-0">
                    Finish / Color Options:
                  </span>
                  <span className="font-semibold text-charcoal-800 text-right">
                    {product.color_options.join(", ")}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between py-1.5 gap-2">
                <span className="text-charcoal-500 font-medium shrink-0">
                  Customization:
                </span>
                <span className="font-semibold text-emerald-700 text-right">
                  Available (Made to Measure)
                </span>
              </div>
            </div>

            {/* Interactive WhatsApp & Enquiry CTAs (Client Component) */}
            <ProductDetailActions
              product={product}
              whatsAppNumber={settings.whatsapp}
              phoneNumber={settings.phone}
            />

            {/* Local Trust & Warranty Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sand-50 border border-sand-200 text-xs text-charcoal-700">
                <ShieldCheck className="h-5 w-5 text-brand-700 shrink-0" />
                <span>Anti-Termite Seasoned Wood</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sand-50 border border-sand-200 text-xs text-charcoal-700">
                <Truck className="h-5 w-5 text-brand-700 shrink-0" />
                <span>Navegaon & Gadchiroli Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Full Description */}
        {product.description && (
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-sand-200 shadow-sm space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
              About this Handcrafted Piece
            </h3>
            <div className="prose prose-sand max-w-none text-sm sm:text-base text-charcoal-700 leading-relaxed space-y-3">
              <p>{product.description}</p>
            </div>
          </div>
        )}

        {/* Related Products from Same Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                  Similar Designs
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-1">
                  You May Also Like
                </h3>
              </div>
              {product.category && (
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="text-xs sm:text-sm font-semibold text-brand-800 hover:text-brand-900 underline"
                >
                  View all in {product.category.name}
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  whatsAppNumber={settings.whatsapp}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
