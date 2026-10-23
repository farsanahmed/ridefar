import { Icon, type IconName } from "@/components/ui/Icon";

const items: { icon: IconName; title: string; detail: string }[] = [
  { icon: "shield", title: "Genuine stock", detail: "No counterfeit parts" },
  { icon: "wallet", title: "M-Pesa & cash", detail: "Pay how you ride" },
  { icon: "truck", title: "Kilifi → countrywide", detail: "Tracked delivery" },
  { icon: "headset", title: "Workshop advice", detail: "Real fitment help" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-line bg-surface">
      <ul className="shell grid grid-cols-2 gap-y-5 py-6 md:grid-cols-4 md:py-7">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xs border border-line bg-surface-2 text-brand-ink">
              <Icon name={item.icon} className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-ink">
                {item.title}
              </span>
              <span className="block text-[11px] uppercase tracking-[0.1em] text-ink-3">
                {item.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
