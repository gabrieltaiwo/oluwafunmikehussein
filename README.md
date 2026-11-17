# Oluwafunmike Hussain — Personal Website

A lean, text-led personal website for **Oluwafunmike Hussain** (also known on LinkedIn as **Olufunke Hussain**), built with Next.js (App Router), TypeScript, Tailwind CSS, MDX, Resend, and Plausible Analytics.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

### Environment Variables

| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical base URL for metadata, `sitemap.xml`, and `opengraph-image` |
| `RESEND_API_KEY` | Yes (for email) | Resend API key for `/api/contact` delivery |
| `CONTACT_TO_EMAIL` | Yes (for email) | Destination email address for contact & profile requests |
| `CONTACT_FROM_EMAIL` | Optional | Verified sender address in Resend (defaults to `onboarding@resend.dev`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible domain for privacy-friendly analytics & custom CTA events |

## Editing Content

All profile copy, credentials, links, and optional sections live in [`src/data/profile.ts`](src/data/profile.ts).

- **Conditional rendering:** Fields set to `null` or `[]` (`email`, `portraitPath`, `earlyCareer1987To2006`, `memberships`, `otherSocials`) are omitted from the rendered DOM.
- **Portrait:** Place the supplied photo in `public/images/portrait.jpg` and set `portraitPath: "/images/portrait.jpg"` in `src/data/profile.ts`.
- **Perspectives (MDX):** Add `.mdx` files to `content/perspectives/` with frontmatter:
  ```yaml
  ---
  title: "Board Minute-Taking as Governance Evidence"
  date: "2026-11-20"
  summary: "One-line summary for the Perspectives index."
  slug: "board-minute-taking-governance-evidence"
  ---
  ```
  When `content/perspectives/` is empty or absent, the Perspectives section, `/perspectives` nav link, and sitemap entry are omitted automatically, and the Hero primary CTA falls back to `/about`.

## Deploy on Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. Add the environment variables from `.env.example` in Vercel Project Settings.
4. Verify your sending domain in Resend so `CONTACT_FROM_EMAIL` can deliver to `CONTACT_TO_EMAIL`.
5. Deploy.

## Content Checklist (Needed Before Launch)

**Required for launch**
1. Confirm exact display name spelling (`Oluwafunmike Hussain`).
2. Supply a high-resolution professional portrait (`public/images/portrait.jpg`).
3. Supply contact email address (`profile.email` and `CONTACT_TO_EMAIL`).
4. Review and approve the Hero, Career in brief, Expertise, and About copy in `src/data/profile.ts` (including confirmation to name George Etomi & Partners factually).

**Optional (can be added post-launch; omitted cleanly until supplied)**
- Professional memberships (`profile.credentials.memberships`)
- Career history for 1987–2006 (`profile.careerInBrief.earlyCareer1987To2006`)
- Initial 2–3 Perspectives MDX articles (`content/perspectives/*.mdx`)
- Additional social links (`profile.otherSocials`)
