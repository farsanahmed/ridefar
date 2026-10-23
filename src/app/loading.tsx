import { CategoryGridSkeleton, ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="border-b border-line bg-canvas">
        <div className="shell space-y-4 py-9 md:py-14">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-16 w-3/4 md:h-24 md:w-2/3" />
          <Skeleton className="h-4 w-full max-w-md" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>

      <div className="shell py-12">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-3 h-7 w-56" />
        <div className="mt-6">
          <CategoryGridSkeleton count={8} />
        </div>
      </div>

      <div className="bg-surface py-12">
        <div className="shell">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-7 w-64" />
          <div className="mt-6">
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </div>

      <p className="sr-only">Loading RIDEFAR catalogue…</p>
    </div>
  );
}
