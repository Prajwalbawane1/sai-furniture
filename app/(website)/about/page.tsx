import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/data/api";
import { generatePageMetadata } from "@/lib/seo";
import { 
  TreePine, 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  MapPin 
} from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "About Us — Mastercrafted Furniture in Navegaon, Gadchiroli",
    description:
      "Learn about Sai Furniture's heritage of solid teakwood joinery, handmade furniture craftsmanship, and personalized customer care in Navegaon, Gadchiroli.",
    path: "/about",
  });
}

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const milestones = [
    { number: "15+ Years", label: "Local Woodworking Heritage in Gadchiroli" },
    { number: "3,500+", label: "Homes & Living Rooms Furnished" },
    { number: "100%", label: "Solid Wood & Seasoned Timber Guarantee" },
    { number: "0 Middlemen", label: "Direct Factory Showroom Value" },
  ];

  const craftPillars = [
    {
      title: "Hand-Picked Mature Timber",
      desc: "Every log of CP Teakwood and Sheesham is inspected for grain integrity, density, and natural oil content before entering our seasoning sheds.",
    },
    {
      title: "Precision Joinery & Tenon Structure",
      desc: "We avoid fragile plastic fasteners. Our beds and tables use traditional mortise & tenon joinery reinforced with marine-grade glues.",
    },
    {
      title: "Multi-Step Melamine Polish",
      desc: "Heat-proof, moisture-guard, and scratch-resistant coating processes that highlight the rich organic character of natural wood grains.",
    },
    {
      title: "Lifelong Local Customer Support",
      desc: "Being rooted right here in Navegaon, we provide swift local service, polish touch-ups, and custom carpentry adjustments whenever needed.",
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            Our Story & Craftsmanship
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 leading-tight">
            Furniture Built to Become Family Heirlooms
          </h1>
          <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
            Welcome to Sai Furniture. Based in Navegaon, Gadchiroli, we are dedicated to bringing solid timber warmth, ergonomic comfort, and bespoke Indian carpentry to your beloved homes.
          </p>
        </div>

        {/* Big Visual Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-6 sm:p-12 border border-sand-200 shadow-sm">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
              alt="Sai Furniture Showroom Display"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              Navegaon, Gadchiroli Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 leading-snug">
              From Raw Timber to Your Living Room Sanctuary
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              In an era dominated by fragile particle boards and disposable furniture, Sai Furniture was founded with a single uncompromising mission: **revive true solid wood carpentry**.
            </p>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              Every sofa frame, dining table, and king hydraulic bed that leaves our Navegaon workshop is shaped by experienced artisans who understand the climate, humidity, and lifestyle demands of Maharashtra homes.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppEnquiryUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow transition-all"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Chat with our Team</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-sand-100 hover:bg-sand-200 text-charcoal-800 text-xs font-semibold px-5 py-3 rounded-xl transition-all"
              >
                <MapPin className="h-4 w-4 text-brand-700" />
                <span>Visit Showroom</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Milestone Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white p-6 sm:p-8 border border-sand-200 text-center space-y-2 shadow-sm"
            >
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-900">
                {m.number}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-medium">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Craftsmanship Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              Our Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">
              The Sai Furniture Quality Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {craftPillars.map((p, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white p-8 border border-sand-200 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-brand-800 font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm text-charcoal-600 leading-relaxed pl-11">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
