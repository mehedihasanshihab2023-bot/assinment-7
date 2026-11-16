"use client";

import { useEffect, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { toBn } from "@/lib/bengali";
import ProductCard from "@/components/product-card";
import NotFoundView from "@/components/not-found-view";
import SortSelect, { sortProducts, type SortOption } from "@/components/sort-select";
import { ProductGridSkeleton } from "@/components/skeletons";

export default function CategoryView({ category }: { category: Category }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [sort, setSort] = useState<SortOption>("default");

  useEffect(() => {
    fetch(`/api/products?category=${encodeURIComponent(category.slug)}`)
      .then((r) => {
        if (!r.ok) throw new Error("bad status");
        return r.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch(() => setFailed(true));
  }, [category.slug]);

  const loading = products === null && !failed;
  const sorted = products ? sortProducts(products, sort) : [];

  if (!failed && products !== null && products.length === 0) {
    return (
      <NotFoundView
        title="কোনো পণ্য পাওয়া যায়নি"
        message={`${category.icon} ${category.nameBn} ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য নেই।`}
        emoji="🛒"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* title card */}
      <section className="card border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body flex-row items-center gap-4 sm:p-8">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-base-200 text-3xl" aria-hidden>
            {category.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{category.nameBn}</h1>
            <p className="text-sm text-base-content/50">
              {products
                ? `${toBn(products.length)} টি পণ্যের আজকের দাম ও পরিসংখ্যান`
                : "দামের তালিকা লোড হচ্ছে…"}
            </p>
          </div>
        </div>
      </section>

      {/* sort control */}
      <section className="card mt-4 border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body flex-row items-center justify-end py-3 sm:py-4">
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </section>

      {/* product list */}
      <div className="mt-4">
        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : failed ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            দুঃখিত, তালিকা লোড করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        ) : (
          <>
            <p className="text-sm text-base-content/50">
              {toBn(sorted.length)}টি পণ্য পাওয়া গেছে
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {sorted.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
