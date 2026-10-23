/** Route helpers. Centralised so phase changes touch one place only. */

export function productHref(slug: string): string {
  return `/shop/${slug}`;
}

export function categoryHref(slug: string): string {
  return `/shop?category=${slug}`;
}

export function shopHref(query?: Record<string, string | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}
