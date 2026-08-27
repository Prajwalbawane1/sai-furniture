"use client";

import React, { useState, useEffect } from "react";
import { SiteSettings } from "@/types";
import { 
  Settings, 
  Save, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Globe, 
  CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    shop_name: "",
    tagline: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    google_maps_embed_url: "",
    business_hours: "",
    hero_title: "",
    hero_subtitle: "",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setSettings(data);
          setFormData({
            shop_name: data.shop_name || "Sai Furniture",
            tagline: data.tagline || "",
            phone: data.phone || "",
            whatsapp: data.whatsapp || "",
            email: data.email || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            pincode: data.pincode || "",
            google_maps_embed_url: data.google_maps_embed_url || "",
            business_hours: data.business_hours || "",
            hero_title: data.hero_title || "",
            hero_subtitle: data.hero_subtitle || "",
          });
        }
      })
      .catch((err) => console.error("Failed to load settings:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSaved(false);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update settings");
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-charcoal-400 space-y-3">
        <div className="h-6 w-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs">Loading site settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Store & Location Settings
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Configure contact numbers, WhatsApp auto-messaging, showroom address, and Google Maps embed.
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="rounded-2xl bg-emerald-950/80 p-4 text-xs sm:text-sm text-emerald-300 border border-emerald-800 font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>Store settings updated successfully! Changes are live across the website.</span>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl bg-red-950/80 p-4 text-xs sm:text-sm text-red-300 border border-red-800 font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Business Identity */}
        <div className="rounded-3xl bg-charcoal-950 p-6 sm:p-8 border border-charcoal-800 space-y-6">
          <h2 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>1. Store Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Showroom Name
              </label>
              <input
                type="text"
                name="shop_name"
                required
                value={formData.shop_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Brand Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & WhatsApp */}
        <div className="rounded-3xl bg-charcoal-950 p-6 sm:p-8 border border-charcoal-800 space-y-6">
          <h2 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-emerald-400" />
            <span>2. WhatsApp & Phone Contacts</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                WhatsApp Number * (Digits only with Country Code)
              </label>
              <input
                type="text"
                name="whatsapp"
                required
                placeholder="e.g. 919876543210"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-[11px] text-charcoal-400">
                Used for all one-click customer WhatsApp enquiries.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Showroom Display Phone
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Support Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="contact@saifurniture.in"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Physical Address & Timings */}
        <div className="rounded-3xl bg-charcoal-950 p-6 sm:p-8 border border-charcoal-800 space-y-6">
          <h2 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>3. Showroom Location & Visiting Hours</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="Main Road, Near Old Bus Stand"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                City / Town
              </label>
              <input
                type="text"
                name="city"
                placeholder="Navegaon, Gadchiroli"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                State & Pincode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="state"
                  placeholder="Maharashtra"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-3 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="441201"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-3 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Business & Showroom Hours
              </label>
              <input
                type="text"
                name="business_hours"
                placeholder="Monday - Sunday: 9:00 AM - 8:30 PM"
                value={formData.business_hours}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Google Maps Embed URL (Iframe src link)
              </label>
              <input
                type="text"
                name="google_maps_embed_url"
                placeholder="https://www.google.com/maps/embed?pb=..."
                value={formData.google_maps_embed_url}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="bg-brand-700 hover:bg-brand-600 text-white font-bold px-8"
          >
            <Save className="h-4 w-4 mr-2" />
            <span>Save Store Settings</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
