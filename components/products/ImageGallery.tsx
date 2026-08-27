"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/types";
import { Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const displayImages = images && images.length > 0
    ? images
    : [
        {
          id: "placeholder",
          image_url:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
          alt_text: productName,
          is_cover: true,
          display_order: 1,
        },
      ];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Large Image Box */}
      <div className="relative aspect-[4/3] w-full rounded-3xl bg-sand-100 overflow-hidden border border-sand-200 shadow-sm group">
        <Image
          src={currentImage.image_url}
          alt={currentImage.alt_text || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300 group-hover:scale-102 cursor-pointer"
          onClick={() => setIsZoomOpen(true)}
        />

        {/* Zoom Button Trigger */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-charcoal-950/60 text-white hover:bg-charcoal-900 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Enlarge image"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Carousel Arrow Controls (if multiple images) */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal-800 shadow-md backdrop-blur-sm transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal-800 shadow-md backdrop-blur-sm transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {displayImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? "border-brand-700 ring-2 ring-brand-500/20 shadow-md scale-95"
                  : "border-sand-200 hover:border-brand-400 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.image_url}
                alt={img.alt_text || `${productName} thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/90 backdrop-blur-md p-4 animate-fade-in">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-charcoal-800/80 text-white hover:bg-charcoal-700 transition-colors z-10"
            aria-label="Close zoom view"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <Image
              src={currentImage.image_url}
              alt={currentImage.alt_text || productName}
              fill
              className="object-contain"
              sizes="100vw"
            />

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal-900/70 text-white hover:bg-charcoal-800 transition-colors"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal-900/70 text-white hover:bg-charcoal-800 transition-colors"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
