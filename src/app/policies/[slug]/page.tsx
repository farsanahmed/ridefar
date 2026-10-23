import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { policies, site } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies.find((item) => item.slug === slug);
  return {
    title: policy?.title ?? "Policy",
    description:
      "RIDEFAR policy page — placeholder text that must be reviewed and approved by the owner before going live.",
    robots: { index: false, follow: true },
  };
}

/**
 * Section outline each policy must cover before launch. The owner fills in the
 * wording; the structure is already in place.
 */
const outlines: Record<string, string[]> = {
  terms: [
    "Who we are and what these terms cover",
    "Products, pricing and availability",
    "Orders, payment and M-Pesa checkout",
    "Delivery, risk and title",
    "Acceptable use and warranties",
    "Liability, governing law and dispute resolution",
    "How to contact us about a term",
  ],
  privacy: [
    "What personal data we collect",
    "Why we collect it (order fulfilment, M-Pesa callback, support)",
    "Where it is stored and how long we keep it",
    "Cookies and analytics",
    "Your rights under the Kenya Data Protection Act",
    "How to request access, correction or deletion",
  ],
  shipping: [
    "Delivery areas and coverage across Kenya",
    "Delivery timelines for Kilifi, Mombasa and other counties",
    "Delivery charges and free-delivery thresholds",
    "Order tracking and how to get updates",
    "Failed deliveries, wrong addresses and re-delivery",
    "Damage in transit and what to do",
  ],
  returns: [
    "Return window and eligibility",
    "Items we cannot accept back",
    "Return process and who pays return delivery",
    "Refund timing and method",
    "Warranty claims on faulty parts",
    "Exchanges and price adjustments",
  ],
  faq: [
    "How do I pay with M-Pesa?",
    "When will my order be marked as paid?",
    "How long does delivery take?",
    "Can I collect from the shop in Kilifi?",
    "How do I check whether a part fits my bike?",
    "What is the warranty on parts?",
  ],
};

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policies.find((item) => item.slug === slug);
  if (!policy) notFound();

  const outline = outlines[policy.slug] ?? [];

  return (
    <Section tone="canvas">
      <div className="shell py-6">
        <p className="label flex items-center gap-2 text-brand-ink">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-brand" />
          Policy
        </p>
        <h1 className="mt-3 font-display text-h1 uppercase text-ink">{policy.title}</h1>

        <div className="mt-6 flex items-start gap-3 rounded-sm border border-warn/40 border-l-2 border-l-warn bg-warn/10 p-4">
          <Icon name="alert" className="mt-0.5 size-5 shrink-0 text-warn" />
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-warn">
              Needs owner review
            </p>
            <p className="mt-1 text-small text-ink-2">
              This page is a placeholder. The wording below is not legal advice
              and has not been approved. Replace it with reviewed content before
              the shop takes real orders.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-h3 uppercase text-ink">
              What this page must cover
            </h2>
            <ol className="mt-4 space-y-3">
              {outline.map((item, index) => (
                <li key={item} className="flex gap-3 text-small text-ink-2">
                  <span className="tabular mt-0.5 font-mono text-xs text-brand-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-small text-ink-3">
              Questions about this policy? Call {site.phone} or email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-brand-ink underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </p>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-sm border border-line bg-surface p-5">
              <p className="label text-ink-3">RIDEFAR</p>
              <p className="mt-3 text-small text-ink-2">
                {site.address.line1}, {site.address.line2}, {site.address.country}
              </p>
              <p className="tabular mt-1 font-mono text-small text-ink">
                {site.phone}
              </p>
              <p className="mt-1 text-small text-ink-2">{site.email}</p>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
