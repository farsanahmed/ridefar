export type MoneyInput = number | string | null | undefined;

/** KSh is quoted in whole shillings — no cents on a Kenyan parts store. */
export function formatKSh(amount: MoneyInput): string {
  const value = typeof amount === "string" ? Number(amount) : (amount ?? 0);
  if (!Number.isFinite(value)) return "KSh 0";
  return `KSh ${Math.round(value).toLocaleString("en-KE")}`;
}

/** Percentage saved, e.g. 14 -> "14%". Returns null when there is no discount. */
export function discountPercent(price: number, compareAt: number | null): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
