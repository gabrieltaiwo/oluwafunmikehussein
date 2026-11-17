import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

interface FooterProps {
  hasPerspectives: boolean;
}

export function Footer({ hasPerspectives }: FooterProps) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    ...(hasPerspectives
      ? [{ href: "/perspectives", label: "Perspectives" }]
      : []),
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="mt-auto border-t border-border-dark bg-bg-dark text-[#F4F7F8]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="space-y-1.5">
          <p className="font-serif text-lg font-semibold text-[#F4F7F8]">
            {profile.displayName}
          </p>
          <p className="text-sm text-[#B7C7CC]">
            Also known as {profile.alternateName}
          </p>
          {profile.email ? (
            <p className="pt-1 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="text-accent-bright underline underline-offset-4 hover:text-white"
              >
                {profile.email}
              </a>
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-6">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-[#C4D3D7] transition-colors hover:text-accent-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${profile.displayName} on LinkedIn`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-border-dark bg-bg-dark-elevated text-[#C4D3D7] transition-colors hover:border-accent-bright hover:text-accent-bright"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center gap-1.5 border border-border-dark bg-bg-dark-elevated px-3.5 py-2 text-xs font-medium uppercase tracking-[0.08em] text-[#C4D3D7] transition-colors hover:border-accent-bright hover:text-accent-bright"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
