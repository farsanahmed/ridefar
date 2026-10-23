import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyRidefar } from "@/components/home/WhyRidefar";
import {
  getActivePromotion,
  getCategories,
  getFeaturedProducts,
} from "@/lib/data/catalog";

/**
 * The catalogue is read on every request so stock and prices are never stale.
 * Phase 11 introduces tagged caching once the data layer is finalised.
 */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, products, promotion] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
    getActivePromotion(),
  ]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={products} />
      <PromoBanner promotion={promotion} />
      <WhyRidefar />
    </>
  );
}
