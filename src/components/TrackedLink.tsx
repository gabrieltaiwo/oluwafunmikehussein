"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
  className?: string;
  external?: boolean;
  children: ReactNode;
}

export function TrackedLink({
  href,
  eventName,
  eventProps,
  className,
  external = false,
  children,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, eventProps);
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
