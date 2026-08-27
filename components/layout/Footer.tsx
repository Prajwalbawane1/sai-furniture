import React from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Lock,
  ArrowUpRight
} from "lucide-react";
import { SiteSettings, Category } from "@/types";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";

interface FooterProps {
  settings: SiteSettings;
  categories: Category[];
}

export function Footer({ settings, categories }: FooterProps) {
  return (
    <footer className="bg-charcoal-950 text-sand-200 pt-16 pb-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-charcoal-800">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-charcoal-900/60 border border-charcoal-800/80">
            <div className="p-3 rounded-xl bg-brand-900/50 text-amber-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Solid Timber</h4>
              <p className="text-xs text-charcoal-400 mt-1">
                Grade-A CP Teakwood & Seasoned Sheesham craftsmanship.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-charcoal-900/60 border border-charcoal-800/80">
            <div className="p-3 rounded-xl bg-brand-900/50 text-amber-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Bespoke Customization</h4>
              <p className="text-xs text-charcoal-400 mt-1">
                Tailored dimensions, colors, and premium polishes to order.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-charcoal-900/60 border border-charcoal-800/80">
            <div className="p-3 rounded-xl bg-brand-900/50 text-amber-400">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Gadchiroli Delivery</h4>
              <p className="text-xs text-charcoal-400 mt-1">
                Doorstep delivery & expert fitting across Navegaon & district.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-charcoal-900/60 border border-charcoal-800/80">
            <div className="p-3 rounded-xl bg-brand-900/50 text-amber-400">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Direct Showroom Pricing</h4>
              <p className="text-xs text-charcoal-400 mt-1">
                Zero middleman markup, factory-direct artisan value.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-800 flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow">
                S
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                {settings.shop_name}
              </span>
            </div>
            <p className="text-sm text-charcoal-300 leading-relaxed max-w-sm">
              {settings.tagline}. Navegaon & Gadchiroli&apos;s trusted destination for luxury wooden furniture, ergonomic bedroom comfort, and personalized living spaces.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppEnquiryUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow transition-colors"
              >
                <span>WhatsApp Us</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-sand-200 rounded-xl text-xs font-semibold transition-colors"
              >
                <span>Store Location</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Catalog Directory
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Collections
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Showroom Location
            </h4>
            <ul className="space-y-3 text-sm text-charcoal-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-400 mt-0.5 shrink-0" />
                <span>
                  {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-400 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              {settings.email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-brand-400 shrink-0" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5 text-xs text-charcoal-400">
                <Clock className="h-4 w-4 text-brand-400 mt-0.5 shrink-0" />
                <span>{settings.business_hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 mt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <p>
            © {new Date().getFullYear()} {settings.shop_name}, Navegaon, Gadchiroli. All Rights Reserved. (Catalog & Enquiry Platform)
          </p>
          <div className="flex items-center gap-4">
            <span>Handcrafted in Maharashtra</span>
            <span>•</span>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-charcoal-500 hover:text-amber-300 transition-colors"
            >
              <Lock className="h-3 w-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
