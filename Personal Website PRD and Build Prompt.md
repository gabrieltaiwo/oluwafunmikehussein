# Personal Website PRD and Build Prompt

Subject: Oluwafunmike Hussain (display name to be confirmed; listed on LinkedIn as Olufunke Hussain)

Stack: Next.js. Status: ready to build once open items in Section 11 are closed.

## 1. Overview

A lean personal website for a senior lawyer and corporate governance professional. The site exists to build her personal reputation as a credible voice on corporate governance, not to sell a firm's services. It is deliberately small, text-led and calm in tone.

**Subject summary**

- Head of Company Secretarial Services, George Etomi & Partners (March 2023 to present)
- Managing Consultant, Synex Consult Ltd (2020 to 2023)
- Executive Director, NCR (Nigeria) Plc (2016 to 2019)
- Company Secretary, NCR (Nigeria) Plc (2006 to 2019, over 13 years)
- LLB, Obafemi Awolowo University (1986); Nigerian Law School, BL (1987)
- LinkedIn: https://www.linkedin.com/in/olufunke-hussain-a0690889/

Her distinguishing proof is the combination of lawyer, long-serving listed-company Company Secretary and Executive Director: she has seen boards from the advisory side and from the seat itself.

## 2. Goals and audience

**Primary goal:** establish her as a senior, trusted voice on corporate governance.

**Secondary goals:** make her easy to find and verify by name; give boards, peers and regulators a clear way to contact her.

**Audiences:** boards and chairs, listed and regulated companies, company secretaries and corporate counsel, regulators and industry bodies, peers and prospective collaborators.

**Success signals:** visitors reach About and Perspectives, contact enquiries received, LinkedIn visits from the site, search results for her name show the site and LinkedIn together. Numeric targets are to be set later.

## 3. Findings from the LinkedIn review that shape the site

1. The headline is a keyword list and omits her strongest credentials (lawyer, Executive Director). The site must state positioning in plain language.
2. The About text is generic. The site must name situations, board types and regulatory topics.
3. Role descriptions are empty and the 1987 to 2006 period is blank. The site supports this history as hidden content to add later.
4. There are no visible posts. A reputation site needs something to read, so Perspectives is included, hidden until it has real content.
5. Memberships and professional credentials are not shown. A credentials block is built but hidden until supplied.
6. The name differs between LinkedIn (Olufunke) and the intended site name (extended native spelling). The site handles both so she is not split into two identities.

## 4. Scope and information architecture

**v1 pages (lean):**

- / Home
- /about
- /perspectives and /perspectives/\[slug\]
- /contact

**Out of scope for v1:** blog platform features (comments, categories, search), podcast, video, newsletter, member login, shop, firm-branded content, statistics counters (numbers come later).

## 5. Home page specification

Sections render in this order. Any section without real content is not rendered.

1. **Hero.** One plain statement of what she does and for whom, a professional portrait, primary CTA "Read her perspectives", secondary CTA "Get in touch".
2. **Career in brief.** A short written narrative, not a logo wall. Covers the NCR years and the current role. Hidden field for the 1987 to 2006 history.
3. **Expertise.** Four areas, each written as a problem she solves, with one or two sentences: board governance and advisory; company secretarial services; regulatory compliance and filings; corporate transactions and statutory obligations. Layout must vary from the other sections (no identical icon cards).
4. **Perspectives.** Latest two or three pieces. Hidden if none exist.
5. **Credentials.** Degrees, bar call, memberships. Memberships hidden until supplied.
6. **Contact.** Form, email, LinkedIn link, "Request profile".

## 6. Other pages

**About.** Longer narrative in first person or third person (to be decided with her), credentials, and the line "Also known as Olufunke Hussain".

**Perspectives.** List of pieces with title, date and a one-line summary. Each piece is an MDX page with comfortable long-form reading typography, estimated reading time and a share link.

**Contact.** Form (name, email, message), direct email, LinkedIn link, success and error states, spam protection.

## 7. Functional requirements

