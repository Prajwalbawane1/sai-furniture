import React from "react";
import { 
  getBanners, 
  getCategories, 
  getProducts, 
  getSiteSettings 
} from "@/lib/data/api";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ShowcaseBanner } from "@/components/home/ShowcaseBanner";
import { WhatsAppCTA } from "@/components/home/WhatsAppCTA";
import { LocationMap } from "@/components/home/LocationMap";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return generatePageMetadata({
    title: "Handcrafted Luxury Wooden Furniture",
    description: settings.hero_subtitle || "Explore handcrafted teakwood beds, luxury sofa lounges, bespoke dining tables and custom furniture at Sai Furniture, Navegaon, Gadchiroli.",
    path: "/",
  });
}

export default async function HomePage() {
  const [banners, categories, products, settings] = await Promise.all([
    getBanners(true),
    getCategories(true),
    getProducts({ onlyActive: true }),
    getSiteSettings(),
  ]);

  return (
    <div className="space-y-0">
      {/* 1. Hero Banner Slider */}
      <HeroSlider banners={banners} />

      {/* 2. Featured Categories Department Grid */}
      <CategoryGrid categories={categories} />

      {/* 3. Curated Masterpieces (Featured & New Arrivals) */}
      <FeaturedProducts
        products={products}
        whatsAppNumber={settings.whatsapp}
      />

      {/* 4. Why Choose Sai Furniture */}
      <WhyChooseUs />

      {/* 5. Custom Furniture & Living Showcase Banner */}
      <ShowcaseBanner whatsAppNumber={settings.whatsapp} />

      {/* 6. Instant WhatsApp CTA Section */}
      <WhatsAppCTA
        whatsAppNumber={settings.whatsapp}
        phone={settings.phone}
      />

      {/* 7. Navegaon Showroom Location & Map */}
      <LocationMap settings={settings} />
    </div>
  );
}
