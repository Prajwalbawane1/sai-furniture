import { NextResponse } from "next/server";
import { getBanners, createBanner, updateBanner, deleteBanner } from "@/lib/data/api";

export async function GET() {
  try {
    const banners = await getBanners(false);
    return NextResponse.json(banners);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, badge, cta_text, cta_link, image_url, is_active, display_order } = body;

    if (!title || !image_url) {
      return NextResponse.json(
        { error: "Title and banner image are required" },
        { status: 400 }
      );
    }

    const banner = await createBanner({
      title,
      subtitle: subtitle || null,
      badge: badge || null,
      cta_text: cta_text || "Explore Collection",
      cta_link: cta_link || "/products",
      image_url,
      is_active: is_active !== undefined ? !!is_active : true,
      display_order: display_order ? Number(display_order) : 0,
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Banner id is required" }, { status: 400 });
    }

    if (updates.display_order !== undefined) {
      updates.display_order = Number(updates.display_order);
    }

    const updated = await updateBanner(id, updates);
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
      return NextResponse.json({ error: "Banner id is required" }, { status: 400 });
    }
    const success = await deleteBanner(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
