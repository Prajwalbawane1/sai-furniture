"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { getWhatsAppEnquiryUrl } from "@/lib/utils";
import confetti from "canvas-confetti";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  whatsAppNumber?: string;
}

export function EnquiryModal({
  isOpen,
  onClose,
  product,
  whatsAppNumber = "919876543210",
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: product
      ? `Hi, I am interested in ${product.name}. Please share pricing, availability, and delivery details for Navegaon/Gadchiroli.`
      : "Hi, I would like to enquire about furniture customization and showroom catalog.",
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
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage("Please provide both your name and contact phone number.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          product_id: product?.id || null,
          product_name: product?.name || null,
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try WhatsApp directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={product ? `Enquire About ${product.name}` : "Send a Furniture Enquiry"}
      description="Fill in your details and our Navegaon team will contact you promptly with quotes and specifications."
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="font-serif text-lg font-bold text-charcoal-900">
            Enquiry Received Successfully!
          </h4>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-sm mx-auto leading-relaxed">
            Thank you <span className="font-semibold text-charcoal-800">{formData.name}</span>. Our Sai Furniture specialists will reach out to you at <span className="font-semibold">{formData.phone}</span> shortly.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
            <a
              href={getWhatsAppEnquiryUrl(whatsAppNumber, product, formData.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Continue on WhatsApp</span>
            </a>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {errorMessage && (
            <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Your Full Name *"
              name="name"
              placeholder="e.g. Ramesh Deshmukh"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Mobile Number *"
              name="phone"
              type="tel"
              placeholder="e.g. 9823012345"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Email Address (Optional)"
            name="email"
            type="email"
            placeholder="e.g. yourname@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />

          <Textarea
            label="Message or Custom Sizing Requirements"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
          />

          <div className="pt-2 flex items-center justify-between gap-3">
            <a
              href={getWhatsAppEnquiryUrl(whatsAppNumber, product)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Or WhatsApp directly</span>
            </a>

            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" size="sm" isLoading={isLoading}>
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Submit Enquiry
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
}