- Contact form with spam protection and email delivery.
- "Request profile" action that sends an email request (no public file download in v1).
- MDX-based Perspectives with frontmatter: title, date, summary, slug.
- Conditional rendering: sections and fields with no content are omitted from the output and the navigation.
- Name handling: display name used in navigation, titles, headings and share previews; alternate name in structured data; "Also known as" line on About and footer.
- Links: LinkedIn visible in Contact and footer and included in structured data. Other socials only if supplied.
- Event tracking on CTA clicks and form submissions.

## 8. Non-functional requirements

- Mobile-first, responsive from 360px wide.
- Lighthouse 90 or higher in performance, accessibility, best practices and SEO.
- WCAG AA contrast, keyboard navigation, visible focus states, real alt text.
- Fast on mid-range phones over typical Nigerian mobile connections (target LCP under 2.5 seconds).
- SEO: meta tags, Open Graph and Twitter images, sitemap.xml, robots.txt, Person JSON-LD (name, alternateName, jobTitle, sameAs with LinkedIn).
- Privacy-friendly analytics (Plausible).

## 9. Design direction (non-negotiable)

The site must not look generated or templated.

- **Palette:** near-black ink, warm off-white background, one dark-teal accent (taken from the colour in her existing brand imagery). Hex value to be chosen at build.
- **Typography:** serif headings (Source Serif 4 or Newsreader) with a neutral sans body.
- **Layout:** text-led, asymmetric, generous whitespace, varied section layouts, comfortable long-form reading width.
- **Imagery:** one supplied professional portrait only. No stock photography. The existing social-media promotional graphic is not used on the site.
- **Avoid:** gradients, glassmorphism, floating blobs, emoji, identical three-card icon grids, motivational-poster slogans.
- **Motion:** subtle fades only; respect prefers-reduced-motion.
- **Light and dark modes:** optional; if included, both must be fully designed.

## 10. Copy rules

- Tone: authoritative, calm, precise, like senior counsel rather than a marketer.
- Written from her own material and in her voice. Specific nouns: board types, regulations, situations.
- Banned words: passionate, leverage, unlock, empower, synergy, cutting-edge, holistic, journey, "Let's work together".
- No invented statistics, clients, testimonials or quotations.
- No placeholder text in production.

## 11. Open items and content checklist

**Must have before launch**

1. Exact spelling of the display name (likely "Oluwafunmike Hussain"; confirm with her).
2. A professional portrait (the single biggest quality factor).
3. Contact email address.
4. Her approval of the final About text and expertise wording.

**Can follow later (sections stay hidden until supplied)**

- Memberships and professional credentials
- Career history for 1987 to 2006
- Two or three Perspectives pieces
- Statistics or proof points
- Testimonials or recommendations
- Other social links

**Confirm**

- Whether the site may name George Etomi & Partners as her current role (factual mention only, no firm branding).

## 12. Delivery

Working Next.js codebase deployed on Vercel, a README with setup and content-editing steps, and a list of remaining content to supply.

## 13. Recommendation for LinkedIn alignment

So that search results do not split her into two identities, she should add the extended spelling of her name to her LinkedIn profile or use one form everywhere. Her headline and About should also be rewritten around audience and outcome, with role descriptions added.

## 14. Build prompt (copy and paste)

