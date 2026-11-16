import { changeLabel, toBn } from "@/lib/bengali";
import type { PriceChange } from "@/lib/types";

/** ▲ green up / ▼ red down / — gray flat (per spec). */
export default function ChangeBadge({
  change,
  size = "sm",
}: {
  change: PriceChange;
  size?: "xs" | "sm";
}) {
  const base =
    size === "xs"
      ? "badge-xs text-[10px] px-1.5"
      : "badge-sm text-[11px] px-2 py-2";
  let cls = "bg-gray-100 text-gray-500";
  if (change.dir === "up") cls = "bg-green-100 text-green-700";
  if (change.dir === "down") cls = "bg-red-100 text-red-600";
  return (
    <span className={`badge ${base} shrink-0 font-semibold border-0 ${cls}`}>
      {changeLabel(change.dir, change.pct)}
    </span>
  );
}

/** Ticker variant (figma): rising price red, falling green. */
export function TickerBadge({ change }: { change: PriceChange }) {
  let cls = "text-gray-400";
  if (change.dir === "up") cls = "text-red-600";
  if (change.dir === "down") cls = "text-green-600";
  return (
    <span className={`font-semibold ${cls}`}>
      {change.dir === "down" ? "▼" : change.dir === "up" ? "▲" : "—"}{" "}
      {toBn(Math.abs(change.pct).toFixed(1))}%
    </span>
  );
}
