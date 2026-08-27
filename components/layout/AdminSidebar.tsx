"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Image as ImageIcon,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Store,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Hero Banners", href: "/admin/banners", icon: ImageIcon },
    { name: "Enquiries Inbox", href: "/admin/enquiries", icon: Inbox },
    { name: "Store Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    // Clear session storage / cookies
    if (typeof window !== "undefined") {
      localStorage.removeItem("sai_admin_authenticated");
      document.cookie = "sai_admin_auth=; path=/; max-age=0";
    }
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile top bar toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-charcoal-950 text-white border-b border-charcoal-800">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-brand-700 flex items-center justify-center font-serif font-bold text-amber-300">
            S
          </div>
          <span className="font-serif font-bold text-base">Sai Furniture Admin</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-charcoal-800 text-charcoal-300"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar navigation container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-charcoal-950 text-sand-200 p-6 flex flex-col justify-between border-r border-charcoal-800 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center justify-between pb-6 border-b border-charcoal-800">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center font-serif font-bold text-amber-300 text-xl shadow">
                S
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base">
                  Sai Furniture
                </h3>
                <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                  Admin Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Nav links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-900 text-white font-semibold shadow-sm border border-brand-700/50"
                      : "text-charcoal-300 hover:bg-charcoal-900 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-amber-400" : "text-charcoal-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-charcoal-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-charcoal-300 hover:text-white hover:bg-charcoal-900 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-brand-400" />
              <span>View Live Website</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
