import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function EmptyState({
  icon = "spark",
  title,
  description,
  action,
  className = "",
}: {
  icon?: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-sm border border-dashed border-line bg-surface/40 px-5 py-12 text-center ${className}`}
    >
      <span className="mb-4 flex size-11 items-center justify-center rounded-pill border border-line bg-surface-2 text-ink-3">
        <Icon name={icon} className="size-5" />
      </span>
      <p className="font-display text-h3 text-ink">{title}</p>
      {description ? (
        <p className="mt-2 max-w-sm text-small text-ink-2">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
