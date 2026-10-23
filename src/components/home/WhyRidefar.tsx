import { site } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

const reasons: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "Genuine parts, honestly priced",
    body: "We stock the brands riders actually trust — Shimano, Maxxis, Fox, SKS — and list the real price in shillings. No inflated “original” pricing.",
  },
  {
    icon: "truck",
    title: "Kilifi to your county",
    body: "Orders leave Mavueni the same day for Mombasa, Kilifi, Malindi and the rest of Kenya, with delivery updates on your order page.",
  },
  {
    icon: "wallet",
    title: "M-Pesa in seconds",
    body: "Pay straight from your Safaricom phone. The order is only marked paid once Safaricom confirms the payment — never before.",
  },
  {
    icon: "headset",
    title: "Workshop advice, not sales talk",
    body: "Tell us your bike and the problem. We will tell you the part you need — and the part you do not need to buy.",
  },
];

export function WhyRidefar() {
  return (
    <Section id="why-ridefar" tone="canvas">
      <div className="shell">
        <SectionHeading
          eyebrow="Why RIDEFAR"
          title="Built by riders, stocked in Kilifi"
          description="Four things we refuse to compromise on when it comes to the parts that keep your bike running."
        />

        <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <li
              key={reason.title}
              className="flex flex-col gap-3 rounded-sm border border-line bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-xs border border-line bg-surface-2 text-brand-ink">
                  <Icon name={reason.icon} className="size-4.5" />
                </span>
                <span className="tabular font-mono text-xs text-line-2">
                  0{index + 1}
                </span>
              </div>
              <h3 className="font-sans text-[15px] font-semibold leading-snug text-ink">
                {reason.title}
              </h3>
              <p className="text-small text-ink-2">{reason.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-4 rounded-sm border border-line bg-surface-2/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xs bg-brand text-white">
              <Icon name="headset" className="size-4.5" />
            </span>
            <div>
              <p className="font-sans text-[15px] font-semibold text-ink">
                Not sure what to order?
              </p>
              <p className="mt-1 text-small text-ink-2">
                Call the shop on{" "}
                <a
                  href={site.phoneHref}
                  className="tabular font-mono text-brand-ink underline underline-offset-4"
                >
                  {site.phone}
                </a>{" "}
                or send us a message on WhatsApp.
              </p>
            </div>
          </div>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xs border border-line-2 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
          >
            <Icon name="headset" className="size-4" />
            WhatsApp us
          </a>
        </div>
      </div>
    </Section>
  );
}
