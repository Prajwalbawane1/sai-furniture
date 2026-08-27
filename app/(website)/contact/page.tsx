import React from "react";
import { getSiteSettings } from "@/lib/data/api";
import { generatePageMetadata } from "@/lib/seo";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Navigation, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return generatePageMetadata({
    title: "Contact Us & Showroom Location",
    description: `Visit Sai Furniture in Navegaon, Gadchiroli. Call ${settings.phone} or chat on WhatsApp for custom wooden furniture enquiries and showroom directions.`,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const gmapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${settings.shop_name}, ${settings.address}, ${settings.city}, ${settings.state}`
  )}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900">
            Contact & Showroom Directions
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600">
            Have questions about custom sizing, wood polish, or want to visit our showroom in Navegaon? We are always happy to help.
          </p>
        </div>

        {/* Contact Info + Enquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white p-8 border border-sand-200 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-charcoal-900 pb-2 border-b border-sand-200">
                Showroom Information
              </h3>

              <div className="space-y-5 text-sm text-charcoal-700">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-50 text-brand-800 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900">Address</h4>
                    <p className="text-xs text-charcoal-600 mt-0.5">
                      {settings.address}
                    </p>
                    <p className="text-xs text-charcoal-600">
                      {settings.city}, {settings.state} - {settings.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900">WhatsApp Direct</h4>
                    <a
                      href={getWhatsAppEnquiryUrl(settings.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-700 hover:underline block mt-0.5"
                    >
                      Chat with Sai Furniture (Online)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-50 text-brand-800 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900">Phone Support</h4>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                      className="text-xs text-charcoal-700 font-semibold hover:text-brand-800 block mt-0.5"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                {settings.email && (
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-brand-50 text-brand-800 shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal-900">Email</h4>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-xs text-charcoal-600 hover:text-brand-800 block mt-0.5"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900">Visiting Hours</h4>
                    <p className="text-xs text-charcoal-600 mt-0.5">
                      {settings.business_hours}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                      Open 7 Days a Week
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sand-200">
                <a
                  href={gmapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-900 hover:bg-brand-950 text-white text-xs font-semibold shadow transition-all"
                >
                  <Navigation className="h-4 w-4 text-amber-300" />
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-8 sm:p-10 border border-sand-200 shadow-sm">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                Send an Enquiry Message
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Fill out this form and our showroom team will reach out with pricing, wood catalogs, or answers to your questions.
              </p>
            </div>

            <ContactForm whatsAppNumber={settings.whatsapp} />
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-charcoal-900">
            Showroom Location on Map
          </h3>
          <div className="rounded-3xl overflow-hidden border border-sand-300 shadow-sm h-[400px] w-full bg-sand-100">
            <iframe
              src={settings.google_maps_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sai Furniture Navegaon Showroom Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
