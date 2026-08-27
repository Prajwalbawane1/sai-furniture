"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Banner } from "@/types";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSliderProps {
  banners: Banner[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const displayBanners = banners && banners.length > 0
    ? banners
    : [
        {
          id: "default-1",
          title: "The Royal Teakwood Collection",
          subtitle:
            "Handcrafted solid wood bedroom sets built for generations of warmth and luxury in Vidarbha.",
          badge: "Festive Showroom Edition",
          cta_text: "Explore Bedroom Sets",
          cta_link: "/products",
          image_url:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",
          is_active: true,
          display_order: 1,
        },
      ];

  // Auto slide every 6 seconds
  useEffect(() => {
    if (displayBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === displayBanners.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [displayBanners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? displayBanners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === displayBanners.length - 1 ? 0 : prev + 1));
  };

  const active = displayBanners[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-charcoal-950 min-h-[520px] lg:min-h-[600px] flex items-center">
      {/* Background Image Carousel with Overlay */}
      {displayBanners.map((banner, index) => (
        <div
          key={banner.id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={banner.image_url}
            alt={banner.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
          />
          {/* Gradient Overlays for optimal readability and editorial feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-charcoal-950/30" />
        </div>
      ))}

      {/* Hero Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl space-y-6 text-white animate-fade-in">
          {active.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{active.badge}</span>
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            {active.title}
          </h1>

          {active.subtitle && (
            <p className="text-base sm:text-lg text-sand-200/90 font-normal leading-relaxed max-w-xl">
              {active.subtitle}
            </p>
          )}

          <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
            <Link href={active.cta_link || "/products"}>
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg">
                <span>{active.cta_text || "Explore Catalog"}</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 hover:border-white"
              >
                Visit Navegaon Showroom
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      {displayBanners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-charcoal-900/60 hover:bg-charcoal-900 text-white border border-white/10 backdrop-blur-md items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-charcoal-900/60 hover:bg-charcoal-900 text-white border border-white/10 backdrop-blur-md items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {displayBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-amber-400"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
