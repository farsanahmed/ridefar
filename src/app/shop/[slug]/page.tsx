import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhasePlaceholder } from "@/components/site/PhasePlaceholder";
import { getFeaturedProducts } from "@/lib/data/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = await getFeaturedProducts(60);
  const product = products.find((item) => item.slug === slug);

  return {
    title: product?.name ?? "Product",
    description:
      product?.description ??
      "Product details, specifications, stock and reviews for this RIDEFAR part.",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getFeaturedProducts(60);
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  return (
    <PhasePlaceholder
      phase={4}
      icon="cart"
      title={product.name}
      description={`${product.sku} — the full product page (gallery, specifications, stock, reviews and related parts) is built in Phase 4 against live database rows.`}
    />
  );
}
