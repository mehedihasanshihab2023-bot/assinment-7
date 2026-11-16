import Link from "next/link";
import { formatTaka, unitBn } from "@/lib/bengali";
import type { Product } from "@/lib/types";
import ChangeBadge from "./change-badge";

/** Product card used on Home + Category pages. Click → detail page. */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card border border-base-300/70 bg-base-100 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      aria-label={`${product.nameBn} — বিস্তারিত দেখুন`}
    >
      <div className="card-body gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-base-200 text-2xl">
            <span role="img" aria-hidden>
              {product.image}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{product.nameBn}</h3>
            <p className="text-xs text-base-content/50">{unitBn(product.unit)}</p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] leading-4 text-base-content/50">আজকের দাম</p>
            <p className="text-lg font-bold leading-6">
              {formatTaka(product.today)}{" "}
              <span className="text-xs font-normal text-base-content/60">টাকা</span>
            </p>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}
