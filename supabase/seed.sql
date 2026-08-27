-- ==============================================================================
-- SAI FURNITURE — INITIAL SEED DATA
-- Navegaon, Gadchiroli, Maharashtra, India
-- ==============================================================================

-- 1. Insert Site Settings
INSERT INTO site_settings (
    id, shop_name, tagline, phone, whatsapp, email, address, city, state, pincode, business_hours, hero_title, hero_subtitle
) VALUES (
    'a1111111-1111-1111-1111-111111111111',
    'Sai Furniture',
    'Handcrafted Living & Luxury Wooden Elegance',
    '+91 98765 43210',
    '919876543210',
    'enquiry@saifurniturenavegaon.in',
    'Main Road, Near Old Bus Stand, Navegaon',
    'Navegaon, Gadchiroli',
    'Maharashtra',
    '441201',
    'Monday - Sunday: 9:00 AM - 9:00 PM',
    'Mastercrafted Furniture Designed for Lifetime Comfort',
    'Discover Navegaon & Gadchiroli''s finest teakwood beds, luxury sofa lounges, bespoke dining sets, and modern storage furniture built with timeless craftsmanship.'
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Categories
INSERT INTO categories (id, name, slug, description, image_url, display_order, is_active) VALUES
('c1111111-1111-1111-1111-111111111111', 'Living Room & Sofas', 'living-room-sofas', 'Premium L-shaped sectionals, velvet recliners, solid wood sofa sets, and coffee tables.', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80', 1, true),
('c2222222-2222-2222-2222-222222222222', 'Beds & Bedroom Sets', 'beds-bedroom-sets', 'King and Queen solid teakwood beds, hydraulic storage beds, and nightstands.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80', 2, true),
('c3333333-3333-3333-3333-333333333333', 'Dining Tables & Chairs', 'dining-tables-chairs', '4-seater, 6-seater, and 8-seater solid wood and marble-finish luxury dining ensembles.', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80', 3, true),
('c4444444-4444-4444-4444-444444444444', 'Wardrobes & Storage', 'wardrobes-storage', 'Engineered wood & pure teak sliding wardrobes, almirahs, and chest of drawers.', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80', 4, true),
('c5555555-5555-5555-5555-555555555555', 'TV Units & Consoles', 'tv-units-consoles', 'Floating entertainment centers, media consoles, and display showcases.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', 5, true),
('c6666666-6666-6666-6666-666666666666', 'Office & Study Desks', 'office-study-desks', 'Ergonomic executive desks, book racks, and ergonomic conference seating.', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80', 6, true),
('c7777777-7777-7777-7777-777777777777', 'Custom & Bespoke Orders', 'custom-bespoke-furniture', 'Tailored wooden masterpieces made to your exact measurements, timber choice, and polish.', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80', 7, true)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Banners
INSERT INTO banners (id, title, subtitle, badge, cta_text, cta_link, image_url, is_active, display_order) VALUES
('b1111111-1111-1111-1111-111111111111', 'The Royal Teakwood Collection', 'Handcrafted solid wood bedroom sets built for generations of warmth and luxury in Vidarbha.', 'Festive Showroom Edition', 'Explore Bedroom Sets', '/categories/beds-bedroom-sets', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85', true, 1),
('b2222222-2222-2222-2222-222222222222', 'Artisan Living Room Lounges', 'High-density foam comfort wrapped in premium stain-resistant velvet and natural teak accents.', 'Bespoke Sofas', 'View Sofas & Sectionals', '/categories/living-room-sofas', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85', true, 2),
('b3333333-3333-3333-3333-333333333333', 'Custom Furniture Made To Measure', 'Have a specific design in mind? Visit our Navegaon showroom or WhatsApp your room layout for a custom quote.', 'Local Craftsmanship', 'Enquire Custom Design', '/contact', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1600&q=85', true, 3)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Products & Images
-- Product 1: Maharaja Teak King Bed
INSERT INTO products (
    id, category_id, name, slug, short_description, description, material, dimensions, color_options, price_type, price, price_max, is_featured, is_new_arrival, is_active
) VALUES (
    'p1111111-1111-1111-1111-111111111111',
    'c2222222-2222-2222-2222-222222222222',
    'Maharaja Teakwood King Size Hydraulic Bed',
    'maharaja-teakwood-king-bed',
    'Premium solid teakwood king bed with hydraulic lift-up storage and cushioned velvet headboard.',
    'Crafted from seasoned Grade-A CP Teakwood, the Maharaja King Bed combines regal traditional woodwork with effortless modern functionality. Features high-load gas-lift hydraulic storage underneath, reinforced internal framing, and an ergonomic upholstered tufted headboard for superior back support while reading.',
    'Grade-A Seasoned Teak Wood, German Hydraulic Gas-Lifts, Premium Upholstery',
    '78" L x 72" W x 48" H (Mattress size: 72" x 78")',
    ARRAY['Natural Teak Gloss', 'Walnut Matte', 'Dark Mahogany'],
    'starting_at',
    42000,
    NULL,
    true,
    true,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, is_cover, display_order) VALUES
('p1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', 'Maharaja Teakwood King Bed Main View', true, 1),
('p1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=80', 'Headboard detail and polish', false, 2),
('p1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', 'Room ambiance view', false, 3);

-- Product 2: Imperial L-Shape Velvet Sectional
INSERT INTO products (
    id, category_id, name, slug, short_description, description, material, dimensions, color_options, price_type, price, price_max, is_featured, is_new_arrival, is_active
) VALUES (
    'p2222222-2222-2222-2222-222222222222',
    'c1111111-1111-1111-1111-111111111111',
    'Imperial 7-Seater L-Shape Sectional Sofa',
    'imperial-7-seater-sectional-sofa',
    'Ultra-comfortable luxury living room sectional sofa with high-density 40D foam and stain-guard fabric.',
    'Elevate your family gatherings with our flagship 7-seater sectional. Constructed around a heavy-duty Salwood and Marandi wood frame with anti-sag zig-zag steel springs and 40-density HR foam cushioning. Includes 5 complimentary matching toss pillows and detachable cushion covers for easy maintenance.',
    'Seasoned Salwood Inner Frame, 40-Density HR Foam, Velvet Chenille Fabric',
    '108" L x 84" Depth x 34" H',
    ARRAY['Emerald Green', 'Royal Navy Blue', 'Warm Sand Beige', 'Charcoal Grey'],
    'starting_at',
    38500,
    NULL,
    true,
    true,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, is_cover, display_order) VALUES
('p2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80', 'Imperial Sectional Sofa Living Room', true, 1),
('p2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80', 'Seating fabric and armrest detail', false, 2);

-- Product 3: Sheesham 6-Seater Royal Dining Table
INSERT INTO products (
    id, category_id, name, slug, short_description, description, material, dimensions, color_options, price_type, price, price_max, is_featured, is_new_arrival, is_active
) VALUES (
    'p3333333-3333-3333-3333-333333333333',
    'c3333333-3333-3333-3333-333333333333',
    'Heritage Sheesham 6-Seater Dining Ensemble',
    'heritage-sheesham-6-seater-dining-table',
    'Solid Sheesham wood 6-seater dining set with ergonomic cushioned chairs and heat-resistant polish.',
    'A masterclass in solid wood carpentry. The Heritage 6-Seater dining table features natural wood grain patterns, robust 4x4 inch solid legs, and 6 matching high-back chairs with premium cushioned seating for comfortable long family dinners.',
    '100% Solid Indian Sheesham (Rosewood) with Melamine Heat-Proof Polish',
    'Table: 60" L x 36" W x 30" H | Chairs: 18" W x 18" D x 38" H',
    ARRAY['Natural Honey Polish', 'Dark Walnut', 'Teak Gloss'],
    'starting_at',
    34000,
    NULL,
    true,
    false,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, is_cover, display_order) VALUES
('p3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80', 'Heritage Sheesham Dining Ensemble', true, 1),
('p3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80', 'Dining Table Top and Wood Grain Detail', false, 2);

-- Product 4: Grand 4-Door Sliding Wardrobe
INSERT INTO products (
    id, category_id, name, slug, short_description, description, material, dimensions, color_options, price_type, price, price_max, is_featured, is_new_arrival, is_active
) VALUES (
    'p4444444-4444-4444-4444-444444444444',
    'c4444444-4444-4444-4444-444444444444',
    'Grand 4-Door Wardrobe with Full-Length Mirror & Soft-Close',
    'grand-4-door-sliding-wardrobe',
    'Spacious master bedroom wardrobe with dual hanging rods, 4 security drawers, and vanity mirror.',
    'Organize your garments in sheer elegance. Built with waterproof Action TESA HDHMR boards with anti-termite treatment, heavy-duty soft-close hinges, internal LED sensor illumination slots, and dual digital locker compartments.',
    'High-Density Moisture-Resistant HDHMR Board + Acrylic Laminate Finish',
    '84" H x 72" W x 24" Depth',
    ARRAY['Smoked Oak & Champagne Gold', 'Gloss White & Walnut', 'Rustic Teak'],
    'starting_at',
    45000,
    NULL,
    false,
    true,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, is_cover, display_order) VALUES
('p4444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80', 'Grand 4-Door Wardrobe Front', true, 1),
('p4444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80', 'Wardrobe interior layout preview', false, 2);

-- Product 5: Nordic Floating TV Entertainment Console
INSERT INTO products (
    id, category_id, name, slug, short_description, description, material, dimensions, color_options, price_type, price, price_max, is_featured, is_new_arrival, is_active
) VALUES (
    'p5555555-5555-5555-5555-555555555555',
    'c5555555-5555-5555-5555-555555555555',
    'Nordic Floating TV Entertainment Console with Backlit Panel',
    'nordic-floating-tv-console',
    'Modern wall-mounted TV console with fluted wood paneling, concealed wire management, and ambient LED channel.',
    'Designed for modern living rooms accommodating up to 75-inch televisions. Features fluted wooden acoustic paneling, soft-push drop-down drawers for set-top boxes and gaming consoles, and integrated cable organization channels.',
    'BWR Grade Marine Plywood, Charcoal Matte & Natural Oak Veneer',
    '72" W x 14" D x 58" Total Height',
    ARRAY['Natural Oak & Charcoal Fluted', 'Walnut & Matte Gold', 'All-White Gloss'],
    'starting_at',
    18500,
    NULL,
    true,
    false,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, is_cover, display_order) VALUES
('p5555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Nordic TV Console Wall Unit', true, 1),
('p5555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80', 'Console storage detail', false, 2);

-- Product 6: Executive Solid Wood Study & Office Desk
INSERT INTO products (
    id, category_id, name, slug, short_description, description, material, dimensions, color_options, price_type, price, price_max, is_featured, is_new_arrival, is_active
) VALUES (
    'p6666666-6666-6666-6666-666666666666',
    'c6666666-6666-6666-6666-666666666666',
    'Executive Solid Wood Study & Work Desk',
    'executive-solid-wood-office-desk',
    'Ergonomic workstation with side pedestal drawers, laptop ventilation cutout, and solid wooden legs.',
    'Built for productivity, study, and executive offices. Features a wide scratch-resistant wooden surface, 3 side lockable drawers, cable grommet, and heavy solid wood joinery.',
    'Seasoned Teak Wood Frame & High-Grade Plywood Top',
    '48" L x 24" W x 30" H',
    ARRAY['Rich Teak Polish', 'Ebony Black & Oak'],
    'starting_at',
    14500,
    NULL,
    false,
    true,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, is_cover, display_order) VALUES
('p6666666-6666-6666-6666-666666666666', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80', 'Executive Study Desk', true, 1);

-- Product 7: Bespoke Custom Mandir / Pooja Unit
INSERT INTO products (
    id, category_id, name, slug, short_description, description, material, dimensions, color_options, price_type, price, price_max, is_featured, is_new_arrival, is_active
) VALUES (
    'p7777777-7777-7777-7777-777777777777',
    'c7777777-7777-7777-7777-777777777777',
    'Handcrafted Teakwood Home Mandir / Pooja Unit',
    'handcrafted-teakwood-home-mandir',
    'Exquisite carved pooja unit with bell motifs, warm LED lighting, brass accents, and pooja samagri drawers.',
    'Bring spiritual peace and traditional Indian wooden art into your home. Each pooja unit is carved by expert artisans in Navegaon using pure teak wood, complete with OM / Gayatri laser cut backlighting, brass bell hangings, and heavy pull-out bhog trays.',
    'Pure Burma / CP Teak Wood with Antique Gold Brass Fittings',
    'Custom Dimensions (Standard: 48" W x 24" D x 66" H)',
    ARRAY['Traditional Teak Gold', 'Dark Walnut & Brass'],
    'contact_for_price',
    NULL,
    NULL,
    true,
    false,
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (product_id, image_url, alt_text, is_cover, display_order) VALUES
('p7777777-7777-7777-7777-777777777777', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80', 'Handcrafted Custom Wooden Unit', true, 1);
