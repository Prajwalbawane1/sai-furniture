import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Sparkles, Check } from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";

interface ShowcaseBannerProps {
  whatsAppNumber: string;
}

export function ShowcaseBanner({ whatsAppNumber }: ShowcaseBannerProps) {
  const highlights = [
    "Full Home Furniture Packages (Living, Bedroom, Dining)",
    "Pure Teakwood Puja Mandirs & Traditional Carvings",
    "Choice of 100+ Premium Fabrics, Velvets & Leatherettes",
    "Complimentary Room Measurement & Layout Consultation",
  ];

  return (
    <section className="py-16 sm:py-24 bg-charcoal-950 text-white relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-charcoal-800">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury living room showcase"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                  Sai Furniture Artisans
                </span>
                <h4 className="font-serif text-xl font-bold text-white mt-1">
                  Crafted locally in Navegaon, Gadchiroli
                </h4>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-brand-900/90 border border-brand-700/60 p-4 rounded-2xl backdrop-blur-md shadow-xl max-w-xs">
              <Sparkles className="h-6 w-6 text-amber-300 shrink-0" />
              <p className="text-xs text-sand-100 font-medium leading-snug">
                100% Solid Wood. Built for lifetime durability.
              </p>
            </div>
          </div>

          {/* Right Column: Information & Enquiries */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Custom Design Service</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Have a Dream Design in Mind? We Can Build It.
            </h2>

            <p className="text-sm sm:text-base text-charcoal-300 leading-relaxed">
              Whether you have an architectural sketch, an Instagram inspiration photo, or specific room dimensions, our master carpenters in Navegaon bring your vision to reality with genuine timber and superior joinery.
            </p>

            <div className="space-y-3 pt-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 items-center justify-center mt-0.5 shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-sand-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={getWhatsAppEnquiryUrl(
                  whatsAppNumber,
                  null,
                  "Hi Sai Furniture, I would like to discuss a custom furniture design requirement with you."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg transition-all"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>WhatsApp Your Requirements</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-sand-100 font-semibold text-sm border border-charcoal-700 transition-all"
              >
                <span>Visit Our Showroom</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
