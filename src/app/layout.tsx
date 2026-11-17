import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionEnhancer } from "@/components/MotionEnhancer";
import { profile } from "@/data/profile";
import { getAllPerspectives } from "@/lib/perspectives";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.displayName} — Corporate Governance & Company Secretarial Practice`,
    template: `%s | ${profile.displayName}`,
  },
  description: profile.seoDescription,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: profile.siteUrl,
    siteName: profile.displayName,
    title: profile.displayName,
    description: profile.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: profile.displayName,
    description: profile.seoDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const perspectives = getAllPerspectives();
  const hasPerspectives = perspectives.length > 0;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.displayName,
    alternateName: profile.alternateName,
    jobTitle: profile.jobTitle,
    url: profile.siteUrl,
    sameAs: [
      profile.linkedinUrl,
      ...profile.otherSocials.map((s) => s.url),
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Obafemi Awolowo University",
      },
      {
        "@type": "EducationalOrganization",
        name: "Nigerian Law School",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${inter.variable}`}
    >
      <body className="bg-bg text-ink antialiased">
        <a href="#main-content" className="skip-link visually-hidden">
          Skip to main content
        </a>

        <Header hasPerspectives={hasPerspectives} />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer hasPerspectives={hasPerspectives} />

        <MotionEnhancer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
