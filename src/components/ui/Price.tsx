import { discountPercent, formatKSh } from "@/lib/money";
import { Badge } from "./Badge";

export function Price({
  price,
  compareAtPrice,
  size = "md",
  className = "",
}: {
  price: number;
  compareAtPrice?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const percent = discountPercent(price, compareAtPrice ?? null);
  const sizes = {
    sm: "text-small",
    md: "text-base",
    lg: "text-xl",
  } as const;

  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      <span className={`tabular font-mono font-medium text-brand-ink ${sizes[size]}`}>
        {formatKSh(price)}
      </span>
      {percent && compareAtPrice ? (
        <>
          <span className="tabular font-mono text-xs text-ink-3 line-through">
            {formatKSh(compareAtPrice)}
          </span>
          <Badge tone="brand">-{percent}%</Badge>
        </>
      ) : null}
    </div>
  );
}
