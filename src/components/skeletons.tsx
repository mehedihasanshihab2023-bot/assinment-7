/** Skeleton placeholders shown while product data loads (Home / Category). */

export function ProductCardSkeleton() {
  return (
    <div className="card border border-base-300/70 bg-base-100 shadow-sm">
      <div className="card-body gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="skeleton h-11 w-11 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-5 w-20" />
          </div>
          <div className="skeleton h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6, cols = "sm" }: { count?: number; cols?: "sm" | "lg" }) {
  return (
    <div
      className={
        cols === "lg"
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      }
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TickerSkeleton() {
  return (
    <div className="overflow-hidden border-b border-base-300/70 bg-base-100">
      <div className="flex items-center gap-6 px-4 py-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-4 w-40 shrink-0" />
        ))}
      </div>
    </div>
  );
}
