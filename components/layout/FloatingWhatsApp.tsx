"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";

interface FloatingWhatsAppProps {
  whatsAppNumber: string;
  shopName: string;
}

export function FloatingWhatsApp({ whatsAppNumber, shopName }: FloatingWhatsAppProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="bg-white rounded-2xl p-3 shadow-xl border border-sand-200 text-charcoal-800 max-w-[240px] text-xs animate-slide-up relative hidden sm:block">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-charcoal-400 hover:text-charcoal-700"
            aria-label="Close message"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-charcoal-900">{shopName}</span>
          </div>
          <p className="text-charcoal-600 leading-snug">
            Need pricing, custom sizing, or photos? Chat with our Navegaon team on WhatsApp!
          </p>
        </div>
      )}

      {/* Pulsing Floating Button */}
      <a
        href={getWhatsAppEnquiryUrl(whatsAppNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Enquire on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75" />
        <MessageCircle className="h-7 w-7 relative z-10 fill-current" />
      </a>
    </div>
  );
}
