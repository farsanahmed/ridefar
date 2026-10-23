import Link from "next/link";
import { productHref } from "@/lib/routes";
import type { Product } from "@/lib/types";
import { DemoBadge, StockPill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { ProductArt } from "./ProductArt";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={productHref(product.slug)}
      className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors duration-150 hover:border-line-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="relative aspect-4/3 overflow-hidden border-b border-line bg-surface-2">
        <div className="grid-lines absolute inset-0 opacity-70" />
        <ProductArt
          kind={product.art}
          className="absolute inset-0 m-auto h-2/3 w-2/3 max-h-28 text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-ink-2"
        />
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1.5">
          {product.isDemo ? <DemoBadge /> : null}
        </div>
        {product.compareAtPrice && product.compareAtPrice > product.price ? (
          <span className="label absolute right-2 top-2 rounded-xs bg-brand px-2 py-1 text-white">
            Sale
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="label text-ink-3">{product.brand ?? product.categoryName}</p>
        <h3 className="font-sans text-small font-semibold leading-snug text-ink line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-auto space-y-2 pt-1">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          <div className="flex items-center justify-between gap-2">
            <StockPill stock={product.stock} />
            {product.rating > 0 ? (
              <Rating value={product.rating} count={product.reviewCount} />
            ) : (
              <span className="label text-ink-3">New</span>
            )}
          </div>
        </div>
      </div>

      <span className="flex items-center justify-between border-t border-line px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-ink-3">
        <span className="tabular font-mono">{product.sku}</span>
        <Icon name="arrowUpRight" className="size-3.5 transition-colors group-hover:text-brand-ink" />
      </span>
    </Link>
  );
}
