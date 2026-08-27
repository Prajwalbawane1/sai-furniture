"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // If on login page, skip authentication check
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    const authVal = localStorage.getItem("sai_admin_authenticated");
    if (authVal === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-charcoal-950 text-white">{children}</div>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-amber-300">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-sand-200">Verifying Admin Access...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900 text-charcoal-100 flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-8 lg:p-10 bg-charcoal-900">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
