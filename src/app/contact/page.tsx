import type { Metadata } from "next";
import { ContactForm, type ContactIntent } from "@/components/ContactForm";
import { TrackedLink } from "@/components/TrackedLink";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.displayName} (also known as ${profile.alternateName}) for corporate governance advisory, board briefings, or to request a professional profile.`,
};

interface ContactPageProps {
  searchParams: Promise<{ intent?: string; topic?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolved = await searchParams;
  const defaultIntent: ContactIntent =
    resolved.intent === "profile"
      ? "profile"
      : resolved.intent === "briefing"
        ? "briefing"
        : "general";

  return (
    <div className="fade-in mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
              Contact
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Get in touch
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              For board governance enquiries, leadership briefings, or to
              request a full professional profile.
            </p>
          </div>

          <div className="space-y-4 border-t border-border pt-6 text-sm">
            {profile.email ? (
              <div>
                <span className="block text-xs uppercase tracking-[0.1em] text-ink-muted">
                  Direct email
                </span>
                <TrackedLink
                  href={`mailto:${profile.email}`}
                  external
                  eventName="Email Click"
                  className="mt-1 inline-flex min-h-[44px] items-center font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  {profile.email}
                </TrackedLink>
              </div>
            ) : null}

            <div>
              <span className="block text-xs uppercase tracking-[0.1em] text-ink-muted">
                LinkedIn
              </span>
              <TrackedLink
                href={profile.linkedinUrl}
                external
                eventName="LinkedIn Click"
                eventProps={{ location: "contact_page" }}
                className="mt-1 inline-flex min-h-[44px] items-center font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
              >
                LinkedIn
              </TrackedLink>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm
            defaultIntent={defaultIntent}
            defaultTopic={resolved.topic}
          />
        </div>
      </div>
    </div>
  );
}
