import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { profile } from "@/data/profile";

interface HeaderProps {
  hasPerspectives: boolean;
}

export function Header({ hasPerspectives }: HeaderProps) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/practice", label: "Practice" },
    ...(hasPerspectives
      ? [{ href: "/perspectives", label: "Perspectives" }]
      : []),
    { href: "/about", label: "About" },
  ];

  return (
    <header
      id="top"
      className="sticky top-0 z-30 border-b border-border bg-bg/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-ink transition-colors hover:text-accent-text sm:text-xl"
        >
          {profile.displayName}
        </Link>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-sm font-medium text-ink-muted transition-colors hover:text-accent-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeSwitcher />

          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center bg-accent px-5 py-2 text-sm font-semibold text-btn-ink transition-colors hover:bg-accent-hover"
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
