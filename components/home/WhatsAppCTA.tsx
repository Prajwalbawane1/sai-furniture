import React from "react";
import { MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";

interface WhatsAppCTAProps {
  whatsAppNumber: string;
  phone: string;
}

export function WhatsAppCTA({ whatsAppNumber, phone }: WhatsAppCTAProps) {
  return (
    <section className="py-14 bg-gradient-to-br from-brand-900 via-brand-950 to-charcoal-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Instant Catalog & Pricing Inquiries</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Get Fast Quotes & Custom Catalogs on WhatsApp
            </h2>
            <p className="text-sm text-sand-200/90 leading-relaxed">
              Send us a message with any product question or room photos. Our team in Navegaon, Gadchiroli responds with custom photos, wood samples, and transparent quotes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href={getWhatsAppEnquiryUrl(whatsAppNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-xl hover:scale-105 transition-all"
            >
              <MessageCircle className="h-5 w-5 fill-current" />
              <span>Start WhatsApp Chat</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Call Us: {phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
