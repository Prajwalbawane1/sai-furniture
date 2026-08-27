import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "gold" | "secondary" | "success" | "outline" | "featured" | "new";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "brand",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full tracking-wide";

  const variantStyles = {
    brand: "bg-brand-100 text-brand-900 border border-brand-200",
    gold: "bg-amber-50 text-amber-900 border border-amber-200",
    secondary: "bg-charcoal-100 text-charcoal-700 border border-charcoal-200",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    outline: "bg-white text-charcoal-700 border border-charcoal-200",
    featured: "bg-gradient-to-r from-amber-600 to-brand-600 text-white shadow-sm font-semibold",
    new: "bg-emerald-600 text-white shadow-sm font-semibold",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
