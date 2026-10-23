import type { ReactNode } from "react";
import type { StockState } from "@/lib/types";

export function Badge({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "neutral" | "warn" | "outline";
  className?: string;
}) {
  const tones = {
    brand: "bg-brand-soft text-brand-ink border border-brand/30",
    neutral: "bg-surface-2 text-ink-2 border border-line",
    warn: "bg-warn/10 text-warn border border-warn/30",
    outline: "bg-transparent text-ink-3 border border-line",
  } as const;

  return (
    <span
      className={`label inline-flex items-center gap-1.5 rounded-pill px-2 py-1 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Every demo row carries this badge so it can never be sold as real stock. */
export function DemoBadge() {
  return <Badge tone="outline">Demo product</Badge>;
}

export function stockState(stock: number): StockState {
  if (stock <= 0) return "out";
  if (stock <= 5) return "low";
  return "in";
}

export function StockPill({ stock }: { stock: number }) {
  const state = stockState(stock);

  if (state === "out") {
    return <Badge tone="outline">Out of stock</Badge>;
  }
  if (state === "low") {
    return <Badge tone="warn">Only {stock} left</Badge>;
  }
  return <Badge tone="neutral">In stock</Badge>;
}
