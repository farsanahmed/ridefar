import type { Metadata } from "next";
import { PhasePlaceholder } from "@/components/site/PhasePlaceholder";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Search bicycle parts, MTB upgrades, brakes, drivetrain, tyres, safety gear and tools. Filter by category, brand, price, stock and rating.",
};

export default function ShopPage() {
  return (
    <PhasePlaceholder
      phase={4}
      icon="shop"
      title="Shop"
      description="Search across every part we stock, filter by category, brand, price, stock and rating, and sort the way you want. Built on live database rows — no placeholder products."
    />
  );
}
