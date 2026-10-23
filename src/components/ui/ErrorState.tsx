"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this section. Check your connection and try again.",
  scope,
}: {
  title?: string;
  description?: string;
  scope?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div
      role="alert"
      className="flex items-start gap-4 rounded-sm border border-line border-l-2 border-l-danger bg-surface p-5"
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-pill bg-danger/10 text-danger">
        <Icon name="alert" className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-h3 text-ink">{title}</p>
        <p className="mt-1 text-small text-ink-2">{description}</p>
        {scope ? (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink-3">
            {scope}
          </p>
        ) : null}
        <Button
          className="mt-4"
          variant="secondary"
          size="sm"
          disabled={pending}
          onClick={() => startTransition(() => router.refresh())}
        >
          {pending ? "Retrying…" : "Try again"}
        </Button>
      </div>
    </div>
  );
}
