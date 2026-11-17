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
    const startA = targetA >= 1900 ? Math.max(targetA - 30, 1900) : 0;
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
    const startA = targetA >= 1900 ? Math.max(targetA - 37, 1900) : 0;
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

  const eased = 1 - Math.pow(1 - progress, 3.5);
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
  const [display, setDisplay] = useState<string>(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const parsed = parseProofValue(value);
    if (parsed.kind === "static") {
      setDisplay(value);
      return;
    }

    let rafId = 0;

    const runAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const durationMs = 1200;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        setDisplay(formatMetric(parsed, progress));

        if (progress < 1) {
          rafId = window.requestAnimationFrame(step);
        } else {
          setDisplay(value);
          playSpringSettle(0, 0.85);
        }
      };

      setDisplay(formatMetric(parsed, 0));
      rafId = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runAnimation();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      runAnimation();
    } else {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
