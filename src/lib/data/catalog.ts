import { demoEnabled } from "@/lib/demo";
import { demoCategories, demoProducts, demoPromotion } from "@/lib/demo/data";
import { getSupabase } from "@/lib/supabase/server";
import { categoryList, type ArtKind } from "@/lib/site";
import type { Category, Product, Promotion } from "@/lib/types";

/**
 * Catalogue reads.
 *
 * Rules that hold in every phase:
 *  - Prices are read from the database only. Nothing is calculated from a
 *    value sent by the browser.
 *  - If the database is unreachable or empty the functions return empty
 *    results, and the UI renders a real empty state (never fake products).
 *  - Demo rows are used only when Supabase is not configured, and every demo
 *    row is flagged with `isDemo` so the UI can label it.
 */

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  brand: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  rating_average: number | null;
  rating_count: number | null;
  category_id: string;
  is_active: boolean;
  is_featured: boolean;
};

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
};

type PromotionRow = {
  id: string;
  title: string;
  subtitle: string | null;
  code: string | null;
  cta_label: string | null;
  cta_href: string | null;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
};

function artForSlug(slug: string): ArtKind {
  return categoryList.find((category) => category.slug === slug)?.art ?? "generic";
}

function warn(scope: string, error: unknown) {
  console.warn(`[ridefar:${scope}]`, error instanceof Error ? error.message : error);
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabase();

  if (!supabase) {
    return demoEnabled ? demoCategories : [];
  }

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, slug, name, description, is_active, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    const rows = (data ?? []) as CategoryRow[];

    const { data: productRows, error: productError } = await supabase
      .from("products")
      .select("category_id")
      .eq("is_active", true);

    if (productError) throw productError;

    const counts = new Map<string, number>();
    for (const row of (productRows ?? []) as { category_id: string }[]) {
      counts.set(row.category_id, (counts.get(row.category_id) ?? 0) + 1);
    }

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      blurb: row.description ?? "",
      productCount: counts.get(row.id) ?? 0,
      art: artForSlug(row.slug),
    }));
  } catch (error) {
    warn("categories", error);
    return [];
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const supabase = getSupabase();

  if (!supabase) {
    return demoEnabled ? demoProducts.slice(0, limit) : [];
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, slug, name, sku, brand, description, price, compare_at_price, stock, rating_average, rating_count, category_id, is_active, is_featured",
      )
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    const rows = (data ?? []) as ProductRow[];

    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id, slug, name");

    if (categoryError) throw categoryError;
    const categories = new Map(
      ((categoryData ?? []) as { id: string; slug: string; name: string }[]).map((row) => [
        row.id,
        row,
      ]),
    );

    return rows.map((row) => {
      const category = categories.get(row.category_id);
      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        sku: row.sku,
        brand: row.brand,
        description: row.description,
        price: Number(row.price),
        compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
        stock: Number(row.stock ?? 0),
        rating: Number(row.rating_average ?? 0),
        reviewCount: Number(row.rating_count ?? 0),
        categorySlug: category?.slug ?? "bicycle-parts",
        categoryName: category?.name ?? "Bicycle Parts",
        isDemo: false,
        art: artForSlug(category?.slug ?? ""),
      };
    });
  } catch (error) {
    warn("featured-products", error);
    return [];
  }
}

export async function getActivePromotion(): Promise<Promotion | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return demoEnabled ? demoPromotion : null;
  }

  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("promotions")
      .select(
        "id, title, subtitle, code, cta_label, cta_href, is_active, starts_at, ends_at",
      )
      .eq("is_active", true)
      .lte("starts_at", now)
      .order("ends_at", { ascending: true, nullsFirst: false })
      .limit(1);

    if (error) throw error;

    const row = ((data ?? []) as PromotionRow[])[0];
    if (!row) return null;
    if (row.ends_at && row.ends_at < now) return null;

    return {
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      code: row.code,
      ctaLabel: row.cta_label,
      ctaHref: row.cta_href,
      isDemo: false,
    };
  } catch (error) {
    warn("promotions", error);
    return null;
  }
}
