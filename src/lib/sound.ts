"use client";

let audioCtx: AudioContext | null = null;
let lastPlayedAt = 0;
const MIN_INTERVAL_MS = 45;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined" || prefersReducedMotion()) return null;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) {
    audioCtx = new Ctor();
  }
  return audioCtx;
}

/**
 * Unlocks and resumes the singleton AudioContext on the first user gesture.
 */
export function unlockSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume().catch(() => {});
  }
}

/**
 * Soft tactile mechanical micro-thock on interaction start (pointerdown).
 */
export function playSpringPress(): void {
  if (prefersReducedMotion()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume().catch(() => {});
  }
  if (ctx.state !== "running") return;

  const nowMs = performance.now();
  if (nowMs - lastPlayedAt < MIN_INTERVAL_MS) return;
  lastPlayedAt = nowMs;

  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(88, t + 0.024);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(500, t);

  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(0.04, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.026);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(t);
  osc.stop(t + 0.03);
}

/**
 * Soft warm settle transient synchronized to land as a spring overshoot settles.
 */
export function playSpringSettle(
  delayMs = 0,
  volumeScale = 1
): ReturnType<typeof setTimeout> | null {
  if (prefersReducedMotion()) return null;

  const trigger = () => {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== "running") return;

    const nowMs = performance.now();
    if (nowMs - lastPlayedAt < MIN_INTERVAL_MS) return;
    lastPlayedAt = nowMs;

    const peak = Math.max(0.002, Math.min(0.045, 0.028 * volumeScale));
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(165, t);
    osc.frequency.exponentialRampToValueAtTime(58, t + 0.03);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(380, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.034);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.038);
  };

  if (delayMs <= 0) {
    trigger();
    return null;
  }

  return setTimeout(trigger, delayMs);
}
