import { NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/data/api";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { images, ...updates } = body;

    if (updates.price !== undefined) {
      updates.price = updates.price ? Number(updates.price) : null;
    }
    if (updates.price_max !== undefined) {
      updates.price_max = updates.price_max ? Number(updates.price_max) : null;
    }

    const updated = await updateProduct(id, updates, images);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update product" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const success = await deleteProduct(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
