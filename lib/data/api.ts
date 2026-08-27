import {
  initialSiteSettings,
  initialCategories,
  initialBanners,
  initialProducts,
  initialEnquiries,
} from "./mock-data";
import { SiteSettings, Category, Product, Banner, Enquiry, ProductImage } from "@/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// In-memory runtime state for development/fallback
let memorySettings: SiteSettings = { ...initialSiteSettings };
let memoryCategories: Category[] = [...initialCategories];
let memoryBanners: Banner[] = [...initialBanners];
let memoryProducts: Product[] = [...initialProducts];
let memoryEnquiries: Enquiry[] = [...initialEnquiries];

// ==========================================
// 1. SITE SETTINGS
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();
    if (!error && data) {
      return data as SiteSettings;
    }
  }
  return memorySettings;
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_settings")
      .upsert({ ...updates, id: updates.id || "a1111111-1111-1111-1111-111111111111", updated_at: new Date().toISOString() })
      .select()
      .single();
    if (!error && data) {
      return data as SiteSettings;
    }
  }
  memorySettings = { ...memorySettings, ...updates, updated_at: new Date().toISOString() };
  return memorySettings;
}

// ==========================================
// 2. CATEGORIES
// ==========================================
export async function getCategories(onlyActive = true): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    let query = supabase.from("categories").select("*, products(count)");
    if (onlyActive) {
      query = query.eq("is_active", true);
    }
    const { data, error } = await query.order("display_order", { ascending: true });
    if (!error && data) {
      return data.map((c: any) => ({
        ...c,
        product_count: c.products?.[0]?.count || 0,
      })) as Category[];
    }
  }

  let result = onlyActive
    ? memoryCategories.filter((c) => c.is_active)
    : memoryCategories;

  return result
    .map((c) => ({
      ...c,
      product_count: memoryProducts.filter(
        (p) => p.category_id === c.id && (onlyActive ? p.is_active : true)
      ).length,
    }))
    .sort((a, b) => a.display_order - b.display_order);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as Category;
  }
  return memoryCategories.find((c) => c.slug === slug) || null;
}

export async function createCategory(cat: Omit<Category, "id">): Promise<Category> {
  const newId = "cat-" + Date.now();
  const newCat: Category = {
    ...cat,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("categories").insert([cat]).select().single();
    if (!error && data) return data as Category;
  }

  memoryCategories.push(newCat);
  return newCat;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) return data as Category;
  }

  const index = memoryCategories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  memoryCategories[index] = {
    ...memoryCategories[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return memoryCategories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) return true;
  }
  const prevLen = memoryCategories.length;
  memoryCategories = memoryCategories.filter((c) => c.id !== id);
  return memoryCategories.length < prevLen;
}

// ==========================================
// 3. BANNERS
// ==========================================
export async function getBanners(onlyActive = true): Promise<Banner[]> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    let query = supabase.from("banners").select("*");
    if (onlyActive) query = query.eq("is_active", true);
    const { data, error } = await query.order("display_order", { ascending: true });
    if (!error && data) return data as Banner[];
  }
  const result = onlyActive ? memoryBanners.filter((b) => b.is_active) : memoryBanners;
  return result.sort((a, b) => a.display_order - b.display_order);
}

export async function createBanner(banner: Omit<Banner, "id">): Promise<Banner> {
  const newId = "ban-" + Date.now();
  const newBanner: Banner = { ...banner, id: newId, created_at: new Date().toISOString() };

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("banners").insert([banner]).select().single();
    if (!error && data) return data as Banner;
  }
  memoryBanners.push(newBanner);
  return newBanner;
}

export async function updateBanner(id: string, updates: Partial<Banner>): Promise<Banner | null> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("banners").update(updates).eq("id", id).select().single();
    if (!error && data) return data as Banner;
  }
  const idx = memoryBanners.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  memoryBanners[idx] = { ...memoryBanners[idx], ...updates };
  return memoryBanners[idx];
}

export async function deleteBanner(id: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (!error) return true;
  }
  memoryBanners = memoryBanners.filter((b) => b.id !== id);
  return true;
}

