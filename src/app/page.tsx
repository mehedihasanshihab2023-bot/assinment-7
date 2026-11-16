"use client";

import { useEffect, useState } from "react";
import { bnDate } from "@/lib/bengali";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/skeletons";

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(bnDate());
    fetch("/api/products")
      .then((r) => {
        if (!r.ok) throw new Error("bad status");
        return r.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch(() => setFailed(true));
  }, []);

  const risers =
    products
      ?.filter((p) => p.change.dir === "up")
      .sort((a, b) => b.change.pct - a.change.pct)
      .slice(0, 6) ?? [];
  const fallers =
    products
      ?.filter((p) => p.change.dir === "down")
      .sort((a, b) => a.change.pct - b.change.pct)
      .slice(0, 6) ?? [];
  const all = products ?? [];
  const loading = products === null && !failed;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      {/* ── Hero / Banner ─────────────────────────────────────────── */}
      <section className="card border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body grid items-center gap-6 sm:grid-cols-2 sm:p-10">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span suppressHydrationWarning>{date || "আপডেট হচ্ছে…"}</span>
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-snug sm:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-3 text-sm leading-6 text-base-content/60 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার মতো — বাজারভিত্তিক তাজা
              দাম, প্রতি সকালে- আপডেট হয় আপনার শহরের বাজারের দামের সাথে।
            </p>
            <a href="#সব-পণ্য" className="btn btn-primary btn-sm mt-5 px-6 sm:btn-md">
              সব পণ্য দেখুন
            </a>
          </div>

          {/* fruit-basket illustration (pure CSS/emoji, no external asset) */}
          <div
            className="relative mx-auto grid h-52 w-52 place-items-center sm:h-64 sm:w-64"
            aria-hidden
          >
            <span className="absolute left-3 top-4 text-4xl sm:text-5xl animate-float">🍎</span>
            <span className="absolute right-4 top-2 text-5xl sm:text-6xl animate-float [animation-delay:0.6s]">🥬</span>
            <span className="absolute bottom-16 left-0 text-3xl sm:text-4xl animate-float [animation-delay:1.2s]">🍇</span>
            <span className="absolute bottom-16 right-1 text-4xl sm:text-5xl animate-float [animation-delay:0.3s]">🍊</span>
            <span className="relative z-10 mt-16 text-[110px] leading-none drop-shadow-sm sm:text-[140px]">🧺</span>
            <span className="absolute bottom-8 h-3 w-3/4 rounded-full bg-base-300/80 blur-[2px]" />
          </div>
        </div>
      </section>

      {/* ── Section A — risers ────────────────────────────────────── */}
      <section className="mt-10" aria-labelledby="risers-heading">
        <h2 id="risers-heading" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-red-600" aria-hidden>▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="mt-4">
          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : risers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {risers.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-base-content/50">আজ কোনো পণ্যের দাম বাড়েনি।</p>
          )}
        </div>
      </section>

      {/* ── Section B — fallers ───────────────────────────────────── */}
      <section className="mt-10" aria-labelledby="fallers-heading">
        <h2 id="fallers-heading" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-green-600" aria-hidden>▼</span> আজ দাম কমেছে
        </h2>
        <div className="mt-4">
          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : fallers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {fallers.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-base-content/50">আজ কোনো পণ্যের দাম কমেনি।</p>
          )}
        </div>
      </section>

      {/* ── Section C — all products ──────────────────────────────── */}
      <section id="সব-পণ্য" className="mt-10 scroll-mt-24" aria-labelledby="all-heading">
        <h2 id="all-heading" className="text-xl font-bold">সব পণ্য</h2>
        <p className="mt-1 text-sm text-base-content/50">
          অন্যান্য পণ্যের আজকের দাম এক নজরে
        </p>
        <div className="mt-4">
          {loading ? (
            <ProductGridSkeleton count={8} cols="lg" />
          ) : failed ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              দুঃখিত, এই মুহূর্তে দামের তথ্য লোড করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {all.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
