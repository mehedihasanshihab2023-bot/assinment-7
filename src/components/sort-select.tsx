"use client";

import { parseBnNumber, formatTaka } from "@/lib/bengali";
import type { Product } from "@/lib/types";

export type SortOption = "default" | "asc" | "desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

/**
 * C1 — sort products by numeric price.
 * Prices are round-tripped through the Bengali formatter and parsed back
 * with parseBnNumber (handles ০-৯, commas, "টাকা") so sorting is numeric,
 * never string-based.
 */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  if (sort === "default") return copy;
  return copy.sort((a, b) => {
    const diff =
      parseBnNumber(formatTaka(a.today)) - parseBnNumber(formatTaka(b.today));
    return sort === "asc" ? diff : -diff;
  });
}

export default function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-base-content/70">
      <span className="hidden sm:inline">সাজান:</span>
      <select
        aria-label="পণ্য সাজান"
        className="select select-bordered select-sm w-40 sm:select-md sm:w-48"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
