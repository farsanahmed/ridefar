import Link from "next/link";
import { categoryList, policies, site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Wordmark />
          <p className="mt-4 max-w-xs text-small text-ink-2">
            Genuine bicycle parts, MTB upgrades, safety gear and workshop tools —
            stocked in Kilifi and delivered across Kenya.
          </p>
          <p className="label mt-6 flex items-center gap-2 text-brand-ink">
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-brand" />
            {site.tagline}
          </p>
        </div>

        <nav aria-label="Shop" className="md:col-span-3">
          <h2 className="label text-ink-3">Shop</h2>
          <ul className="mt-4 space-y-2.5 text-small">
            <li>
              <Link href="/shop" className="text-ink-2 transition-colors hover:text-ink">
                All products
              </Link>
            </li>
            {categoryList.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="text-ink-2 transition-colors hover:text-ink"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Help" className="md:col-span-2">
          <h2 className="label text-ink-3">Help</h2>
          <ul className="mt-4 space-y-2.5 text-small">
            {policies.map((policy) => (
              <li key={policy.slug}>
                <Link
                  href={`/policies/${policy.slug}`}
                  className="text-ink-2 transition-colors hover:text-ink"
                >
                  {policy.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/orders" className="text-ink-2 transition-colors hover:text-ink">
                Track an order
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="text-ink-2 transition-colors hover:text-ink">
                Wishlist
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="label text-ink-3">Contact</h2>
          <ul className="mt-4 space-y-3 text-small">
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-2.5 text-ink-2 transition-colors hover:text-ink"
              >
                <Icon name="phone" className="size-4 text-brand-ink" />
                <span className="tabular font-mono">{site.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-ink-2 transition-colors hover:text-ink"
              >
                <Icon name="mail" className="size-4 text-brand-ink" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-ink-2">
              <Icon name="pin" className="mt-0.5 size-4 text-brand-ink" />
              <span>
                {site.address.line1}, {site.address.line2}, {site.address.country}
              </span>
            </li>
            <li className="flex items-center gap-2.5 text-ink-2">
              <Icon name="clock" className="size-4 text-brand-ink" />
              {site.hours}
            </li>
          </ul>

          <div className="mt-5 flex items-center gap-2">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="RIDEFAR on Instagram"
              className="flex size-10 items-center justify-center rounded-xs border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
            >
              <Icon name="instagram" className="size-4.5" />
            </a>
            <a
              href={site.tiktok}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="RIDEFAR on TikTok"
              className="flex size-10 items-center justify-center rounded-xs border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
            >
              <Icon name="tiktok" className="size-4.5" />
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Chat with RIDEFAR on WhatsApp"
              className="flex size-10 items-center justify-center rounded-xs border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
            >
              <Icon name="headset" className="size-4.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-5 text-[11px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Icon name="wallet" className="size-3.5" /> M-Pesa &amp; cash on delivery
            </span>
            <span>Policy pages are placeholders — needs owner review.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
