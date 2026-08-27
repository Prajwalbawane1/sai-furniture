"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Category } from "@/types";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Layers, 
  UploadCloud, 
  Save, 
  Check, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    display_order: 0,
    is_active: true,
  });

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      image_url:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      display_order: categories.length + 1,
      is_active: true,
    });
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      description: cat.description || "",
      image_url: cat.image_url || "",
      display_order: cat.display_order,
      is_active: cat.is_active,
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

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, image_url: data.url }));
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const isEditing = !!editingCategory;
      const res = await fetch("/api/admin/categories", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing ? { id: editingCategory.id, ...formData } : formData
        ),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save category");
      }

      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Furniture Categories ({categories.length})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Organize customer browsing departments with cover photos and order sequence.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="bg-brand-700 hover:bg-brand-600 text-white font-semibold self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>Add New Category</span>
        </Button>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-charcoal-400 space-y-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-3xl bg-charcoal-950 p-12 text-center text-charcoal-400 space-y-3 border border-charcoal-800">
          <p className="text-sm">No categories created yet.</p>
          <Button onClick={handleOpenAdd} size="sm">
            Create First Category
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const imageUrl =
              cat.image_url ||
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

            return (
              <div
                key={cat.id}
                className="rounded-3xl bg-charcoal-950 border border-charcoal-800 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-900">
                  <Image
                    src={imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-charcoal-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-300">
                    Order #{cat.display_order}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        cat.is_active
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-700"
                          : "bg-red-950/80 text-red-400 border border-red-700"
                      }`}
                    >
                      {cat.is_active ? "Active" : "Hidden"}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-charcoal-400 mt-1 line-clamp-2">
                      {cat.description || "No description provided."}
                    </p>
                    <p className="text-[11px] text-amber-400/80 font-mono mt-1">
                      Slug: /{cat.slug}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between">
                    <span className="text-xs text-charcoal-400">
                      {cat.product_count !== undefined ? `${cat.product_count} Products` : "0 Products"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        className="p-2 rounded-xl bg-charcoal-900 text-amber-400 hover:text-amber-300 hover:bg-charcoal-800 transition-colors"
                        title="Edit category"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="p-2 rounded-xl bg-charcoal-900 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                        title="Delete category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Furniture Category" : "Add New Category"}
        description="Categories automatically generate clean SEO URLs and appear in customer navigation."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <Input
            label="Category Name *"
            name="name"
            required
            placeholder="e.g. Luxury Recliners"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <Textarea
            label="Category Description"
            name="description"
            rows={2}
            placeholder="Short description displayed on category page..."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
              Cover Image Photo
            </label>

            <div className="flex items-center gap-3">
              <input
                type="url"
                placeholder="Image URL or upload below..."
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
              <div className="relative aspect-[16/9] w-full max-w-xs rounded-xl overflow-hidden bg-sand-100 border mt-2">
                <Image
                  src={formData.image_url}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                <span>Active / Published</span>
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
              <span>{editingCategory ? "Update Category" : "Create Category"}</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
