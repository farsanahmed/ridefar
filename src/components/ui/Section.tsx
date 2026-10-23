import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  children,
  tone = "canvas",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "canvas" | "surface" | "none";
}) {
  const toneClass =
    tone === "surface" ? "bg-surface" : tone === "canvas" ? "bg-canvas" : "";

  return (
    <section id={id} className={`py-12 md:py-18 ${toneClass} ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-6 flex items-end justify-between gap-4 md:mb-8 ${className}`}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="label mb-2 flex items-center gap-2 text-brand-ink">
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-brand" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-h2 text-ink">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-prose text-small text-ink-2">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
