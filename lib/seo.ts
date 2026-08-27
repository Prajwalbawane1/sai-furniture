import { Metadata } from "next";
import { Product, Category, SiteSettings } from "@/types";

export const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saifurniture.in";

export function generatePageMetadata({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = `${defaultSiteUrl}${path}`;
  const fullTitle = `${title} | Sai Furniture Navegaon, Gadchiroli`;

  const defaultKeywords = [
    "Sai Furniture",
    "Furniture in Navegaon",
    "Furniture showroom Gadchiroli",
    "Teak wood furniture Maharashtra",
    "Sofa shop in Gadchiroli",
    "Bed store Navegaon",
    "Custom furniture Gadchiroli",
    "Wooden dining table Navegaon",
    "Home interior furniture Vidarbha",
    ...keywords,
  ];

  return {
    title: fullTitle,
    description,
    keywords: defaultKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Sai Furniture — Navegaon, Gadchiroli",
      images: [
        {
          url: image.startsWith("http") ? image : `${defaultSiteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${defaultSiteUrl}${image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateLocalBusinessSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: settings.shop_name || "Sai Furniture",
    description: settings.tagline || "Premium Custom Furniture & Handcrafted Living",
    url: defaultSiteUrl,
    telephone: settings.phone,
    priceRange: "₹₹ - ₹₹₹",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address || "Main Road, Near Bus Stand",
      addressLocality: "Navegaon",
      addressRegion: "Maharashtra",
      postalCode: settings.pincode || "441201",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.1000",
      longitude: "79.9000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "20:30",
      },
    ],
    sameAs: [
      "https://maps.google.com",
    ],
  };
}

export function generateProductSchema(product: Product, settings: SiteSettings) {
  const coverImage =
    product.images?.find((img) => img.is_cover)?.image_url ||
    product.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img) => img.image_url) || [coverImage],
    description: product.description || product.short_description || product.name,
    category: product.category?.name || "Furniture",
    material: product.material || "Solid Wood",
    offers: {
      "@type": "Offer",
      url: `${defaultSiteUrl}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price ? product.price.toString() : "0",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: settings.shop_name || "Sai Furniture",
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${defaultSiteUrl}${item.url}`,
    })),
  };
}
