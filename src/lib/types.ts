import type { ArtKind } from "@/lib/site";

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  brand: string | null;
  description: string | null;
  /** Selling price in KSh. Always resolved on the server, never trusted from the browser. */
  price: number;
  /** Original price in KSh when the item is on discount. */
  compareAtPrice: number | null;
  stock: number;
  rating: number;
  reviewCount: number;
  categorySlug: string;
  categoryName: string;
  isDemo: boolean;
  art: ArtKind;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  productCount: number;
  art: ArtKind;
};

export type Promotion = {
  id: string;
  title: string;
  subtitle: string | null;
  code: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  isDemo: boolean;
};

export type StockState = "in" | "low" | "out";
