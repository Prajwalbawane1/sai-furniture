import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, PriceType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function formatPriceDisplay(
  priceType: PriceType,
  price?: number | null,
  priceMax?: number | null
): string {
  if (priceType === "contact_for_price" || !price) {
    return "Contact for Price";
  }

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const formattedMin = formatter.format(price);

  switch (priceType) {
    case "fixed":
      return formattedMin;
    case "starting_at":
      return `Starts at ${formattedMin}`;
    case "range":
      if (priceMax && priceMax > price) {
        return `${formattedMin} - ${formatter.format(priceMax)}`;
      }
      return formattedMin;
    default:
      return "Contact for Price";
  }
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

export function getWhatsAppEnquiryUrl(
  whatsAppNumber: string,
  product?: Partial<Product> | null,
  customMessage?: string
): string {
  const cleanNumber = cleanPhoneNumber(whatsAppNumber);
  
  if (customMessage) {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(customMessage)}`;
  }

  if (product && product.name) {
    const text = `Hello Sai Furniture,\n\nI am interested in learning more about:\n*${product.name}*\n${product.material ? `Material: ${product.material}\n` : ''}${product.slug ? `Catalog Link: https://saifurniture.in/products/${product.slug}\n` : ''}\nPlease share more details and pricing.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  }

  const generalText = `Hello Sai Furniture (Navegaon, Gadchiroli),\nI would like to enquire about your furniture catalog and custom design services.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(generalText)}`;
}

export function truncateText(text: string, length: number = 100): string {
  if (!text || text.length <= length) return text || "";
  return text.substring(0, length).trim() + "...";
}
