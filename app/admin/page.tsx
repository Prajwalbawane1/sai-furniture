import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  getProducts, 
  getCategories, 
  getBanners, 
  getEnquiries, 
  getSiteSettings 
} from "@/lib/data/api";
import { 
  Package, 
  Layers, 
  Image as ImageIcon, 
  Inbox, 
  Plus, 
  Settings, 
  MessageCircle, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";
import { formatPriceDisplay, getWhatsAppEnquiryUrl } from "@/lib/utils";

export default async function AdminDashboardOverview() {
  const [products, categories, banners, enquiries, settings] = await Promise.all([
    getProducts({ onlyActive: false }),
    getCategories(false),
    getBanners(false),
    getEnquiries(),
    getSiteSettings(),
  ]);

  const newEnquiries = enquiries.filter((e) => e.status === "new");

  const statCards = [
    {
      title: "Total Catalog Products",
      value: products.length,
      subtext: `${products.filter((p) => p.is_active).length} Active Online`,
      icon: Package,
      color: "from-amber-600 to-brand-700",
      href: "/admin/products",
    },
    {
      title: "Furniture Categories",
      value: categories.length,
      subtext: `${categories.filter((c) => c.is_active).length} Published`,
      icon: Layers,
      color: "from-blue-600 to-indigo-700",
      href: "/admin/categories",
    },
    {
      title: "Customer Enquiries",
      value: enquiries.length,
      subtext: `${newEnquiries.length} Awaiting Response`,
      icon: Inbox,
      color: "from-emerald-600 to-teal-700",
      href: "/admin/enquiries",
      highlight: newEnquiries.length > 0,
    },
    {
      title: "Homepage Hero Banners",
      value: banners.length,
      subtext: `${banners.filter((b) => b.is_active).length} Displaying`,
      icon: ImageIcon,
      color: "from-purple-600 to-pink-700",
      href: "/admin/banners",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Welcome to the Sai Furniture Management Portal (Navegaon, Gadchiroli).
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-600 text-white text-xs font-semibold shadow-md transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-sand-200 text-xs font-semibold border border-charcoal-700 transition-all"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              href={card.href}
              className="group relative rounded-2xl bg-charcoal-950 p-6 border border-charcoal-800 hover:border-charcoal-700 transition-all shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                  {card.title}
                </span>
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-white">
                    {card.value}
                  </span>
                  {card.highlight && (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <p className="text-xs text-charcoal-400 mt-1">{card.subtext}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries & Recent Products Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-charcoal-950 p-6 border border-charcoal-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
            <div className="flex items-center gap-2.5">
              <Inbox className="h-5 w-5 text-amber-400" />
              <h2 className="font-serif text-lg font-bold text-white">
                Recent Customer Enquiries
              </h2>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs text-brand-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {enquiries.length === 0 ? (
            <p className="text-xs text-charcoal-500 py-8 text-center">
              No customer enquiries recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 4).map((enq) => {
                const customerWhatsAppUrl = `https://wa.me/91${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello ${enq.name}, thank you for contacting Sai Furniture (Navegaon, Gadchiroli) regarding "${enq.product_name || "furniture enquiry"}". How can we assist you today?`
                )}`;

                return (
                  <div
                    key={enq.id}
                    className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">
                            {enq.name}
                          </h4>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              enq.status === "new"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                : "bg-charcoal-800 text-charcoal-300"
                            }`}
                          >
                            {enq.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-400 mt-0.5">
                          Phone: <span className="text-sand-200">{enq.phone}</span>
                          {enq.product_name && (
                            <span> • Interested in: <span className="text-amber-300 font-medium">{enq.product_name}</span></span>
                          )}
                        </p>
                      </div>

                      <a
                        href={customerWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow shrink-0"
                      >
                        <MessageCircle className="h-3.5 w-3.5 fill-current" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </div>

                    <p className="text-xs text-charcoal-300 bg-charcoal-950 p-2.5 rounded-xl border border-charcoal-800/80 leading-relaxed">
                      &quot;{enq.message}&quot;
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recently Added Products (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-charcoal-950 p-6 border border-charcoal-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
            <div className="flex items-center gap-2.5">
              <Package className="h-5 w-5 text-amber-400" />
              <h2 className="font-serif text-lg font-bold text-white">
                Catalog Highlights
              </h2>
            </div>
            <Link
              href="/admin/products"
              className="text-xs text-brand-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Manage ({products.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((prod) => {
              const cover =
                prod.images?.find((img) => img.is_cover)?.image_url ||
                prod.images?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80";

              return (
                <div
                  key={prod.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-charcoal-700 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-charcoal-800 shrink-0">
                      <Image
                        src={cover}
                        alt={prod.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-amber-400 font-medium">
                        {formatPriceDisplay(prod.price_type, prod.price, prod.price_max)}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/admin/products/${prod.id}/edit`}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-charcoal-800 text-sand-200 hover:bg-brand-900 hover:text-white shrink-0 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