```
Build a lean personal website for Oluwafunmike Hussain using Next.js.

SUBJECT
Display name: "Oluwafunmike Hussain" (configurable in src/data/profile.ts).
This is the extended native-language form of the name she is listed under
on LinkedIn as "Olufunke Hussain". Use the display name in the nav, page
titles, headings and share previews.

Lawyer and corporate governance professional. Head of Company Secretarial
Services, George Etomi & Partners (March 2023-present). Former Managing
Consultant, Synex Consult Ltd (2020-2023). Former Company Secretary
(2006-2019) and Executive Director (2016-2019), NCR (Nigeria) Plc.
LLB, Obafemi Awolowo University (1986); called to the Nigerian Bar (1987).

This is a personal site, not firm-branded.
Goal: build her personal reputation as a senior voice on corporate governance.
Audience: boards, listed and regulated companies, company secretaries,
corporate counsel, regulators, peers.

TONE & VOICE
Authoritative, calm, precise. Senior counsel, not marketer.
Use consistent third-person voice across Hero, About, and CTAs.

STACK
Next.js (App Router), TypeScript, Tailwind CSS, MDX (next-mdx-remote/rsc +
gray-matter + reading-time) for Perspectives, deployed on Vercel.
Contact form via Resend (with graceful error state if RESEND_API_KEY is
unset). Plausible analytics (custom events on CTA clicks and form submit;
no-op if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is unset).

ARCHITECTURE & CONFIG
Centralize all editable copy, feature flags, and optional fields
(displayName, alternateName, email, portraitPath, earlyCareer1987To2006,
memberships) in a single typed file: src/data/profile.ts.

PAGES
/ (home), /about, /perspectives (+ /perspectives/[slug]), /contact

HOME SECTIONS (in order)
1. Hero: plain statement of what she does and for whom, professional portrait
   (omit <img> cleanly if portrait file is not yet in public/),
   CTAs: "Read her perspectives" (primary) and "Get in touch" (secondary).
   Fallback: if no MDX perspectives exist, omit /perspectives from nav and
   link the primary CTA to /about ("About her practice") or promote
   "Get in touch" to primary.
2. Career in brief: short written narrative, no logo wall.
3. Expertise: 4 areas written as problems solved: board governance and
   advisory; company secretarial services; regulatory compliance and filings;
   corporate transactions and statutory obligations.
4. Perspectives: latest 2-3 MDX pieces. OMITTED if none exist.
5. Credentials: degrees, bar call, memberships. Memberships OMITTED until supplied.
6. Contact: form (name, email, message), direct email, LinkedIn link, and
   "Request profile" action (routes to /contact?intent=profile or pre-selects
   a "Profile request" subject on the form — no public PDF download).

FOOTER
Display name, one line "Also known as Olufunke Hussain", active nav links,
and LinkedIn icon link.

NAME HANDLING
- Person JSON-LD: name = displayName, alternateName = "Olufunke Hussain"
- About page and footer: one line, "Also known as Olufunke Hussain"
- Meta description includes both forms once

LINKS
- LinkedIn: https://www.linkedin.com/in/olufunke-hussain-a0690889/
  - Contact section: visible link labelled "LinkedIn"
  - Footer: icon link
  - Person JSON-LD: sameAs
- Other social links: add only if supplied in profile.ts

CONTENT RULES
- Any section, nav link, or field without real content MUST be omitted from
  the rendered DOM and navigation (not hidden with CSS display:none).
- Career history 1987-2006 is an optional field in profile.ts, null by default.
- No invented stats, clients, testimonials or quotes.
- No placeholder text ("Lorem ipsum", "[TBD]") in production output.

DESIGN (non-negotiable)
- Palette: near-black ink, warm off-white background, one dark-teal accent
  (define as a CSS variable, e.g. #0F4C4C, meeting WCAG AA contrast)
- Type: serif headings (Source Serif 4 or Newsreader via next/font), neutral sans body
- No gradients, glassmorphism, blobs, emoji, or stock photography
- No row of identical icon cards; vary layout section to section
- Text-led, asymmetric layouts; generous whitespace; long-form reading comfort
- Motion: subtle fades only, respecting prefers-reduced-motion
- Portrait: supplied professional photo only, with proper alt text

COPY RULES
Banned: passionate, leverage, unlock, empower, synergy, cutting-edge, holistic,
journey, "Let's work together". Use specific nouns: board types, regulations,
situations.

REQUIREMENTS
Mobile-first (360px+), Lighthouse 90+ across all categories, WCAG AA,
dynamic Open Graph/Twitter images (Next.js opengraph-image.tsx), sitemap.xml,
robots.txt, Person JSON-LD, spam-protected form (honeypot field + server-side
rate limiting) with success/error states, CTA & form submit event tracking.

DELIVERABLES
Working code, a README with setup/env/deploy steps, and a content checklist
of everything still needed from her before launch.
```
