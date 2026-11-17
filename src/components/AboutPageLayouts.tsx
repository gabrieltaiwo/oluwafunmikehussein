"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layers } from "lucide-react";
import { AnimatedProofValue } from "@/components/AnimatedProofValue";
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
    title: "Option 1: Deep Studio Split Banner",
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

function ProofFiguresBar() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-6xl divide-y divide-border px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
        {profile.proofFigures.map((item) => (
          <div
            key={item.label}
            className="py-9 md:px-8 md:first:pl-0 md:last:pr-0"
          >
            <p className="font-serif text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
              <AnimatedProofValue value={item.value} />
            </p>
            <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
              {item.label}
            </p>
            <p className="mt-1 text-sm text-ink-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceAndCredentials({
  includeTimeline = true,
}: {
  includeTimeline?: boolean;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      {includeTimeline ? (
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

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {profile.about.careerTimeline.map((entry) => (
              <article
                key={`${entry.role}-${entry.period}`}
                className="border border-border border-t-2 border-t-accent bg-surface p-7 shadow-[0_8px_24px_rgba(15,35,40,0.04)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                  {entry.period}
                </p>
                <h3 className="mt-2.5 font-serif text-xl font-semibold text-ink">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">
                  {entry.organization}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {entry.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section
        className={`${
          includeTimeline ? "mt-16" : ""
        } border border-border bg-surface p-8 sm:p-10`}
      >
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

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "option1" || saved === "option2" || saved === "option3") {
      setLayout(saved);
    }
  }, []);

  const selectLayout = (next: AboutLayoutOption) => {
    playSpringPress();
    playSpringSettle(175, 0.9);
    setLayout(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const portraitSrc =
    profile.aboutBgPath ||
    profile.secondaryPortraitPath ||
    profile.portraitPath;

  return (
    <div className="fade-in relative pb-20">
      {/* OPTION 1: Theme-harmonized Deep Studio Split (uses Persian Blue #1B3350 in Persian theme, Obsidian-Teal in Teal theme, with a warm/alabaster framed studio mat) */}
      {layout === "option1" ? (
        <>
          <section className="border-b border-border-dark bg-bg-dark text-[#F4F7F8]">
            <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <p className="inline-block border-b-2 border-accent pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-bright">
                    About
                  </p>
                  <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#F4F7F8] sm:text-5xl">
                    {profile.displayName}
                  </h1>
                  <p className="mt-2 text-sm font-medium text-[#B7C7CC]">
                    Also known as {profile.alternateName}
                  </p>

                  <p className="mt-7 font-serif text-xl leading-relaxed text-[#F4F7F8] sm:text-2xl">
                    {profile.about.lead}
                  </p>

                  <div className="mt-7 space-y-4 text-base leading-[1.78] text-[#D8E2E6]">
                    {profile.about.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                    {profile.careerInBrief.earlyCareer1987To2006 ? (
                      <p>{profile.careerInBrief.earlyCareer1987To2006}</p>
                    ) : null}
                  </div>
                </div>

                {portraitSrc ? (
                  <div className="lg:col-span-5">
                    <figure className="mx-auto max-w-[380px] border border-border-dark bg-surface p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)] lg:max-w-none">
                      <div className="overflow-hidden border-l-4 border-accent bg-[#C7D4D7]">
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

          <ProofFiguresBar />
          <ExperienceAndCredentials includeTimeline />
        </>
      ) : null}

      {/* OPTION 2: Sticky Magazine Split on native Ricotta Cream / Alabaster background */}
      {layout === "option2" ? (
        <>
          <ProofFiguresBar />
          <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
              {portraitSrc ? (
                <div className="lg:sticky lg:top-24 lg:col-span-5">
                  <figure className="mx-auto max-w-[380px] border border-border bg-surface p-3 shadow-[0_20px_50px_-15px_rgba(15,35,40,0.14)] lg:max-w-none">
                    <div className="overflow-hidden border-l-4 border-accent bg-[#C7D4D7]">
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
                <p className="mt-2 text-sm text-ink-muted">
                  Also known as {profile.alternateName}
                </p>

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

                <div className="mt-14 border-t border-border pt-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                    Experience &amp; Career Timeline
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">
                    Boardroom &amp; advisory roles
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {profile.careerInBrief.summary}
                  </p>
                  <div className="mt-6 space-y-5">
                    {profile.about.careerTimeline.map((entry) => (
                      <article
                        key={`${entry.role}-${entry.period}`}
                        className="border border-border border-l-4 border-l-accent bg-surface p-6 shadow-[0_8px_24px_rgba(15,35,40,0.04)]"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                          {entry.period}
                        </p>
                        <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
                          {entry.role}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-ink-muted">
                          {entry.organization}
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                          {entry.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ExperienceAndCredentials includeTimeline={false} />
        </>
      ) : null}

      {/* OPTION 3: Warm Cream / Alabaster Split Header with Persian-Blue Architectural Frame + Two-Column Bio Below */}
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
                  <p className="mt-2.5 text-sm font-medium text-ink-muted">
                    Also known as {profile.alternateName}
                  </p>
                  <p className="mt-6 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
                    {profile.about.lead}
                  </p>
                </div>

                {portraitSrc ? (
                  <div className="lg:col-span-6">
                    <figure className="mx-auto max-w-[400px] border-b-4 border-accent bg-bg-dark p-3 shadow-[0_24px_60px_rgba(15,35,40,0.2)]">
                      <Image
                        src={portraitSrc}
                        alt={profile.portraitAlt}
                        width={810}
                        height={1024}
                        priority
                        className="h-auto w-full object-contain"
                      />
                    </figure>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <ProofFiguresBar />

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

          <ExperienceAndCredentials includeTimeline />
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
