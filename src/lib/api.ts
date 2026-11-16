import type { Category, Product } from "./types";

/** Public BazarDor API — main + two mirrors, tried in order. */
const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getJson<T>(path: string): Promise<T | null> {
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
        headers: { accept: "application/json" },
      });
      if (!res.ok) continue;
      return (await res.json()) as T;
    } catch {
      // try the next mirror
    }
  }
  return null;
}

export async function getProducts(): Promise<Product[]> {
  const data = await getJson<Product[]>("/products");
  return Array.isArray(data) ? data : [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await getJson<Category[]>("/categories");
  return Array.isArray(data) ? data : [];
}

/** Single product by numeric id (API /products/1) or by slug (search the list). */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (/^\d+$/.test(slug)) {
    const byId = await getJson<Product>(`/products/${slug}`);
    if (byId && byId.slug) return byId;
  }
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export function filterProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter((p) => p.category === category);
}
