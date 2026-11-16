import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/api";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "পণ্যটি পাওয়া যায়নি" }, { status: 404 });
  }
  return NextResponse.json(product);
}
