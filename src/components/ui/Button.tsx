import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hi",
  secondary:
    "border border-line-2 bg-transparent text-ink hover:border-ink hover:bg-surface-2",
  ghost: "bg-transparent text-ink-2 hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-[11px]",
  md: "h-11 px-5 text-xs",
  lg: "h-12 px-6 text-xs",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export function ButtonExternal({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  href,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size }) {
  const isWeb = typeof href === "string" && href.startsWith("http");
  return (
    <a
      className={buttonClass(variant, size, className)}
      href={href}
      {...(isWeb ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

export function LinkRow({ children }: { children: ReactNode }) {
  return (
    <span className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-brand-ink">
      {children}
    </span>
  );
}
