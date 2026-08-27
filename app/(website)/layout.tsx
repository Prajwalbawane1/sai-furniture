import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { getSiteSettings, getCategories } from "@/lib/data/api";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getCategories(true),
  ]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar categories={categories} settings={settings} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} categories={categories} />
      <FloatingWhatsApp
        whatsAppNumber={settings.whatsapp}
        shopName={settings.shop_name}
      />
    </div>
  );
}
