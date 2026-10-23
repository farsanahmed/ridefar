import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="tabular font-mono text-xs uppercase tracking-[0.3em] text-brand-ink">
        404
      </p>
      <h1 className="mt-4 font-display text-h1 uppercase text-ink">
        This road does not exist
      </h1>
      <p className="mt-3 max-w-md text-small text-ink-2">
        The page you are looking for has been moved, sold out of existence, or
        never existed. The shop is still right here.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex h-11 items-center gap-2 rounded-xs bg-brand px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-hi"
        >
          Browse the shop
          <Icon name="arrowRight" className="size-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-xs border border-line-2 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
