import type { ReactNode } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

/**
 * Shared placeholder for the pages that ship in later phases.
 * It keeps every link on the site working and never pretends to be a feature
 * that is not built yet.
 */
export function PhasePlaceholder({
  title,
  description,
  phase,
  icon = "spark",
  children,
}: {
  title: string;
  description: string;
  phase: number;
  icon?: IconName;
  children?: ReactNode;
}) {
  return (
    <Section tone="canvas">
      <div className="shell py-6">
        <p className="label flex items-center gap-2 text-brand-ink">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-brand" />
          Phase {phase}
        </p>
        <h1 className="mt-3 font-display text-h1 uppercase text-ink">{title}</h1>
        <p className="mt-3 max-w-lg text-small text-ink-2">{description}</p>

        <div className="mt-8">
          <EmptyState
            icon={icon}
            title="Not built yet"
            description="This part of the store is scheduled and will be switched on in a later build. Nothing here is fake data."
            action={
              <Link
                href="/"
                className="inline-flex h-11 items-center gap-2 rounded-xs border border-line-2 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
              >
                <Icon name="arrowRight" className="size-4" />
                Back to home
              </Link>
            }
          />
        </div>

        {children}
      </div>
    </Section>
  );
}
