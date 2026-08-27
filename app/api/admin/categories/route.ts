import { NextResponse } from "next/server";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/data/api";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const categories = await getCategories(false);
    return NextResponse.json(categories);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, image_url, display_order, is_active } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const slug = slugify(name);

    const category = await createCategory({
      name,
      slug,
      description: description || null,
      image_url: image_url || null,
      display_order: display_order ? Number(display_order) : 0,
      is_active: is_active !== undefined ? !!is_active : true,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Category id is required" }, { status: 400 });
    }

    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name);
    }
    if (updates.display_order !== undefined) {
      updates.display_order = Number(updates.display_order);
    }

    const updated = await updateCategory(id, updates);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Category id is required" }, { status: 400 });
    }
    const success = await deleteCategory(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
