import Link from "next/link";
import type { Product } from "@/lib/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <Section id="featured" tone="surface">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured"
          title="Parts riders are fitting right now"
          description="Service consumables, drivetrain upgrades and safety kit that move fast in Kilifi."
          action={
            <Link
              href="/shop"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-brand-ink"
            >
              View all
              <Icon name="arrowRight" className="size-4" />
            </Link>
          }
        />

        {products.length === 0 ? (
          <EmptyState
            icon="cart"
            title="No products listed yet"
            description="Once parts are added in the admin dashboard they will appear here, with live stock and pricing."
            action={
              <Link
                href="/shop"
                className="inline-flex h-11 items-center rounded-xs border border-line-2 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
              >
                Browse categories
              </Link>
            }
          />
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
