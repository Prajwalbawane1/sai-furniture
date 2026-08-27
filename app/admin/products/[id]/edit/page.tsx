"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Category, PriceType, Product } from "@/types";
import { 
  ArrowLeft, 
  UploadCloud, 
  Trash2, 
  Star, 
  Plus, 
  Save, 
  Layers, 
  Sparkles,
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [manualUrlInput, setManualUrlInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    short_description: "",
    description: "",
    material: "",
    dimensions: "",
    color_options: "",
    price_type: "starting_at" as PriceType,
    price: "",
    price_max: "",
    is_featured: false,
    is_new_arrival: false,
    is_active: true,
  });

  const [images, setImages] = useState<
    Array<{ image_url: string; alt_text?: string; is_cover: boolean }>
  >([]);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products/${id}`).then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
    ])
      .then(([prodData, catData]) => {
        if (prodData && !prodData.error) {
          setProduct(prodData);
          setFormData({
            name: prodData.name || "",
            category_id: prodData.category_id || "",
            short_description: prodData.short_description || "",
            description: prodData.description || "",
            material: prodData.material || "",
            dimensions: prodData.dimensions || "",
            color_options: Array.isArray(prodData.color_options)
              ? prodData.color_options.join(", ")
              : "",
            price_type: prodData.price_type || "contact_for_price",
            price: prodData.price ? prodData.price.toString() : "",
            price_max: prodData.price_max ? prodData.price_max.toString() : "",
            is_featured: !!prodData.is_featured,
            is_new_arrival: !!prodData.is_new_arrival,
            is_active: prodData.is_active !== undefined ? !!prodData.is_active : true,
          });

          if (Array.isArray(prodData.images)) {
            setImages(
              prodData.images.map((img: any) => ({
                image_url: img.image_url,
                alt_text: img.alt_text,
                is_cover: !!img.is_cover,
              }))
            );
          }
        }
        if (Array.isArray(catData)) {
          setCategories(catData);
        }
      })
      .catch((err) => console.error("Failed to load product for editing:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setErrorMessage("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadData = new FormData();
        uploadData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to upload image");
        }

        const data = await res.json();
        if (data.url) {
          setImages((prev) => [
            ...prev,
            {
              image_url: data.url,
              alt_text: formData.name || "Product Photo",
              is_cover: prev.length === 0,
            },
          ]);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload one or more images.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddManualUrl = () => {
    if (!manualUrlInput.trim()) return;
    setImages((prev) => [
      ...prev,
      {
        image_url: manualUrlInput.trim(),
        alt_text: formData.name || "Product Photo",
        is_cover: prev.length === 0,
      },
    ]);
    setManualUrlInput("");
  };

  const handleSetCover = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        is_cover: i === index,
      }))
    );
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length > 0 && !next.some((img) => img.is_cover)) {
        next[0].is_cover = true;
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Product name is required.");
      return;
    }
    if (!formData.category_id) {
      setErrorMessage("Please select a category.");
      return;
    }
    if (images.length === 0) {
      setErrorMessage("Please add at least one product image.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const colors = formData.color_options
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          color_options: colors,
          images: images.map((img, idx) => ({
            image_url: img.image_url,
            alt_text: img.alt_text || formData.name,
            is_cover: img.is_cover,
            display_order: idx,
          })),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update product");
      }

      router.push("/admin/products");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-charcoal-400 space-y-3">
        <div className="h-6 w-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-charcoal-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-charcoal-950 text-charcoal-300 hover:text-white border border-charcoal-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Edit &quot;{product?.name}&quot;
            </h1>
            <p className="text-xs text-charcoal-400">
              Update photos, pricing, category, and live catalog visibility.
            </p>
          </div>
        </div>

        {product?.slug && (
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-charcoal-950 text-sand-200 hover:text-white border border-charcoal-800 text-xs font-semibold"
          >
            <span>View on Website</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {errorMessage && (
        <div className="rounded-2xl bg-red-950/80 p-4 text-xs sm:text-sm text-red-300 border border-red-800 font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Details */}
        <div className="rounded-3xl bg-charcoal-950 p-6 sm:p-8 border border-charcoal-800 space-y-6">
          <h2 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
            <Layers className="h-5 w-5" />
            <span>1. General Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Product Title *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Furniture Category *
              </label>
              <select
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Primary Material & Timber
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Short Summary (Card Preview)
              </label>
              <input
                type="text"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Full Description & Craftsmanship Details
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none resize-y"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Image Upload System */}
        <div className="rounded-3xl bg-charcoal-950 p-6 sm:p-8 border border-charcoal-800 space-y-6">
          <h2 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
            <UploadCloud className="h-5 w-5" />
            <span>2. Product Photos & Gallery ({images.length} added)</span>
          </h2>

          {/* Upload Drop Zone */}
          <div className="border-2 border-dashed border-charcoal-700 hover:border-brand-500 rounded-3xl p-6 sm:p-8 text-center bg-charcoal-900/50 transition-colors">
            <input
              type="file"
              id="file-upload-edit"
              multiple
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload-edit"
              className="flex flex-col items-center justify-center cursor-pointer space-y-3"
            >
              <div className="p-3.5 rounded-2xl bg-brand-900/50 text-amber-300 border border-brand-800">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {isUploading ? "Uploading photos..." : "Click to add more photos"}
                </p>
                <p className="text-xs text-charcoal-400 mt-1">
                  Upload images or enter image URLs below.
                </p>
              </div>
            </label>
          </div>

          {/* Manual URL Add */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="url"
              placeholder="Or paste an image URL directly..."
              value={manualUrlInput}
              onChange={(e) => setManualUrlInput(e.target.value)}
              className="flex-1 rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2 text-xs sm:text-sm text-white placeholder:text-charcoal-500 focus:outline-none"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddManualUrl}
              className="border-charcoal-700 text-sand-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span>Add URL</span>
            </Button>
          </div>

          {/* Uploaded Images Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden border-2 bg-charcoal-900 p-1 space-y-2 ${
                    img.is_cover ? "border-amber-400 shadow-md" : "border-charcoal-700"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-charcoal-800">
                    <Image
                      src={img.image_url}
                      alt={img.alt_text || "Photo"}
                      fill
                      className="object-cover"
                    />
                    {img.is_cover && (
                      <span className="absolute top-2 left-2 bg-amber-500 text-charcoal-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                        Cover Image
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between px-1 pb-1">
                    {!img.is_cover ? (
                      <button
                        type="button"
                        onClick={() => handleSetCover(index)}
                        className="text-[11px] font-semibold text-charcoal-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                      >
                        <Star className="h-3 w-3" />
                        <span>Make Cover</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-amber-300">
                        ★ Cover
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-1 rounded-lg text-red-400 hover:bg-red-950/50"
                      title="Remove image"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Specifications & Dimensions */}
        <div className="rounded-3xl bg-charcoal-950 p-6 sm:p-8 border border-charcoal-800 space-y-6">
          <h2 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span>3. Dimensions & Customization</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Dimensions / Sizing
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Available Colors / Finishes (Comma separated)
              </label>
              <input
                type="text"
                name="color_options"
                value={formData.color_options}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Pricing & Visibility */}
        <div className="rounded-3xl bg-charcoal-950 p-6 sm:p-8 border border-charcoal-800 space-y-6">
          <h2 className="font-serif text-lg font-bold text-amber-300">
            4. Pricing & Visibility
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Price Display Type
              </label>
              <select
                name="price_type"
                value={formData.price_type}
                onChange={handleChange}
                className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="starting_at">Starting At (e.g. Starts at ₹34,000)</option>
                <option value="fixed">Fixed Price (e.g. ₹42,000)</option>
                <option value="range">Price Range (e.g. ₹18,000 - ₹25,000)</option>
                <option value="contact_for_price">Contact for Price</option>
              </select>
            </div>

            {formData.price_type !== "contact_for_price" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                  Price (in ₹ INR)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
                />
              </div>
            )}

            {formData.price_type === "range" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                  Max Price (in ₹ INR)
                </label>
                <input
                  type="number"
                  name="price_max"
                  value={formData.price_max}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-sm text-white placeholder:text-charcoal-500 focus:border-brand-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="pt-4 border-t border-charcoal-800 flex flex-wrap gap-6 text-xs sm:text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-charcoal-200">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Publish Live in Showroom Catalog</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-charcoal-200">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Feature on Homepage Spotlight</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-charcoal-200">
              <input
                type="checkbox"
                name="is_new_arrival"
                checked={formData.is_new_arrival}
                onChange={handleChange}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Mark as New Arrival</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link href="/admin/products">
            <Button type="button" variant="outline" className="border-charcoal-700 text-sand-200">
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="bg-brand-700 hover:bg-brand-600 text-white font-bold"
          >
            <Save className="h-4 w-4 mr-2" />
            <span>Save Changes</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
