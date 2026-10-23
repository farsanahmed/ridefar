"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNav, type NavItem } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-5">
        {bottomNav.map((item: NavItem) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  active ? "text-brand-ink" : "text-ink-3 hover:text-ink-2"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-0.5 w-5 rounded-pill transition-colors ${
                    active ? "bg-brand" : "bg-transparent"
                  }`}
                />
                <Icon name={item.icon} className="size-5" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
