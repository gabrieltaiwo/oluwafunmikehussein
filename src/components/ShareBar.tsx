"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ShareBarProps {
  title: string;
  url: string;
}

export function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("Share Click", { method: "copy", title });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable
    }
  };

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
      <span className="text-sm font-medium text-ink-muted">Share</span>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-[44px] items-center gap-2 border border-border bg-bg px-3.5 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-accent" aria-hidden="true" />
            <span>Link copied</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden="true" />
            <span>Copy link</span>
          </>
        )}
      </button>
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("Share Click", { method: "linkedin", title })}
        className="inline-flex min-h-[44px] items-center border border-border bg-bg px-3.5 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
      >
        Share on LinkedIn
      </a>
    </div>
  );
}
