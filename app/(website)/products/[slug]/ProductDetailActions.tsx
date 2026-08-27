"use client";

import React, { useState } from "react";
import { MessageCircle, Send, Phone, Share2, Check } from "lucide-react";
import { Product } from "@/types";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { EnquiryModal } from "@/components/products/EnquiryModal";

interface ProductDetailActionsProps {
  product: Product;
  whatsAppNumber: string;
  phoneNumber: string;
}

export function ProductDetailActions({
  product,
  whatsAppNumber,
  phoneNumber,
}: ProductDetailActionsProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Sai Furniture Navegaon:`,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to copy clipboard
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const whatsAppUrl = getWhatsAppEnquiryUrl(whatsAppNumber, product);

  return (
    <div className="space-y-3 pt-2">
      {/* Primary WhatsApp Action */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-2xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99] text-center"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
        <span>Enquire on WhatsApp</span>
      </a>

      {/* Secondary Actions: Form Enquiry & Direct Call */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsEnquiryOpen(true)}
          className="bg-brand-900 hover:bg-brand-950 text-white rounded-2xl py-3 text-xs sm:text-sm font-semibold"
        >
          <Send className="h-4 w-4 mr-1.5" />
          <span>Send Enquiry</span>
        </Button>

        <a
          href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-sand-300 bg-white py-3 px-4 text-xs sm:text-sm font-semibold text-charcoal-800 hover:bg-sand-50 transition-colors text-center"
        >
          <Phone className="h-4 w-4 text-brand-700" />
          <span>Call Showroom</span>
        </a>
      </div>

      {/* Share / Copy button */}
      <div className="pt-2 flex items-center justify-between text-xs text-charcoal-500">
        <span>Reference SKU: {product.slug}</span>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-brand-800 hover:text-brand-950 font-medium py-1 px-2 rounded-lg hover:bg-sand-100 transition-colors"
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Product</span>
            </>
          )}
        </button>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={product}
        whatsAppNumber={whatsAppNumber}
      />
    </div>
  );
}
