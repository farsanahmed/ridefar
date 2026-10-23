import { Icon } from "./Icon";

export function Rating({
  value,
  count,
  className = "",
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  const rounded = Math.round(value * 2) / 2;
  const stars = [1, 2, 3, 4, 5];

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {stars.map((star) => (
          <Icon
            key={star}
            name="star"
            className={`size-3.5 ${
              rounded >= star ? "text-brand" : "text-line-2"
            }`}
            strokeWidth={1.4}
          />
        ))}
      </span>
      <span className="tabular font-mono text-[11px] text-ink-3">
        {value > 0 ? value.toFixed(1) : "New"}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </span>
  );
}
