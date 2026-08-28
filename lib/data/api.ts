import { SiteSettings, Category, Product, Banner, Enquiry } from "@/types";
import { getSupabase, getAdminSupabase } from "@/lib/supabase/server";

// Minimal default settings fallback in case database table is empty
const defaultSettings: SiteSettings = {
  id: "a1111111-1111-1111-1111-111111111111",
  shop_name: "Sai Furniture",
  tagline: "Handcrafted Living & Luxury Wooden Elegance",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "enquiry@saifurniturenavegaon.in",
  address: "Main Road, Near Old Bus Stand, Navegaon",
  city: "Navegaon, Gadchiroli",
  state: "Maharashtra",
  pincode: "441201",
  google_maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120000!2d79.9!3d20.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDA2JzAwLjAiTiA3OcKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  business_hours: "Monday - Sunday: 9:00 AM - 9:00 PM",
  hero_title: "Mastercrafted Furniture Designed for Lifetime Comfort",
  hero_subtitle: "Discover Navegaon & Gadchiroli's finest teakwood beds, luxury sofa lounges, bespoke dining sets, and modern storage furniture built with timeless craftsmanship.",
};

// ==========================================
// 1. SITE SETTINGS
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return data as SiteSettings;
      }
    }
  } catch (err) {
    console.error("Error fetching site settings from Supabase:", err);
  }
  return defaultSettings;
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_settings")
      .upsert({
        ...updates,
        id: updates.id || "a1111111-1111-1111-1111-111111111111",
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!error && data) {
      return data as SiteSettings;
    }
    if (error) {
      console.error("Error updating site settings in Supabase:", error);
    }
  }
  return { ...defaultSettings, ...updates };
}

// ==========================================
// 2. CATEGORIES
// ==========================================
export async function getCategories(onlyActive = true): Promise<Category[]> {
  try {
    const supabase = getSupabase();
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
      if (error) {
        console.error("Error fetching categories from Supabase:", error);
      }
    }
  } catch (err) {
    console.error("Error connecting to Supabase for categories:", err);
  }
  return [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) return data as Category;
      if (error) {
        console.error(`Error fetching category slug '${slug}' from Supabase:`, error);
      }
    }
  } catch (err) {
    console.error("Error in getCategoryBySlug:", err);
  }
  return null;
}

export async function createCategory(cat: Omit<Category, "id">): Promise<Category> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("categories").insert([cat]).select().single();
    if (!error && data) return data as Category;
    if (error) throw new Error(error.message);
  }
  throw new Error("Database client not available");
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (!error && data) return data as Category;
    if (error) throw new Error(error.message);
  }
  return null;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) return true;
    if (error) throw new Error(error.message);
  }
  return false;
}

// ==========================================
// 3. BANNERS
// ==========================================
export async function getBanners(onlyActive = true): Promise<Banner[]> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      let query = supabase.from("banners").select("*");
      if (onlyActive) query = query.eq("is_active", true);
      const { data, error } = await query.order("display_order", { ascending: true });
      if (!error && data) return data as Banner[];
      if (error) {
        console.error("Error fetching banners from Supabase:", error);
      }
    }
  } catch (err) {
    console.error("Error connecting to Supabase for banners:", err);
  }
  return [];
}

export async function createBanner(banner: Omit<Banner, "id">): Promise<Banner> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("banners").insert([banner]).select().single();
    if (!error && data) return data as Banner;
    if (error) throw new Error(error.message);
  }
  throw new Error("Database client not available");
}

export async function updateBanner(id: string, updates: Partial<Banner>): Promise<Banner | null> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("banners")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (!error && data) return data as Banner;
    if (error) throw new Error(error.message);
  }
  return null;
}

