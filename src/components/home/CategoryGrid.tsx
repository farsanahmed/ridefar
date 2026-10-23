import Link from "next/link";
import { categoryHref } from "@/lib/routes";
import type { Category } from "@/lib/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { ProductArt } from "@/components/product/ProductArt";
import { Section, SectionHeading } from "@/components/ui/Section";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <Section id="categories" tone="canvas">
      <div className="shell">
        <SectionHeading
          eyebrow="Shop by category"
          title="Find the part you need"
          description="Eight focused categories covering everything from a worn chain to a full suspension rebuild."
          action={
            <Link
              href="/shop"
              className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-brand-ink sm:flex"
            >
              All products
              <Icon name="arrowRight" className="size-4" />
            </Link>
          }
        />

        {categories.length === 0 ? (
          <EmptyState
            icon="shop"
            title="No categories yet"
            description="The catalogue has not been set up. Categories appear here as soon as they are added in the admin dashboard."
          />
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={categoryHref(category.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors duration-150 hover:border-line-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <div className="relative aspect-square overflow-hidden border-b border-line bg-surface-2">
                    <div className="grid-lines absolute inset-0 opacity-60" />
                    <ProductArt
                      kind={category.art}
                      className="absolute inset-0 m-auto h-1/2 w-1/2 max-h-20 max-w-20 text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-ink-2"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-3">
                    <h3 className="font-sans text-[13px] font-semibold leading-snug text-ink">
                      {category.name}
                    </h3>
                    <p className="tabular mt-auto font-mono text-[11px] uppercase tracking-wider text-ink-3">
                      {category.productCount > 0
                        ? `${category.productCount} ${category.productCount === 1 ? "part" : "parts"}`
                        : "No parts yet"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
