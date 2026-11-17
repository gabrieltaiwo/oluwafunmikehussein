"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { playSpringPress, playSpringSettle, unlockSound } from "@/lib/sound";

const TARGET_SELECTOR = [
  "h1",
  "h2",
  "blockquote",
  "figure",
  "article",
  "ol > li",
  "ul > li",
  "dl > div",
  "form > div",
  "form > fieldset",
  "p.inline-block",
  "p.font-serif",
  "a.inline-flex",
].join(", ");

function collectStaggerTargets(container: Element): HTMLElement[] {
  const seen = new Set<HTMLElement>();
  const targets: HTMLElement[] = [];

  // Prefer direct meaningful blocks in proof rows or grids too
  const candidates = Array.from(
    container.querySelectorAll<HTMLElement>(TARGET_SELECTOR)
  );

  for (const el of candidates) {
    if (seen.has(el)) continue;
    // Skip hidden honeypot wrappers, custom timeline drop cards, mandate slide items, or nested items
    if (
      el.classList.contains("visually-hidden") ||
      el.classList.contains("timeline-drop-card") ||
      el.closest(".timeline-drop-card") ||
      el.classList.contains("mandate-slide-item") ||
      el.closest(".mandate-slide-item")
    ) {
      continue;
    }
    if (
      el.parentElement &&
      el.closest("article, li, figure") &&
      el.closest("article, li, figure") !== el
    ) {
      continue;
    }
    seen.add(el);
    targets.push(el);
  }

  // Fallback for proof-row columns (3 direct div columns inside the grid)
  if (targets.length === 0) {
    const gridCols = container.querySelectorAll<HTMLElement>(
      ":scope > div > div"
    );
    gridCols.forEach((col) => {
      if (!seen.has(col)) {
        seen.add(col);
        targets.push(col);
      }
    });
  }

  return targets;
}

export function MotionEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const handleGestureUnlock = () => unlockSound();

    const handlePointerDown = (e: PointerEvent) => {
      unlockSound();
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input[type="radio"]');
      if (interactive) {
        playSpringPress();
        playSpringSettle(175, 0.9);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    document.addEventListener("keydown", handleGestureUnlock, {
      passive: true,
    });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleGestureUnlock);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const main = document.getElementById("main-content");
    if (!main) return;

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const revealedSections = new WeakSet<Element>();

    const sections = Array.from(
      main.querySelectorAll<HTMLElement>(
        ":scope > div > section, :scope > div > div, :scope > div > ul, :scope > section, :scope > article"
      )
    );

    const sectionTargets = new Map<Element, HTMLElement[]>();

    for (const section of sections) {
      // Skip continuous marquee ticker viewport so its loop never pauses or blurs
      if (section.classList.contains("ticker-viewport")) continue;

      const targets = collectStaggerTargets(section);
      if (targets.length === 0) continue;

      targets.forEach((el, idx) => {
        el.style.setProperty("--stagger-i", String(Math.min(idx, 8)));
        el.classList.add("spring-stagger-item");
      });

      sectionTargets.set(section, targets);
    }

    const revealSection = (section: Element, playAudio: boolean) => {
      if (revealedSections.has(section)) return;
      revealedSections.add(section);

      const targets = sectionTargets.get(section) || [];
      targets.forEach((el, idx) => {
        el.classList.add("is-in-view");
        if (playAudio && idx < 4) {
          const timer = playSpringSettle(idx * 55 + 310, 0.75);
          if (timer) timers.push(timer);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealSection(entry.target, true);
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    const rafId = window.requestAnimationFrame(() => {
      for (const section of sectionTargets.keys()) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          revealSection(section, false);
        } else {
          observer.observe(section);
        }
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      timers.forEach((id) => clearTimeout(id));
    };
  }, [pathname]);

  return null;
}