export async function deleteBanner(id: string): Promise<boolean> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (!error) return true;
    if (error) throw new Error(error.message);
  }
  return false;
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
  try {
    const supabase = getSupabase();
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
        let products = data as Product[];
        if (categorySlug) {
          products = products.filter((p) => p.category?.slug === categorySlug);
        }
        return products.map((p) => ({
          ...p,
          images: (p.images || []).sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)),
        }));
      }
      if (error) {
        console.error("Error fetching products from Supabase:", error);
      }
    }
  } catch (err) {
    console.error("Error connecting to Supabase for products:", err);
  }
  return [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*), images:product_images(*)")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        const prod = data as Product;
        if (prod.images) {
          prod.images.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
        }
        return prod;
      }
      if (error) {
        console.error(`Error fetching product slug '${slug}' from Supabase:`, error);
      }
    }
  } catch (err) {
    console.error("Error in getProductBySlug:", err);
  }
  return null;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*), images:product_images(*)")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        const prod = data as Product;
        if (prod.images) {
          prod.images.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
        }
        return prod;
      }
      if (error) {
        console.error(`Error fetching product id '${id}' from Supabase:`, error);
      }
    }
  } catch (err) {
    console.error("Error in getProductById:", err);
  }
  return null;
}

export async function getRelatedProducts(
  categoryId: string,
  excludeProductId: string,
  limit = 4
): Promise<Product[]> {
  const all = await getProducts({ categoryId, onlyActive: true, limit: limit + 1 });
  return all.filter((p) => p.id !== excludeProductId).slice(0, limit);
}

export async function createProduct(
  productData: Omit<Product, "id" | "images" | "category">,
  images: Array<{ image_url: string; alt_text?: string; is_cover?: boolean; display_order?: number }>
): Promise<Product> {
  const supabase = getAdminSupabase() || getSupabase();
  if (!supabase) throw new Error("Database client not available");

  const { data: pData, error: pError } = await supabase
    .from("products")
    .insert([productData])
    .select()
    .single();

  if (pError || !pData) {
    throw new Error(pError?.message || "Failed to create product");
  }

  if (images && images.length > 0) {
    const { error: imgError } = await supabase.from("product_images").insert(
      images.map((img, i) => ({
        product_id: pData.id,
        image_url: img.image_url,
        alt_text: img.alt_text || productData.name,
        is_cover: img.is_cover !== undefined ? img.is_cover : i === 0,
        display_order: img.display_order ?? i,
      }))
    );
    if (imgError) {
      console.error("Error inserting product images:", imgError);
    }
  }

  const created = await getProductById(pData.id);
  if (!created) throw new Error("Product created but failed to retrieve");
  return created;
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "images" | "category">>,
  images?: Array<{ image_url: string; alt_text?: string; is_cover?: boolean; display_order?: number }>
): Promise<Product | null> {
  const supabase = getAdminSupabase() || getSupabase();
  if (!supabase) throw new Error("Database client not available");

  const { error: pError } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (pError) throw new Error(pError.message);

  if (images !== undefined) {
    await supabase.from("product_images").delete().eq("product_id", id);
    if (images.length > 0) {
      await supabase.from("product_images").insert(
        images.map((img, i) => ({
          product_id: id,
          image_url: img.image_url,
          alt_text: img.alt_text || updates.name || "Product Image",
          is_cover: img.is_cover !== undefined ? img.is_cover : i === 0,
          display_order: img.display_order ?? i,
        }))
      );
    }
  }

  return getProductById(id);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) return true;
    if (error) throw new Error(error.message);
  }
  return false;
}

// ==========================================
// 5. ENQUIRIES
// ==========================================
export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const supabase = getAdminSupabase() || getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) return data as Enquiry[];
      if (error) console.error("Error fetching enquiries from Supabase:", error);
    }
  } catch (err) {
    console.error("Error connecting to Supabase for enquiries:", err);
  }
  return [];
}

export async function createEnquiry(
  enquiry: Omit<Enquiry, "id" | "status" | "created_at">
): Promise<Enquiry> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("enquiries")
      .insert([{ ...enquiry, status: "new" }])
      .select()
      .single();
    if (!error && data) return data as Enquiry;
    if (error) throw new Error(error.message);
  }
  throw new Error("Database client not available");
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"]
): Promise<Enquiry | null> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) return data as Enquiry;
    if (error) throw new Error(error.message);
  }
  return null;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const supabase = getAdminSupabase() || getSupabase();
  if (supabase) {
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (!error) return true;
    if (error) throw new Error(error.message);
  }
  return false;
}
