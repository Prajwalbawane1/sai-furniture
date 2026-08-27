import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/data/api";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const products = await getProducts({ onlyActive: false });
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      category_id,
      short_description,
      description,
      material,
      dimensions,
      color_options,
      price_type,
      price,
      price_max,
      is_featured,
      is_new_arrival,
      is_active,
      images,
    } = body;

    if (!name || !category_id) {
      return NextResponse.json(
        { error: "Product name and category are required." },
        { status: 400 }
      );
    }

    const slug = slugify(name) + "-" + Math.floor(100 + Math.random() * 900);

    const newProduct = await createProduct(
      {
        name,
        slug,
        category_id,
        short_description: short_description || null,
        description: description || null,
        material: material || null,
        dimensions: dimensions || null,
        color_options: color_options || [],
        price_type: price_type || "contact_for_price",
        price: price ? Number(price) : null,
        price_max: price_max ? Number(price_max) : null,
        is_featured: !!is_featured,
        is_new_arrival: !!is_new_arrival,
        is_active: is_active !== undefined ? !!is_active : true,
      },
      images || []
    );

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
