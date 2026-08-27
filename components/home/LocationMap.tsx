import React from "react";
import { MapPin, Clock, Phone, ExternalLink, Navigation } from "lucide-react";
import { SiteSettings } from "@/types";

interface LocationMapProps {
  settings: SiteSettings;
}

export function LocationMap({ settings }: LocationMapProps) {
  const gmapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${settings.shop_name}, ${settings.address}, ${settings.city}, ${settings.state}`
  )}`;

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            Visit Our Showroom
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Experience the Craftsmanship in Person
          </h2>
          <p className="text-sm text-charcoal-600">
            Touch our seasoned teakwood textures, test our sofa cushioning density, and speak directly with our master furniture artisans in Navegaon, Gadchiroli.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#FAF8F5] p-6 sm:p-8 border border-sand-300 shadow-sm space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">
                  Showroom Address
                </span>
                <div className="mt-2 flex items-start gap-3 text-charcoal-800">
                  <MapPin className="h-5 w-5 text-brand-700 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-lg text-charcoal-900">
                      {settings.shop_name}
                    </h4>
                    <p className="text-sm text-charcoal-600 mt-1">
                      {settings.address}
                    </p>
                    <p className="text-sm text-charcoal-600">
                      {settings.city}, {settings.state} - {settings.pincode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sand-200">
                <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">
                  Showroom Timings
                </span>
                <div className="mt-2 flex items-center gap-3 text-charcoal-800 text-sm">
                  <Clock className="h-5 w-5 text-brand-700 shrink-0" />
                  <span>{settings.business_hours}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-sand-200">
                <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">
                  Phone & Assistance
                </span>
                <div className="mt-2 flex items-center gap-3 text-charcoal-800 text-sm">
                  <Phone className="h-5 w-5 text-brand-700 shrink-0" />
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="font-medium hover:text-brand-800"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-sand-200">
              <a
                href={gmapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm shadow transition-all"
              >
                <Navigation className="h-4 w-4 text-amber-300" />
                <span>Get Driving Directions on Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Right: Interactive Google Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-sand-300 shadow-sm min-h-[380px] relative bg-sand-100">
            <iframe
              src={settings.google_maps_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sai Furniture Navegaon Showroom Location Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
