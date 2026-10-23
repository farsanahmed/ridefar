import type { Metadata } from "next";
import { PhasePlaceholder } from "@/components/site/PhasePlaceholder";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <PhasePlaceholder
      phase={6}
      icon="orders"
      title="Orders"
      description="Every order with its payment state and a delivery timeline, from M-Pesa confirmation to your door."
    />
  );
}
