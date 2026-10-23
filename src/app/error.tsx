"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error("[ridefar] route error", error);
  }, [error]);

  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-pill border border-danger/40 bg-danger/10 text-danger">
        <Icon name="alert" className="size-5" />
      </span>
      <h1 className="mt-5 font-display text-h1 uppercase text-ink">
        That ride went sideways
      </h1>
      <p className="mt-3 max-w-md text-small text-ink-2">
        We could not load this page. Check your connection and try again — your
        cart and saved items are untouched.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
