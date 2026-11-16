import { formatTaka, unitShort } from "@/lib/bengali";
import type { Product } from "@/lib/types";
import { TickerBadge } from "./change-badge";

/** Infinite price ticker (marquee) — server rendered, pauses on hover. */
export default function Ticker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const items = [...products, ...products]; // duplicate content = seamless loop

  return (
    <div
      dir="ltr"
      className="overflow-hidden border-b border-base-300/70 bg-base-100"
      aria-label="আজকের দামের টিকার"
    >
      <div className="animate-ticker flex w-max py-2">
        {items.map((p, i) => (
          <span
            key={`${p.slug}-${i}`}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap px-5 text-[13px]"
          >
            <span className="text-base" aria-hidden>
              {p.image}
            </span>
            <span className="font-medium">
              {p.nameBn} {formatTaka(p.today)} টাকা/{unitShort(p.unit)}
            </span>
            <TickerBadge change={p.change} />
          </span>
        ))}
      </div>
    </div>
  );
}
