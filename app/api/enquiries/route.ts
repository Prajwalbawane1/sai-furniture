import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/data/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, product_id, product_name, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required." },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry({
      name,
      phone,
      email: email || null,
      product_id: product_id || null,
      product_name: product_name || null,
      message,
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error: any) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create enquiry" },
      { status: 500 }
    );
  }
}
