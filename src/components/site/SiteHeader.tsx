import Link from "next/link";
import { site, topNav } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/** Speed mark: three forward-leaning strokes. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none">
        <path d="M4 17 10 7" stroke="#e10600" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M9 17 15 7" stroke="#e10600" strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />
        <path d="M14 17 20 7" stroke="#e10600" strokeWidth="2.6" strokeLinecap="round" opacity="0.3" />
      </svg>
      <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.06em] text-ink">
        {site.name}
      </span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="shell flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="shrink-0 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {topNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-2 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-xs px-2 py-1.5 text-xs font-semibold tracking-wide text-ink-2 transition-colors hover:text-ink lg:flex"
          >
            <Icon name="phone" className="size-4" />
            <span className="tabular font-mono">{site.phone}</span>
          </a>
          <Link
            href="/shop"
            aria-label="Search products"
            className="flex size-10 items-center justify-center rounded-xs text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Icon name="search" className="size-5" />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex size-10 items-center justify-center rounded-xs text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Icon name="cart" className="size-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
