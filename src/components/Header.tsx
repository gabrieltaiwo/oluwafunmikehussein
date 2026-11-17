"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

interface HeaderProps {
  hasPerspectives: boolean;
}

export function Header({ hasPerspectives }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/practice", label: "Practice" },
    ...(hasPerspectives
      ? [{ href: "/perspectives", label: "Perspectives" }]
      : []),
    { href: "/about", label: "About" },
  ];

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
        <Link
          href="/"
          className="shrink-0 font-serif text-lg font-semibold tracking-tight text-ink transition-colors hover:text-accent-text sm:text-xl"
        >
          {profile.displayName}
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary"
          className="hidden md:flex md:items-center md:gap-8"
        >
          <ul className="flex items-center gap-7">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex h-[72px] items-center text-sm transition-colors ${
                      active
                        ? "font-semibold text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-accent"
                        : "font-medium text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="inline-flex min-h-[42px] items-center justify-center bg-accent px-5 py-2 text-sm font-semibold text-btn-ink transition-colors hover:bg-accent-hover"
          >
            Get in touch
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-border bg-surface text-ink transition-colors hover:border-accent md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen ? (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile Primary"
          className="border-t border-border bg-surface px-5 pb-6 pt-3 shadow-[0_16px_32px_rgba(15,35,40,0.12)] md:hidden"
        >
          <ul className="divide-y divide-border">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[48px] items-center justify-between text-base ${
                      active
                        ? "border-l-2 border-accent pl-3 font-semibold text-ink"
                        : "font-medium text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-btn-ink transition-colors hover:bg-accent-hover"
            >
              Get in touch
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
