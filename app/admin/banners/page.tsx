"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Banner } from "@/types";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  UploadCloud, 
  Save, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    badge: "Featured Collection",
    cta_text: "Explore Collection",
    cta_link: "/products",
    image_url: "",
    display_order: 0,
    is_active: true,
  });

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load banners:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      subtitle: "",
      badge: "Showroom Highlight",
      cta_text: "Explore Collection",
      cta_link: "/products",
      image_url:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",
      display_order: banners.length + 1,
      is_active: true,
    });
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      badge: banner.badge || "",
      cta_text: banner.cta_text || "Explore Collection",
      cta_link: banner.cta_link || "/products",
      image_url: banner.image_url,
      display_order: banner.display_order,
      is_active: banner.is_active,
    });
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) throw new Error("Failed to upload banner image");

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, image_url: data.url }));
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload banner image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image_url.trim()) {
      setErrorMessage("Banner title and image are required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const isEditing = !!editingBanner;
      const res = await fetch("/api/admin/banners", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing ? { id: editingBanner.id, ...formData } : formData
        ),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save banner");
      }

      setIsModalOpen(false);
      fetchBanners();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete banner "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/banners?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      alert("Failed to delete banner");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Homepage Hero Banners ({banners.length})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Manage the large full-width carousel slides on the storefront homepage.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="bg-brand-700 hover:bg-brand-600 text-white font-semibold self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>Add Hero Banner</span>
        </Button>
      </div>

      {/* Banners Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-charcoal-400 space-y-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs">Loading banners...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="rounded-3xl bg-charcoal-950 p-12 text-center text-charcoal-400 space-y-3 border border-charcoal-800">
          <p className="text-sm">No banners created yet.</p>
          <Button onClick={handleOpenAdd} size="sm">
            Create First Banner
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="rounded-3xl bg-charcoal-950 border border-charcoal-800 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal-900">
                <Image
                  src={banner.image_url}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-charcoal-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-300">
                  Slide #{banner.display_order}
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      banner.is_active
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-700"
                        : "bg-red-950/80 text-red-400 border border-red-700"
                    }`}
                  >
                    {banner.is_active ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  {banner.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      {banner.badge}
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className="text-xs text-charcoal-400 mt-1 line-clamp-2">
                      {banner.subtitle}
                    </p>
                  )}
                  <div className="mt-2 text-[11px] text-brand-400 font-medium">
                    Button: &quot;{banner.cta_text}&quot; → {banner.cta_link}
                  </div>
                </div>

                <div className="pt-3 border-t border-charcoal-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(banner)}
                    className="p-2 rounded-xl bg-charcoal-900 text-amber-400 hover:text-amber-300 hover:bg-charcoal-800 transition-colors"
                    title="Edit banner"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(banner.id, banner.title)}
                    className="p-2 rounded-xl bg-charcoal-900 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                    title="Delete banner"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Banner Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? "Edit Hero Banner" : "Add New Hero Banner"}
        description="High-resolution landscape photos (1600x900px) work best for the homepage banner slider."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <Input
            label="Banner Heading / Title *"
            name="title"
            required
            placeholder="e.g. The Royal Teakwood Collection"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <Textarea
            label="Subtitle / Subtext"
            name="subtitle"
            rows={2}
            placeholder="Handcrafted solid wood bedroom sets built for generations of warmth..."
            value={formData.subtitle}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Badge Tag"
              placeholder="e.g. Festive Edition"
              value={formData.badge}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, badge: e.target.value }))
              }
            />
            <Input
              label="CTA Button Text"
              placeholder="Explore Collection"
              value={formData.cta_text}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cta_text: e.target.value }))
              }
            />
            <Input
              label="CTA Target Link"
              placeholder="/products"
              value={formData.cta_link}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cta_link: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
              Banner Background Image *
            </label>

            <div className="flex items-center gap-3">
              <input
                type="url"
                required
                placeholder="Image URL or upload..."
                value={formData.image_url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                }
                className="flex-1 rounded-xl border border-charcoal-300 px-3 py-2 text-xs text-charcoal-900"
              />
              <label className="cursor-pointer px-3 py-2 bg-sand-100 hover:bg-sand-200 text-charcoal-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0">
                <UploadCloud className="h-4 w-4" />
                <span>{isUploading ? "Uploading..." : "Upload File"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {formData.image_url && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-sand-100 border mt-2">
                <Image
                  src={formData.image_url}
                  alt="Banner Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Input
              label="Display Order (Sequence)"
              name="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  display_order: Number(e.target.value),
                }))
              }
            />

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
                  }
                  className="rounded text-brand-700"
                />
                <span>Active on Homepage Slider</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isSubmitting}>
              <Save className="h-3.5 w-3.5 mr-1" />
              <span>{editingBanner ? "Update Banner" : "Create Banner"}</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
