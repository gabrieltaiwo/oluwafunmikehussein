"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import type { ExpertiseArea } from "@/data/profile";

interface PracticeContextMeta {
  scope: string;
  focus: string;
}

interface PracticeMandateListProps {
  items: ExpertiseArea[];
  contextMeta: Record<string, PracticeContextMeta>;
}

export function PracticeMandateList({
  items,
  contextMeta,
}: PracticeMandateListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rowEls = Array.from(
      container.querySelectorAll<HTMLElement>(".mandate-slide-item")
    );
    if (rowEls.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      rowEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      {
        threshold: 0.22,
        rootMargin: "-48px 0px -48px 0px",
      }
    );

    rowEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="mt-12 space-y-10 overflow-x-clip">
      {items.map((area, index) => {
        const reversed = index % 2 === 1;
        const slideSide = index % 2 === 0 ? "left" : "right";
        const meta = contextMeta[area.title];
        return (
          <div
            key={area.title}
            id={`practice-0${index + 1}`}
            data-slide={slideSide}
            className="mandate-slide-item scroll-mt-24 grid items-stretch gap-6 border-t border-border pt-10 lg:grid-cols-12 lg:gap-10"
          >
            <div
              className={`flex flex-col justify-between border-l-4 border-accent bg-surface p-7 shadow-[0_8px_30px_rgba(15,35,40,0.04)] sm:p-9 lg:col-span-5 ${
                reversed ? "lg:order-2" : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                  {area.eyebrow}
                </span>
                <span className="font-serif text-2xl font-semibold text-border">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-6 space-y-2 border-t border-border pt-5">
                {meta ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink">
                      {meta.scope}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {meta.focus}
                    </p>
                  </>
                ) : null}
              </div>
            </div>

            <div
              className={`flex flex-col justify-center space-y-4 lg:col-span-7 ${
                reversed ? "lg:order-1" : ""
              }`}
            >
              <h3 className="font-serif text-2xl font-semibold text-ink sm:text-[1.65rem]">
                {area.title}
              </h3>
              <p className="max-w-xl text-base leading-[1.78] text-ink-muted">
                {area.description}
              </p>
              <div className="pt-1">
                <TrackedLink
                  href={`/contact?intent=briefing&topic=${encodeURIComponent(
                    area.title
                  )}`}
                  eventName="Practice Briefing CTA"
                  eventProps={{ area: area.title }}
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent-text underline underline-offset-4 hover:text-accent-hover"
                >
                  <span>Request a briefing</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
