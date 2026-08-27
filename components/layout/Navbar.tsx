"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Search, 
  Phone, 
  Compass, 
  ChevronDown, 
  Layers, 
  Sparkles,
  MapPin
} from "lucide-react";
import { Category, SiteSettings } from "@/types";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";

interface NavbarProps {
  categories: Category[];
  settings: SiteSettings;
}

export function Navbar({ categories, settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact & Location", href: "/contact" },
  ];

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-brand-950 text-sand-100 text-xs py-2 px-4 border-b border-brand-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">
              Showroom Open in Navegaon, Gadchiroli
            </span>
            <span className="hidden md:inline text-brand-300">•</span>
            <span className="hidden md:inline text-sand-300">
              Custom Teakwood & Living Room Specialist
            </span>
          </div>
          <div className="flex items-center gap-4 text-sand-200">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-brand-400" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-brand-800">|</span>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-brand-400" />
              <span>Navegaon</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-md py-3"
            : "bg-white/95 backdrop-blur-md py-4 border-b border-sand-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <span className="font-serif text-2xl font-bold text-amber-300">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 tracking-tight group-hover:text-brand-800 transition-colors">
                  {settings.shop_name}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-brand-700 uppercase">
                  Navegaon • Gadchiroli
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      isActive
                        ? "text-brand-800 font-semibold"
                        : "text-charcoal-700 hover:text-brand-800"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-700 rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                onMouseLeave={() => setCategoryDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1.5 text-sm font-medium text-charcoal-700 hover:text-brand-800 py-1 transition-colors"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      categoryDropdownOpen ? "rotate-180 text-brand-700" : ""
                    }`}
                  />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute top-full -left-4 w-64 pt-2 animate-slide-up">
                    <div className="bg-white rounded-2xl shadow-xl border border-sand-200 p-2 space-y-1">
                      <Link
                        href="/categories"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold uppercase text-brand-800 tracking-wider hover:bg-brand-50 rounded-xl"
                      >
                        <Layers className="h-4 w-4 text-brand-600" />
                        <span>All Categories</span>
                      </Link>
                      <div className="h-px bg-sand-100 my-1" />
                      {categories.slice(0, 8).map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/categories/${cat.slug}`}
                          className="flex items-center justify-between px-3 py-2 text-sm text-charcoal-700 hover:text-brand-900 hover:bg-sand-50 rounded-xl transition-colors"
                        >
                          <span>{cat.name}</span>
                          {cat.product_count !== undefined && (
                            <span className="text-xs text-charcoal-400">
                              {cat.product_count}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Action Buttons: Search & WhatsApp */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search Toggle */}
              <div className="relative">
                {isSearchOpen ? (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center relative animate-fade-in"
                  >
                    <input
                      type="text"
                      placeholder="Search sofa, bed, teak..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-56 pl-3 pr-8 py-2 text-xs rounded-xl border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2 text-charcoal-400 hover:text-charcoal-700"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2.5 text-charcoal-600 hover:text-brand-800 hover:bg-sand-100 rounded-xl transition-colors"
                    title="Search catalog"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Direct WhatsApp CTA */}
              <a
                href={getWhatsAppEnquiryUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-charcoal-700 hover:bg-sand-100 rounded-xl"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal-800 hover:bg-sand-100 rounded-xl"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar if open */}
          {isSearchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="mt-3 flex items-center gap-2 sm:hidden animate-slide-up"
            >
              <input
                type="text"
                placeholder="Search sofa, teak bed, dining..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              />
              <button
                type="submit"
                className="bg-brand-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
              >
                Search
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-up">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-sand-200">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-brand-900 flex items-center justify-center text-amber-300 font-serif font-bold text-lg">
                    S
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-charcoal-900 text-base">
                      {settings.shop_name}
                    </h3>
                    <p className="text-[10px] text-brand-700 font-medium">
                      Navegaon, Gadchiroli
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-charcoal-400 hover:text-charcoal-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-charcoal-800 hover:bg-sand-100 hover:text-brand-800 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Categories Section */}
              <div className="pt-2">
                <div className="flex items-center justify-between px-4 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                    Categories
                  </span>
                  <Link
                    href="/categories"
                    className="text-xs font-semibold text-brand-700 hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-charcoal-700 hover:bg-sand-50 rounded-xl"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-charcoal-400">
                        {cat.product_count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Contact actions */}
            <div className="pt-6 border-t border-sand-200 space-y-3">
              <a
                href={getWhatsAppEnquiryUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-sm shadow"
              >
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="w-full flex items-center justify-center gap-2 bg-sand-100 hover:bg-sand-200 text-charcoal-800 font-semibold py-3 rounded-xl text-sm"
              >
                <Phone className="h-4 w-4 text-brand-700" />
                <span>Call {settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
