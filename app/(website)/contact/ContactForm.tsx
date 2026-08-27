"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";
import confetti from "canvas-confetti";

interface ContactFormProps {
  whatsAppNumber: string;
}

export function ContactForm({ whatsAppNumber }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product_name: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in your name, contact phone number, and enquiry message.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          product_name: formData.product_name.trim() || null,
          message: formData.message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setIsSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try contacting via WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-10 text-center space-y-4 rounded-2xl bg-sand-50 p-6 border border-sand-200 animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h4 className="font-serif text-2xl font-bold text-charcoal-900">
          Thank You, {formData.name}!
        </h4>
        <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
          Your enquiry has been received by our Sai Furniture team in Navegaon. We will call you at <span className="font-semibold text-charcoal-800">{formData.phone}</span> promptly with details.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppEnquiryUrl(whatsAppNumber, null, formData.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>Chat on WhatsApp Directly</span>
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSuccess(false);
              setFormData({ name: "", phone: "", email: "", product_name: "", message: "" });
            }}
          >
            Send Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="rounded-xl bg-red-50 p-3.5 text-xs text-red-700 border border-red-200 font-medium">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name *"
          name="name"
          placeholder="e.g. Anand Raut"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          label="Phone / Mobile Number *"
          name="phone"
          type="tel"
          placeholder="e.g. 9876543210"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address (Optional)"
          name="email"
          type="email"
          placeholder="e.g. anand@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Furniture of Interest (Optional)"
          name="product_name"
          placeholder="e.g. King Teak Bed / 6-Seater Sofa"
          value={formData.product_name}
          onChange={handleChange}
        />
      </div>

      <Textarea
        label="Your Message or Custom Dimensions *"
        name="message"
        rows={4}
        placeholder="Tell us what you are looking for (e.g. room size, preferred wood finish, delivery timeline)..."
        required
        value={formData.message}
        onChange={handleChange}
      />

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-charcoal-500">
          * Required fields. We respect your privacy.
        </span>

        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="w-full sm:w-auto bg-brand-900 hover:bg-brand-950 text-white"
        >
          <Send className="h-4 w-4 mr-2" />
          <span>Submit Enquiry</span>
        </Button>
      </div>
    </form>
  );
}
