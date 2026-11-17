"use client";

import { useEffect, useRef, useState } from "react";
import { playSpringSettle } from "@/lib/sound";

interface AnimatedProofValueProps {
  value: string;
}

interface ParsedMetric {
  kind: "single" | "range" | "static";
  startA: number;
  targetA: number;
  startB: number;
  targetB: number;
  padB: number;
  separator: string;
  suffix: string;
}

function parseProofValue(raw: string): ParsedMetric {
  const trimmed = raw.trim();

  // Range pattern like "2016–19" or "2016-19"
  const rangeMatch = /^(\d+)([–-])(\d+)(.*)$/.exec(trimmed);
  if (rangeMatch) {
    const targetA = Number(rangeMatch[1]);
    const targetB = Number(rangeMatch[3]);
    const startA = targetA >= 1900 ? 1987 : 0;
    return {
      kind: "range",
      startA,
      targetA,
      startB: 0,
      targetB,
      padB: rangeMatch[3].length,
      separator: rangeMatch[2],
      suffix: rangeMatch[4],
    };
  }

  // Single leading number like "37+ yrs", "13+ yrs", or "1987"
  const singleMatch = /^(\d+)(.*)$/.exec(trimmed);
  if (singleMatch) {
    const targetA = Number(singleMatch[1]);
    const startA = targetA >= 1900 ? 1950 : 0;
    return {
      kind: "single",
      startA,
      targetA,
      startB: 0,
      targetB: 0,
      padB: 0,
      separator: "",
      suffix: singleMatch[2],
    };
  }

  return {
    kind: "static",
    startA: 0,
    targetA: 0,
    startB: 0,
    targetB: 0,
    padB: 0,
    separator: "",
    suffix: trimmed,
  };
}

function formatMetric(parsed: ParsedMetric, progress: number): string {
  if (parsed.kind === "static") return parsed.suffix;

  // Smooth cubic-out curve so digits visibly roll up across the full duration
  const eased = 1 - Math.pow(1 - progress, 2.6);
  const currentA = Math.round(
    parsed.startA + (parsed.targetA - parsed.startA) * eased
  );

  if (parsed.kind === "range") {
    const currentB = Math.round(
      parsed.startB + (parsed.targetB - parsed.startB) * eased
    );
    const formattedB = String(currentB).padStart(parsed.padB, "0");
    return `${currentA}${parsed.separator}${formattedB}${parsed.suffix}`;
  }

  return `${currentA}${parsed.suffix}`;
}

export function AnimatedProofValue({ value }: AnimatedProofValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parseProofValue(value);
  const [display, setDisplay] = useState<string>(() => formatMetric(parsed, 0));
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || parsed.kind === "static") {
      setDisplay(value);
      setIsSettled(true);
      return;
    }

    let rafId = 0;
    let startDelayId: ReturnType<typeof setTimeout> | null = null;
    let isAnimating = false;

    const startCount = () => {
      if (isAnimating) return;
      isAnimating = true;
      setIsSettled(false);
      setDisplay(formatMetric(parsed, 0));

      startDelayId = setTimeout(() => {
        const durationMs = 1800;
        const startTime = performance.now();

        const step = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / durationMs, 1);
          setDisplay(formatMetric(parsed, progress));

          if (progress < 1) {
            rafId = window.requestAnimationFrame(step);
          } else {
            setDisplay(value);
            setIsSettled(true);
            isAnimating = false;
            playSpringSettle(0, 0.85);
          }
        };

        rafId = window.requestAnimationFrame(step);
      }, 180);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startCount();
          } else {
            if (startDelayId) clearTimeout(startDelayId);
            if (rafId) window.cancelAnimationFrame(rafId);
            isAnimating = false;
            setIsSettled(false);
            setDisplay(formatMetric(parsed, 0));
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (startDelayId) clearTimeout(startDelayId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [value]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums transition-transform duration-500 ${
        isSettled ? "scale-100" : "scale-[0.96]"
      }`}
    >
      {display}
    </span>
  );
}
