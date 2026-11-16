import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/api";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const products = await getProducts();
  return NextResponse.json(
    category ? products.filter((p) => p.category === category) : products
  );
}
