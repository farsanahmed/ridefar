import Link from "next/link";
import type { Promotion } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

/**
 * Promo banner driven by the `promotions` table, editable from the admin
 * dashboard (Phase 10). With no active promotion the slot renders an honest
 * empty state instead of a made-up offer.
 */
export function PromoBanner({ promotion }: { promotion: Promotion | null }) {
  return (
    <Section tone="canvas" className="py-8 md:py-10">
      <div className="shell">
        {promotion ? (
          <div className="brand-wash relative overflow-hidden rounded-md border border-line p-6 md:p-8">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="label flex items-center gap-2 text-brand-ink">
                  <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-brand" />
                  {promotion.isDemo ? "Demo offer" : "Limited offer"}
                </p>
                <h2 className="mt-3 font-display text-h2 uppercase text-ink">
                  {promotion.title}
                </h2>
                {promotion.subtitle ? (
                  <p className="mt-2 max-w-xl text-small text-ink-2">{promotion.subtitle}</p>
                ) : null}
                {promotion.code ? (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-xs border border-dashed border-brand/50 bg-brand-soft px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-brand-ink">
                    Code {promotion.code}
                  </p>
                ) : null}
              </div>

              {promotion.ctaHref ? (
                <Link
                  href={promotion.ctaHref}
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xs bg-brand px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-hi"
                >
                  {promotion.ctaLabel ?? "Shop now"}
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-md border border-dashed border-line bg-surface/40 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="label text-ink-3">Offers</p>
              <p className="mt-2 font-display text-h3 uppercase text-ink">
                No active promotion right now
              </p>
              <p className="mt-1 text-small text-ink-2">
                Flash offers are posted here as soon as an admin publishes one.
                Follow {""}
                <a
                  href="https://instagram.com/ridefar.ke"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-brand-ink underline underline-offset-4"
                >
                  @ridefar.ke
                </a>{" "}
                for the rest.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xs border border-line-2 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
            >
              Browse the shop
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
}
