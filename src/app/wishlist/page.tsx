import type { Metadata } from "next";
import { PhasePlaceholder } from "@/components/site/PhasePlaceholder";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <PhasePlaceholder
      phase={5}
      icon="wishlist"
      title="Wishlist"
      description="Save parts you are planning to fit, compare them later and move them into the cart in one tap."
    />
  );
}