// ==========================================
// 4. PRODUCTS
// ==========================================
export async function getProducts({
  categoryId,
  categorySlug,
  isFeatured,
  isNewArrival,
  search,
  sortBy = "newest",
  onlyActive = true,
  limit,
}: {
  categoryId?: string;
  categorySlug?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  search?: string;
  sortBy?: "newest" | "price_asc" | "price_desc" | "name_asc";
  onlyActive?: boolean;
  limit?: number;
} = {}): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    let query = supabase
      .from("products")
      .select("*, category:categories(*), images:product_images(*)");

    if (onlyActive) query = query.eq("is_active", true);
    if (categoryId) query = query.eq("category_id", categoryId);
    if (isFeatured !== undefined) query = query.eq("is_featured", isFeatured);
    if (isNewArrival !== undefined) query = query.eq("is_new_arrival", isNewArrival);
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,material.ilike.%${search}%`);
    }

    if (sortBy === "price_asc") query = query.order("price", { ascending: true, nullsFirst: false });
    else if (sortBy === "price_desc") query = query.order("price", { ascending: false, nullsFirst: false });
    else if (sortBy === "name_asc") query = query.order("name", { ascending: true });
    else query = query.order("created_at", { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (!error && data) {
      if (categorySlug) {
        return (data as Product[]).filter((p) => p.category?.slug === categorySlug);
      }
      return data as Product[];
    }
  }

  // Fallback memory querying
  let result = memoryProducts.map((p) => ({
    ...p,
    category: memoryCategories.find((c) => c.id === p.category_id),
  }));

  if (onlyActive) result = result.filter((p) => p.is_active);
  if (categoryId) result = result.filter((p) => p.category_id === categoryId);
  if (categorySlug) result = result.filter((p) => p.category?.slug === categorySlug);
  if (isFeatured !== undefined) result = result.filter((p) => p.is_featured === isFeatured);
  if (isNewArrival !== undefined) result = result.filter((p) => p.is_new_arrival === isNewArrival);

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
    );
  }

  if (sortBy === "price_asc") {
    result.sort((a, b) => (a.price || 999999) - (b.price || 999999));
  } else if (sortBy === "price_desc") {
    result.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortBy === "name_asc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Newest
    result.sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime());
  }

  if (limit) {
    result = result.slice(0, limit);
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*), images:product_images(*)")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as Product;
  }

  const p = memoryProducts.find((item) => item.slug === slug);
  if (!p) return null;
  return {
    ...p,
    category: memoryCategories.find((c) => c.id === p.category_id),
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*), images:product_images(*)")
      .eq("id", id)
      .single();
    if (!error && data) return data as Product;
  }

  const p = memoryProducts.find((item) => item.id === id);
  if (!p) return null;
  return {
    ...p,
    category: memoryCategories.find((c) => c.id === p.category_id),
  };
}

export async function getRelatedProducts(
  categoryId: string,
  excludeProductId: string,
  limit = 4
): Promise<Product[]> {
  const all = await getProducts({ categoryId, onlyActive: true });
  return all.filter((p) => p.id !== excludeProductId).slice(0, limit);
}

export async function createProduct(
  productData: Omit<Product, "id" | "images" | "category">,
  images: Array<{ image_url: string; alt_text?: string; is_cover?: boolean; display_order?: number }>
): Promise<Product> {
  const newProductId = "prod-" + Date.now();
  const productImages: ProductImage[] = images.map((img, i) => ({
    id: `img-${Date.now()}-${i}`,
    product_id: newProductId,
    image_url: img.image_url,
    alt_text: img.alt_text || productData.name,
    is_cover: img.is_cover !== undefined ? img.is_cover : i === 0,
    display_order: img.display_order ?? i,
    created_at: new Date().toISOString(),
  }));

  const newProduct: Product = {
    ...productData,
    id: newProductId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: productImages,
    category: memoryCategories.find((c) => c.id === productData.category_id),
  };

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data: pData, error: pError } = await supabase
      .from("products")
      .insert([productData])
      .select()
      .single();

    if (!pError && pData) {
      if (images.length > 0) {
        await supabase.from("product_images").insert(
          images.map((img, i) => ({
            product_id: pData.id,
            image_url: img.image_url,
            alt_text: img.alt_text || productData.name,
            is_cover: img.is_cover !== undefined ? img.is_cover : i === 0,
            display_order: i,
          }))
        );
      }
      return getProductById(pData.id) as Promise<Product>;
    }
  }

  memoryProducts.unshift(newProduct);
  return newProduct;
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "images" | "category">>,
  images?: Array<{ image_url: string; alt_text?: string; is_cover?: boolean; display_order?: number }>
): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { error: pError } = await supabase
      .from("products")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!pError && images) {
      await supabase.from("product_images").delete().eq("product_id", id);
      if (images.length > 0) {
        await supabase.from("product_images").insert(
          images.map((img, i) => ({
            product_id: id,
            image_url: img.image_url,
            alt_text: img.alt_text || updates.name || "Product Image",
            is_cover: img.is_cover !== undefined ? img.is_cover : i === 0,
            display_order: i,
          }))
        );
      }
      return getProductById(id);
    }
  }

  const idx = memoryProducts.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const current = memoryProducts[idx];
  const updatedImages = images
    ? images.map((img, i) => ({
        id: `img-${Date.now()}-${i}`,
        product_id: id,
        image_url: img.image_url,
        alt_text: img.alt_text || updates.name || current.name,
        is_cover: img.is_cover !== undefined ? img.is_cover : i === 0,
        display_order: i,
      }))
    : current.images;

  memoryProducts[idx] = {
    ...current,
    ...updates,
    images: updatedImages,
    category: memoryCategories.find((c) => c.id === (updates.category_id || current.category_id)),
    updated_at: new Date().toISOString(),
  };

  return memoryProducts[idx];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) return true;
  }
  memoryProducts = memoryProducts.filter((p) => p.id !== id);
  return true;
}

// ==========================================
// 5. ENQUIRIES
// ==========================================
export async function getEnquiries(): Promise<Enquiry[]> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as Enquiry[];
  }
  return [...memoryEnquiries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function createEnquiry(
  enquiry: Omit<Enquiry, "id" | "status" | "created_at">
): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: "enq-" + Date.now(),
    status: "new",
    created_at: new Date().toISOString(),
  };

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("enquiries")
      .insert([{ ...enquiry, status: "new" }])
      .select()
      .single();
    if (!error && data) return data as Enquiry;
  }

  memoryEnquiries.unshift(newEnquiry);
  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"]
): Promise<Enquiry | null> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) return data as Enquiry;
  }

  const idx = memoryEnquiries.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  memoryEnquiries[idx] = { ...memoryEnquiries[idx], status };
  return memoryEnquiries[idx];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (!error) return true;
  }
  memoryEnquiries = memoryEnquiries.filter((e) => e.id !== id);
  return true;
}
