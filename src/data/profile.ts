export interface ExpertiseArea {
  title: string;
  eyebrow: string;
  description: string;
}

export interface CareerEntry {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface ProofFigure {
  value: string;
  label: string;
  detail: string;
}

export interface BriefingTopic {
  title: string;
  audience: string;
  summary: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ProfileConfig {
  /** Primary display name used in navigation, headings, titles, and share previews */
  displayName: string;
  /** LinkedIn / alternate spelling used in JSON-LD, meta description, About, and footer */
  alternateName: string;
  /** Job title for structured data and metadata */
  jobTitle: string;
  /** Direct contact email — set to a string when ready; omitted from UI when null */
  email: string | null;
  /** Path under /public (e.g. "/images/portrait.jpg") — omitted cleanly when null */
  portraitPath: string | null;
  portraitAlt: string;
  /** Secondary portrait path under /public — omitted cleanly when null */
  secondaryPortraitPath: string | null;
  secondaryPortraitAlt: string;
  /** Background portrait path for the About hero overlay */
  aboutBgPath: string | null;
  linkedinUrl: string;
  otherSocials: SocialLink[];
  siteUrl: string;
  seoDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    subline: string;
  };
  proofFigures: ProofFigure[];
  statement: {
    eyebrow: string;
    quote: string;
    attribution: string;
  };
  careerInBrief: {
    summary: string;
    /** Optional 1987–2006 career history — omitted from DOM when null */
    earlyCareer1987To2006: string | null;
  };
  about: {
    lead: string;
    paragraphs: string[];
    careerTimeline: CareerEntry[];
  };
  expertise: ExpertiseArea[];
  briefingTopics: BriefingTopic[];
  credentials: {
    education: string[];
    barCall: string;
    /** Professional memberships — omitted from DOM until supplied */
    memberships: string[];
  };
}

export const profile: ProfileConfig = {
  displayName: "Olufunke Hussain",
  alternateName: "Olufunke Hussain",
  jobTitle: "Corporate Governance Counsel & Company Secretary",
  email: null,
  portraitPath: "/images/portrait.jpg",
  portraitAlt:
    "Portrait of Olufunke Hussain, lawyer and corporate governance professional",
  secondaryPortraitPath: "/images/about-studio-clean.jpg",
  secondaryPortraitAlt:
    "Olufunke Hussain, Head of Company Secretarial Services",
  aboutBgPath: "/images/about-studio-clean.jpg",
  linkedinUrl: "https://www.linkedin.com/in/olufunke-hussain-a0690889/",
  otherSocials: [],
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://olufunkehussain.com",
  seoDescription:
    "Olufunke Hussain is a Nigerian lawyer, former listed-company Executive Director and Company Secretary, advising boards on corporate governance, regulatory compliance, and company secretarial practice.",
  hero: {
    eyebrow: "Lawyer · Corporate Governance · Company Secretarial Practice",
    headline: "Boardroom counsel shaped from both sides of the table.",
    subline:
      "Advising boards, chairs, and company secretaries of listed and regulated companies across Nigeria.",
  },
  proofFigures: [
    {
      value: "37+ yrs",
      label: "Legal & Governance Practice",
      detail: "Banking, telecoms, IT & advisory since 1987",
    },
    {
      value: "13+ yrs",
      label: "Listed-Company Secretary",
      detail: "NCR (Nigeria) Plc, 2006–2019",
    },
    {
      value: "2016–19",
      label: "Executive Director",
      detail: "Board seat alongside secretarial brief",
    },
  ],
  statement: {
    eyebrow: "Perspective",
    quote:
      "“I have advised boards from the company secretary’s desk and carried executive accountability at the board table itself. Effective governance is never paperwork for its own sake—it is the discipline that keeps a board defensible under scrutiny.”",
    attribution: "Olufunke Hussain",
  },
  careerInBrief: {
    summary:
      "Called to the Nigerian Bar in 1987 after earning her LLB at Obafemi Awolowo University (formerly University of Ife), she spent over thirteen years as Company Secretary of NCR (Nigeria) Plc (2006–2019), serving concurrently as an Executive Director from 2016 to 2019. Following her tenure as Managing Consultant at Synex Consult Ltd (2020–2023), she joined George Etomi & Partners in March 2023 as Head of Company Secretarial Services, leading GEP Nominees Limited.",
    earlyCareer1987To2006:
      "Across more than thirty-seven years at the Nigerian Bar, her career has spanned banking, financial services, telecommunications, legal consulting, and information technology—equipping her to advise boards across heavily regulated sectors.",
  },
  about: {
    lead: "A corporate governance practitioner whose perspective was formed inside a listed company boardroom before moving into specialist advisory practice.",
    paragraphs: [
      "Most governance advice is written from the outside looking in. Across more than thirty-seven years in legal advisory, company secretarial practice, and regulatory compliance, Olufunke Hussain has worked across banking, financial services, telecommunications, legal consulting, and information technology.",
      "At NCR (Nigeria) Plc, she served for over thirteen years as Company Secretary (2006–2019) and rose concurrently to Executive Director (2016–2019)—directing corporate governance structures, statutory compliance, board procedure, and investor relations for a publicly listed company.",
      "That dual experience—holding responsibility for board procedure and regulatory compliance while also carrying executive accountability at the board table—defines how she works with chairs, non-executive directors, general counsel, and company secretaries today.",
      "After leading Synex Consult Ltd as Managing Consultant between 2020 and 2023, she became Head of Company Secretarial Services at George Etomi & Partners in March 2023, where she also leads GEP Nominees Limited. Across listed entities, regulated financial institutions, and corporate groups, her focus remains consistent: clear board charters, disciplined statutory filings, and governance structures that hold up under regulatory scrutiny.",
    ],
    careerTimeline: [
      {
        role: "Head of Company Secretarial Services",
        organization: "George Etomi & Partners (GEP Nominees Limited)",
        period: "March 2023 – Present",
        description:
          "Heads company secretarial services and leads GEP Nominees Limited, advising corporate, listed, and regulated clients across banking, financial services, telecommunications, and technology.",
      },
      {
        role: "Managing Consultant",
        organization: "Synex Consult Ltd",
        period: "2020 – 2023",
        description:
          "Advised boards and executive leadership teams on governance architecture, statutory compliance, and corporate structuring.",
      },
      {
        role: "Executive Director",
        organization: "NCR (Nigeria) Plc",
        period: "2016 – 2019",
        description:
          "Served on the listed-company board with executive oversight alongside her statutory company secretarial mandate.",
      },
      {
        role: "Company Secretary",
        organization: "NCR (Nigeria) Plc",
        period: "2006 – 2019",
        description:
          "Directed board procedure, AGM compliance, investor relations, shareholder governance, and regulatory filings for over thirteen years.",
      },
    ],
  },
  expertise: [
    {
      eyebrow: "01 · Advisory",
      title: "Board governance and advisory",
      description:
        "Structuring board charters, committee mandates, and director induction so listed and regulated boards make defensible decisions with clear accountability.",
    },
    {
      eyebrow: "02 · Secretariat",
      title: "Company secretarial services",
      description:
        "Managing annual general meetings, board packs, minute-taking, and shareholder communications with the precision required of public company governance.",
    },
    {
      eyebrow: "03 · Compliance",
      title: "Regulatory compliance and filings",
      description:
        "Keeping statutory registers, CAC filings, and sector-specific governance disclosures aligned with CAMA 2020 and Nigerian capital market rules.",
    },
    {
      eyebrow: "04 · Transactions",
      title: "Corporate transactions and statutory obligations",
      description:
        "Guiding boards through restructurings, capital changes, and subsidiary governance where statutory formalities and commercial timelines intersect.",
    },
  ],
  briefingTopics: [
    {
      title: "Board Effectiveness & Charter Design",
      audience: "Chairs & Non-Executive Directors",
      summary:
        "Clarifying reserved matters, committee mandates, and annual board evaluation frameworks under Nigerian governance codes.",
    },
    {
      title: "CAMA 2020 & Statutory Compliance",
      audience: "Company Secretaries & General Counsel",
      summary:
        "Practical compliance routines for statutory registers, beneficial ownership filings, and regulatory reporting calendars.",
    },
    {
      title: "AGM Readiness & Shareholder Governance",
      audience: "Listed & Public Companies",
      summary:
        "Managing notice timelines, proxy administration, board Q&A preparation, and post-meeting regulatory filings.",
    },
    {
      title: "Subsidiary & Group Governance",
      audience: "Holding Companies & Regulated Groups",
      summary:
        "Aligning parent-board oversight with subsidiary autonomy, inter-company approvals, and local director duties.",
    },
  ],
  credentials: {
    education: [
      "LLB, Obafemi Awolowo University (formerly University of Ife, 1986)",
    ],
    barCall: "BL, Nigerian Law School — Called to the Nigerian Bar (1987)",
    memberships: [
      "Nigerian Bar Association (NBA)",
      "Institute of Directors Nigeria (IoD Nigeria)",
    ],
  },
};
