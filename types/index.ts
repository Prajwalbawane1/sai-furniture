export type PriceType = 'fixed' | 'starting_at' | 'range' | 'contact_for_price';

export interface SiteSettings {
  id: string;
  shop_name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  google_maps_embed_url: string;
  business_hours: string;
  hero_title: string;
  hero_subtitle: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  display_order: number;
  is_active: boolean;
  product_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductImage {
  id: string;
  product_id?: string;
  image_url: string;
  alt_text?: string | null;
  is_cover: boolean;
  display_order: number;
  created_at?: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  material?: string | null;
  dimensions?: string | null;
  color_options?: string[] | null;
  price_type: PriceType;
  price?: number | null;
  price_max?: number | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  category?: Category;
  images: ProductImage[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string | null;
  badge?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export type EnquiryStatus = 'new' | 'contacted' | 'completed' | 'archived';

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  product_id?: string | null;
  product_name?: string | null;
  message: string;
  status: EnquiryStatus;
  created_at: string;
}
