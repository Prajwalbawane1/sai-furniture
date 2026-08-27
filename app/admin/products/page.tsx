"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/types";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Check, 
  X, 
  Layers, 
  Eye 
} from "lucide-react";
import { formatPriceDisplay } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      setProducts(Array.isArray(prodData) ? prodData : []);
      setCategories(Array.isArray(catData) ? catData : []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the catalog?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (product: Product, field: "is_active" | "is_featured" | "is_new_arrival") => {
    const updatedValue = !product[field];
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: updatedValue }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, [field]: updatedValue } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.material?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || p.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Catalog Products ({products.length})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Manage your furniture listings, images, pricing, and live showroom visibility.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-600 text-white text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Furniture</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by title, material, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-950 text-xs sm:text-sm text-white placeholder:text-charcoal-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-950 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl bg-charcoal-950 border border-charcoal-800 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-charcoal-400 space-y-3">
            <div className="h-6 w-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
            <p className="text-xs">Loading furniture products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-charcoal-400 space-y-3">
            <p className="text-sm">No products found matching your filters.</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create a new product now</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-charcoal-900 text-charcoal-300 uppercase tracking-wider text-[11px] font-semibold border-b border-charcoal-800">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-4 text-center">Featured</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60 text-charcoal-200">
                {filteredProducts.map((prod) => {
                  const cover =
                    prod.images?.find((img) => img.is_cover)?.image_url ||
                    prod.images?.[0]?.image_url ||
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80";

                  return (
                    <tr key={prod.id} className="hover:bg-charcoal-900/50 transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-charcoal-800 shrink-0 border border-charcoal-700">
                            <Image
                              src={cover}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                              {prod.name}
                            </h4>
                            <p className="text-[11px] text-charcoal-400 mt-0.5 line-clamp-1">
                              {prod.material || "Solid Wood"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-charcoal-900 text-sand-200 border border-charcoal-700 text-xs">
                          {prod.category?.name || "Unassigned"}
                        </span>
                      </td>

                      {/* Price Display */}
                      <td className="py-4 px-6 font-semibold text-amber-300">
                        {formatPriceDisplay(prod.price_type, prod.price, prod.price_max)}
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(prod, "is_featured")}
                          className={`p-1.5 rounded-lg border transition-all ${
                            prod.is_featured
                              ? "bg-amber-950 text-amber-300 border-amber-800"
                              : "bg-charcoal-900 text-charcoal-500 border-charcoal-800 hover:text-charcoal-300"
                          }`}
                          title="Toggle Featured on Homepage"
                        >
                          <Sparkles className="h-4 w-4" />
                        </button>
                      </td>

                      {/* Active Status Toggle */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(prod, "is_active")}
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold border transition-all ${
                            prod.is_active
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-red-950/60 text-red-400 border-red-800"
                          }`}
                        >
                          {prod.is_active ? "Active" : "Hidden"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${prod.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-charcoal-900 text-charcoal-300 hover:text-white hover:bg-charcoal-800 transition-colors"
                            title="View on Live Website"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${prod.id}/edit`}
                            className="p-2 rounded-lg bg-charcoal-900 text-amber-400 hover:text-amber-300 hover:bg-charcoal-800 transition-colors"
                            title="Edit Product Details"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(prod.id, prod.name)}
                            disabled={deletingId === prod.id}
                            className="p-2 rounded-lg bg-charcoal-900 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors disabled:opacity-50"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
