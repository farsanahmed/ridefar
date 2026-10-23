import type { Metadata } from "next";
import { PhasePlaceholder } from "@/components/site/PhasePlaceholder";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <PhasePlaceholder
      phase={5}
      icon="cart"
      title="Cart"
      description="Your basket with live stock checks. Totals are always recalculated on the server — the browser never sets a price."
    />
  );
}
