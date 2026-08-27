-- ==============================================================================
-- SAI FURNITURE — COMPLETE DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Navegaon, Gadchiroli, Maharashtra, India
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_name TEXT NOT NULL DEFAULT 'Sai Furniture',
    tagline TEXT NOT NULL DEFAULT 'Premium Custom Furniture & Handcrafted Living',
    phone TEXT NOT NULL DEFAULT '+91 9876543210',
    whatsapp TEXT NOT NULL DEFAULT '919876543210',
    email TEXT DEFAULT 'contact@saifurniture.in',
    address TEXT NOT NULL DEFAULT 'Main Road, Near Bus Stand, Navegaon',
    city TEXT NOT NULL DEFAULT 'Navegaon, Gadchiroli',
    state TEXT NOT NULL DEFAULT 'Maharashtra',
    pincode TEXT NOT NULL DEFAULT '441201',
    google_maps_embed_url TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120000!2d79.9!3d20.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDA2JzAwLjAiTiA3OcKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin',
    business_hours TEXT NOT NULL DEFAULT 'Mon - Sun: 09:00 AM - 08:30 PM',
    hero_title TEXT NOT NULL DEFAULT 'Elevate Your Home with Handcrafted Timber & Modern Elegance',
    hero_subtitle TEXT NOT NULL DEFAULT 'Explore our exclusive collection of luxury sofas, teak wood beds, dining ensembles, and bespoke furniture crafted in Navegaon, Gadchiroli.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    material TEXT,
    dimensions TEXT,
    color_options TEXT[] DEFAULT '{}',
    price_type TEXT NOT NULL DEFAULT 'contact_for_price' CHECK (price_type IN ('fixed', 'starting_at', 'range', 'contact_for_price')),
    price NUMERIC(12, 2) DEFAULT NULL,
    price_max NUMERIC(12, 2) DEFAULT NULL,
    is_featured BOOLEAN DEFAULT false,
    is_new_arrival BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    is_cover BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BANNERS TABLE
CREATE TABLE IF NOT EXISTS banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    badge TEXT DEFAULT 'Featured Collection',
    cta_text TEXT DEFAULT 'Explore Collection',
    cta_link TEXT DEFAULT '/products',
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for high-performance querying
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_new_arrival ON products(is_new_arrival);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Set up Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES (Read-only for public catalog)
CREATE POLICY "Public can view active site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active categories" ON categories FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Public can view active products" ON products FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Public can view product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public can view active banners" ON banners FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

-- Customer enquiry submission policy
CREATE POLICY "Public can submit enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- ADMIN POLICIES (Full access for authenticated users / service role)
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access categories" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access products" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access product_images" ON product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access banners" ON banners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access enquiries" ON enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- STORAGE BUCKET CONFIGURATION
-- Note: Create bucket 'sai-furniture-assets' in Supabase Storage with public access enabled.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('sai-furniture-assets', 'sai-furniture-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access to Furniture Assets" ON storage.objects FOR SELECT USING (bucket_id = 'sai-furniture-assets');
CREATE POLICY "Authenticated users can upload furniture assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'sai-furniture-assets');
CREATE POLICY "Authenticated users can update furniture assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'sai-furniture-assets');
CREATE POLICY "Authenticated users can delete furniture assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'sai-furniture-assets');
