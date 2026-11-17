"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layers } from "lucide-react";
import { profile } from "@/data/profile";
import { playSpringPress, playSpringSettle } from "@/lib/sound";

type AboutLayoutOption = "option1" | "option2" | "option3";

const STORAGE_KEY = "about-layout-option";

const LAYOUT_OPTIONS: Array<{
  id: AboutLayoutOption;
  shortLabel: string;
  title: string;
}> = [
  {
    id: "option1",
    shortLabel: "1 · Studio Split",
    title: "Option 1: Seamless Studio Split Banner",
  },
  {
    id: "option2",
    shortLabel: "2 · Sticky Magazine",
    title: "Option 2: Sticky Magazine Split",
  },
  {
    id: "option3",
    shortLabel: "3 · Hero + Bio Below",
    title: "Option 3: Framed Hero + Two-Column Bio Below",
  },
];

function FullWidthTimelineList() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const cards = Array.from(
      listEl.querySelectorAll<HTMLElement>(".timeline-drop-card")
    );

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      cards.forEach((c) => c.classList.add("is-dropped"));
      return;
    }

    const timers = new Map<Element, ReturnType<typeof setTimeout>>();

    const observer = new IntersectionObserver(
      (entries) => {
        let batchOrder = 0;
        for (const entry of entries) {
          const card = entry.target as HTMLElement;
          const prevTimer = timers.get(card);

          if (entry.isIntersecting && entry.intersectionRatio >= 0.05) {
            if (!card.classList.contains("is-dropped")) {
              card.style.setProperty("--drop-i", String(batchOrder));
              card.classList.add("is-dropped");
              const t = playSpringSettle(batchOrder * 110 + 520, 0.95);
              if (t) timers.set(card, t);
              batchOrder += 1;
            }
          } else if (!entry.isIntersecting) {
            // Only reset after the card has completely left the viewport
            if (prevTimer) {
              clearTimeout(prevTimer);
              timers.delete(card);
            }
            card.classList.remove("is-dropped");
          }
        }
      },
      { threshold: [0, 0.05], rootMargin: "0px" }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <ol ref={listRef} className="mt-10 space-y-5 overflow-x-clip py-2">
      {profile.about.careerTimeline.map((entry, index) => {
        const side = index % 2 === 0 ? "left" : "right";
        return (
          <li
            key={`${entry.role}-${entry.period}`}
            data-side={side}
            style={{ ["--drop-i" as string]: String(index) }}
            className="timeline-drop-card"
          >
            <article className="grid w-full gap-4 border border-border border-l-4 border-l-accent bg-surface p-6 shadow-[0_14px_34px_-12px_rgba(15,35,40,0.08)] sm:p-8 md:grid-cols-12 md:items-baseline md:gap-8">
              <div className="md:col-span-3">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                  {entry.period}
                </span>
              </div>

              <div className="md:col-span-4">
                <h3 className="font-serif text-xl font-semibold text-ink sm:text-2xl">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">
                  {entry.organization}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                  {entry.description}
                </p>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

function ExperienceAndCredentials() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <section id="experience">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
            Experience &amp; Career Timeline
          </p>
          <h2 className="mt-2.5 font-serif text-3xl font-semibold tracking-tight text-ink">
            Boardroom &amp; advisory roles
          </h2>
          <p className="mt-4 text-base leading-[1.78] text-ink">
            {profile.careerInBrief.summary}
          </p>
        </div>

        <FullWidthTimelineList />
      </section>

      <section className="mt-16 border border-border bg-surface p-8 sm:p-10">
        <h2 className="font-serif text-2xl font-semibold text-ink">
          Credentials
        </h2>
        <dl className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
              Education
            </dt>
            {profile.credentials.education.map((deg) => (
              <dd key={deg} className="mt-2 text-base text-ink">
                {deg}
              </dd>
            ))}
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
              Bar admission
            </dt>
            <dd className="mt-2 text-base text-ink">
              {profile.credentials.barCall}
            </dd>
          </div>
          {profile.credentials.memberships.length > 0 ? (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                Memberships
              </dt>
              <dd className="mt-2 space-y-1 text-base text-ink">
                {profile.credentials.memberships.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-border pt-10">
        <Link
          href="/contact?intent=profile"
          className="inline-flex min-h-[48px] items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-btn-ink transition-colors hover:bg-accent-hover"
        >
          Request full profile
        </Link>
        <Link
          href="/practice"
          className="inline-flex min-h-[48px] items-center justify-center border border-ink-muted bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-text"
        >
          Explore practice areas
        </Link>
      </div>
    </div>
  );
}

export function AboutPageLayouts() {
  const [layout, setLayout] = useState<AboutLayoutOption>("option1");
  const [isPersianTheme, setIsPersianTheme] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "option1" || saved === "option2" || saved === "option3") {
      setLayout(saved);
    }

    const syncTheme = () => {
      setIsPersianTheme(
        document.documentElement.getAttribute("data-theme") === "persian"
      );
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const selectLayout = (next: AboutLayoutOption) => {
    playSpringPress();
    playSpringSettle(175, 0.9);
    setLayout(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  // Use the warm cream-graded studio image in Persian & Cream theme so there is zero icy-grey clash
  const portraitSrc = isPersianTheme
    ? "/images/about-studio-persian.jpg"
    : profile.aboutBgPath ||
      profile.secondaryPortraitPath ||
      profile.portraitPath;

  const portraitMatBg = isPersianTheme ? "bg-[#E9E0CE]" : "bg-[#C7D4D7]";

  return (
    <div className="fade-in relative pb-20">
      {/* OPTION 1: Seamless Studio Split Banner (warm Ricotta Cream/Sandstone blend in Persian theme; cool studio mist in Teal theme) */}
      {layout === "option1" ? (
        <>
          <section
            className={`border-b border-border ${
              isPersianTheme
                ? "bg-gradient-to-br from-[#F0E8D8] via-[#EAE0CC] to-[#DFD3BC] text-ink"
                : "bg-[#C7D4D7] text-[#142226]"
            }`}
          >
            <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <p className="inline-block border-b-2 border-accent pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                    About
                  </p>
                  <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                    {profile.displayName}
                  </h1>

                  <p className="mt-7 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
                    {profile.about.lead}
                  </p>

                  <div className="mt-7 space-y-4 text-base leading-[1.78] text-ink">
                    {profile.about.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                    {profile.careerInBrief.earlyCareer1987To2006 ? (
                      <p className="text-ink-muted">
                        {profile.careerInBrief.earlyCareer1987To2006}
                      </p>
                    ) : null}
                  </div>
                </div>

                {portraitSrc ? (
                  <div className="lg:col-span-5">
                    <figure className="mx-auto max-w-[380px] border border-border bg-surface p-3 shadow-[0_20px_50px_-15px_rgba(27,51,80,0.16)] lg:max-w-none">
                      <div
                        className={`overflow-hidden border-l-4 border-accent ${portraitMatBg}`}
                      >
                        <Image
                          src={portraitSrc}
                          alt={profile.portraitAlt}
                          width={810}
                          height={1024}
                          priority
                          className="h-auto w-full object-contain"
                        />
                      </div>
                      <figcaption className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-xs text-ink-muted">
                        <span className="font-medium text-ink">
                          {profile.displayName}
                        </span>
                        <span>Lagos, Nigeria</span>
                      </figcaption>
                    </figure>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <ExperienceAndCredentials />
        </>
      ) : null}

      {/* OPTION 2: Sticky Magazine Split + Full-Width End-to-End Timeline Below */}
      {layout === "option2" ? (
        <>
          <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
              {portraitSrc ? (
                <div className="lg:sticky lg:top-24 lg:col-span-5">
                  <figure className="mx-auto max-w-[380px] border border-border bg-surface p-3 shadow-[0_20px_50px_-15px_rgba(15,35,40,0.14)] lg:max-w-none">
                    <div
                      className={`overflow-hidden border-l-4 border-accent ${portraitMatBg}`}
                    >
                      <Image
                        src={portraitSrc}
                        alt={profile.portraitAlt}
                        width={810}
                        height={1024}
                        priority
                        className="h-auto w-full object-contain"
                      />
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-xs text-ink-muted">
                      <span className="font-medium text-ink">
                        {profile.displayName}
                      </span>
                      <span>Head of Company Secretarial Services</span>
                    </figcaption>
                  </figure>
                </div>
              ) : null}

              <div className="lg:col-span-7">
                <p className="inline-block border-b-2 border-accent pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                  About
                </p>
                <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                  {profile.displayName}
                </h1>

                <p className="mt-8 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
                  {profile.about.lead}
                </p>

                <div className="mt-8 space-y-5 text-base leading-[1.78] text-ink-muted">
                  {profile.about.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                  {profile.careerInBrief.earlyCareer1987To2006 ? (
                    <p>{profile.careerInBrief.earlyCareer1987To2006}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <ExperienceAndCredentials />
        </>
      ) : null}

      {/* OPTION 3: Warm Split Header + Two-Column Bio + Full-Width Timeline Below */}
      {layout === "option3" ? (
        <>
          <section className="relative overflow-hidden border-b border-border bg-bg-subtle/75 text-ink">
            <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <p className="inline-block border-b-2 border-accent pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                    About
                  </p>
                  <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                    {profile.displayName}
                  </h1>
                  <p className="mt-6 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
                    {profile.about.lead}
                  </p>
                </div>

                {portraitSrc ? (
                  <div className="lg:col-span-6">
                    <figure className="mx-auto max-w-[400px] border border-border border-b-4 border-b-accent bg-surface p-3 shadow-[0_20px_50px_-15px_rgba(27,51,80,0.16)]">
                      <div className={portraitMatBg}>
                        <Image
                          src={portraitSrc}
                          alt={profile.portraitAlt}
                          width={810}
                          height={1024}
                          priority
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </figure>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="border-b border-border bg-surface">
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="space-y-5 text-base leading-[1.8] text-ink">
                  {profile.about.paragraphs.slice(0, 2).map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
                <div className="space-y-5 text-base leading-[1.8] text-ink-muted">
                  {profile.about.paragraphs.slice(2).map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                  {profile.careerInBrief.earlyCareer1987To2006 ? (
                    <p>{profile.careerInBrief.earlyCareer1987To2006}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <ExperienceAndCredentials />
        </>
      ) : null}

      {/* Floating Action Switcher at Bottom-Right */}
      <aside
        aria-label="About layout switcher"
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
      >
        <div className="flex flex-wrap items-center gap-1.5 border border-border-dark bg-bg-dark/95 p-1.5 text-[#F4F7F8] shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-md">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-bright">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Layout</span>
          </span>
          {LAYOUT_OPTIONS.map((opt) => {
            const active = layout === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => selectLayout(opt.id)}
                aria-pressed={active}
                title={opt.title}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-accent text-btn-ink"
                    : "bg-bg-dark-elevated text-[#C4D3D7] hover:text-white"
                }`}
              >
                {opt.shortLabel}
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
