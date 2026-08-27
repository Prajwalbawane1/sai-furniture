import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/data/api";
import { generateLocalBusinessSchema } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai Furniture | Premium Handcrafted Furniture in Navegaon, Gadchiroli",
  description:
    "Explore luxury handcrafted teakwood beds, solid wood sofa sets, modular wardrobes, and custom furniture at Sai Furniture, Navegaon, Gadchiroli, Maharashtra.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saifurniture.in"),
  keywords: [
    "Sai Furniture",
    "Furniture in Navegaon",
    "Furniture showroom Gadchiroli",
    "Teak wood furniture Maharashtra",
    "Sofa shop in Gadchiroli",
    "Bespoke furniture Navegaon",
    "Wooden dining table Gadchiroli",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const schema = generateLocalBusinessSchema(settings);

  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] text-charcoal-900">
        {children}
      </body>
    </html>
  );
}
