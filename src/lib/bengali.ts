const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Convert latin digits to Bengali digits: 148 → ১৪৮ */
export function toBn(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** Convert Bengali digits to latin digits: ১৪৮ → 148 */
export function toEn(input: string): string {
  return input.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

/**
 * Parse a number out of any string that may contain Bengali digits,
 * commas or currency words — e.g. "১,৮৫০ টাকা" → 1850.
 * Used by the sort control (C1) so prices sort numerically, not as strings.
 */
export function parseBnNumber(input: string | number): number {
  const cleaned = toEn(String(input)).replace(/[^0-9.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/** 1850 → "১,৮৫০" */
export function formatTaka(n: number): string {
  return toBn(n.toLocaleString("en-US"));
}

/** Change badge label: ▲ ২.১% / ▼ ২.৯% / — ০.০% */
export function changeLabel(dir: string, pct: number): string {
  const abs = toBn(Math.abs(pct).toFixed(1));
  if (dir === "up") return `▲ ${abs}%`;
  if (dir === "down") return `▼ ${abs}%`;
  return `— ${abs}%`;
}

const UNIT_BN: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

/** "প্রতি কেজি" etc. */
export function unitBn(unit: string): string {
  return UNIT_BN[unit] ?? `প্রতি ${unit}`;
}

/** "কেজি" etc. — for ticker "টাকা/কেজি" */
export function unitShort(unit: string): string {
  return UNIT_SHORT[unit] ?? unit;
}

const BN_DAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const BN_MONTHS = [
  "জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

/** শুক্রবার, ২৮ ফেব্রুয়ারী, ২০২৫ */
export function bnDate(d: Date = new Date()): string {
  return `${BN_DAYS[d.getDay()]}, ${toBn(d.getDate())} ${BN_MONTHS[d.getMonth()]}, ${toBn(d.getFullYear())}`;
}
