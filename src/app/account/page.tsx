import type { Metadata } from "next";
import { PhasePlaceholder } from "@/components/site/PhasePlaceholder";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <PhasePlaceholder
      phase={8}
      icon="account"
      title="Account"
      description="Your profile, orders, wishlist and delivery addresses. Sign-in uses Supabase Auth with email and Google."
    />
  );
}
