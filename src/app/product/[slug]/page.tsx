import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { changeLabel, formatTaka, toBn, unitBn } from "@/lib/bengali";

function StatBox({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "green" | "red" | "neutral";
}) {
  const color =
    tone === "green" ? "text-green-700" : tone === "red" ? "text-red-600" : "text-base-content";
  return (
    <div className="rounded-xl border border-base-300/70 bg-base-100 p-4">
      <p className="text-xs text-base-content/50">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>
        {value} <span className="text-sm font-normal">টাকা</span>
      </p>
      <p className="mt-1 text-[11px] text-base-content/40">{note}</p>
    </div>
  );
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // protected route — requires login
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&reason=protected`);
  }

  const mins = product.markets.map((m) => m.min);
  const maxes = product.markets.map((m) => m.max);
  const min = mins.length ? Math.min(...mins) : product.today;
  const max = maxes.length ? Math.max(...maxes) : product.today;
  const avg =
    mins.length
      ? Math.round(
          (product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
            product.markets.length) *
            10
        ) / 10
      : product.today;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-base-content/50" aria-label="breadcrumb">
        <Link href="/" className="link-hover hover:text-primary">হোম</Link>
        <span aria-hidden>›</span>
        <Link href={`/category/${product.category}`} className="link-hover hover:text-primary">
          {product.categoryNameBn}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-base-content/80">{product.nameBn}</span>
      </nav>

      {/* top summary */}
      <section className="card mt-4 border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body flex-row flex-wrap items-center justify-between gap-4 sm:p-8">
          <div className="flex min-w-0 items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-base-200 text-4xl" aria-hidden>
              {product.image}
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold">{product.nameBn}</h1>
              <p className="mt-0.5 text-sm text-base-content/60">
                {product.categoryIcon} {product.categoryNameBn} — আজকের বাজারে সর্বনিম্ন{" "}
                {formatTaka(min)} টাকা
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="badge badge-outline badge-sm">{product.categoryNameBn}</span>
                <span className="badge badge-outline badge-sm">{unitBn(product.unit)}</span>
                {product.markets.length > 0 && (
                  <span className="badge badge-outline badge-sm">
                    {toBn(product.markets.length)} টি বাজার
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-base-200 px-6 py-4 text-right">
            <p className="text-xs text-base-content/50">আজকের দাম</p>
            <p className="text-3xl font-bold text-primary">
              {formatTaka(product.today)} <span className="text-sm font-normal">টাকা</span>
            </p>
            <p
              className={`mt-1 text-xs font-semibold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-base-content/50"
              }`}
            >
              {changeLabel(product.change.dir, product.change.pct)}
            </p>
          </div>
        </div>
      </section>

      {/* price summary */}
      <section className="card mt-4 border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body sm:p-8">
          <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            <StatBox
              label="সর্বনিম্ন দাম"
              value={formatTaka(min)}
              note="সব বাজারের মধ্যে সর্বনিম্ন"
              tone="green"
            />
            <StatBox
              label="সর্বোচ্চ দাম"
              value={formatTaka(max)}
              note="সব বাজারের মধ্যে সর্বোচ্চ"
              tone="red"
            />
            <StatBox
              label="গড় দাম"
              value={formatTaka(avg)}
              note="সব বাজারের গড় মূল্য"
              tone="green"
            />
          </div>

          {/* short history (yesterday / last week / last month) */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-base-content/60">
            <span className="rounded-full bg-base-200 px-3 py-1">
              গতকাল: <b>{formatTaka(product.yesterday)}</b> টাকা
            </span>
            <span className="rounded-full bg-base-200 px-3 py-1">
              গত সপ্তাহ: <b>{formatTaka(product.lastWeek)}</b> টাকা
            </span>
            <span className="rounded-full bg-base-200 px-3 py-1">
              গত মাস: <b>{formatTaka(product.lastMonth)}</b> টাকা
            </span>
          </div>
        </div>
      </section>

      {/* market-wise prices */}
      <section className="card mt-4 border border-base-300/70 bg-base-100 shadow-sm">
        <div className="card-body sm:p-8">
          <h2 className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
          {product.markets.length === 0 ? (
            <p className="text-sm text-base-content/50">এই পণ্যের বাজারভিত্তিক তথ্য নেই।</p>
          ) : (
            <div className="mt-2 overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-base-content/50">
                    <th>বাজার</th>
                    <th>বিভাগ</th>
                    <th className="text-right">সর্বনিম্ন</th>
                    <th className="text-right">সর্বোচ্চ</th>
                    <th className="text-right">আজকের দাম</th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets.map((m) => {
                    const mid = Math.round((m.min + m.max) / 2);
                    return (
                      <tr key={`${m.market}-${m.division}`}>
                        <td className="font-medium">{m.market}</td>
                        <td className="text-base-content/70">{m.division}</td>
                        <td className="text-right">{formatTaka(m.min)} টাকা</td>
                        <td className="text-right">{formatTaka(m.max)} টাকা</td>
                        <td className="text-right font-semibold text-green-700">
                          {formatTaka(mid)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
