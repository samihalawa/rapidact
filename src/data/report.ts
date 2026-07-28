/**
 * Contents of the EU AI Act Company Assessment, the paid deliverable.
 * Shared by the homepage offer section and the /report intake page so the promise
 * made on the landing page and the promise made at checkout can never drift apart.
 */

export interface ReportChapter {
  n: string;
  title: string;
  text: string;
}

/** Short bullets, used in the checkout sidebar and CTA bands. */
export const REPORT_DELIVERABLES = [
  "A written inventory of the AI systems your company operates",
  "Risk classification per system: prohibited, high-risk, transparency-only, or out of scope",
  "Applicable Article 50 duties for each customer or employee touchpoint",
  "Recommended disclosure wording and placement",
  "The records and evidence your company should retain",
  "A prioritised action plan with owners and deadlines",
  "Follow-up questions with the specialist who prepared the assessment",
];

/** Long-form chapters, used on the homepage offer section. */
export const REPORT_CHAPTERS: ReportChapter[] = [
  {
    n: "01",
    title: "Your AI inventory",
    text: "A single inventory of the AI systems your company operates, including customer-facing tools, internal systems and third-party services.",
  },
  {
    n: "02",
    title: "Risk classification per system",
    text: "Each system mapped to its relevant category: prohibited, high-risk under Annex III, transparency-only under Article 50, or out of scope.",
  },
  {
    n: "03",
    title: "What you must disclose, exactly",
    text: "For each relevant touchpoint: what to disclose, where to place the notice, when people must see it and which languages to use.",
  },
  {
    n: "04",
    title: "Your evidence position",
    text: "The records a regulator, enterprise client or insurer may request, the evidence available today and the gaps to close.",
  },
  {
    n: "05",
    title: "Prioritised action plan",
    text: "Required actions ordered by urgency and impact, with clear owners, dependencies and target dates.",
  },
  {
    n: "06",
    title: "Specialist review",
    text: "A named specialist's conclusion on your current position, the first action to take and any point that should be referred to legal counsel.",
  },
];

/** Objections buyers actually raise before paying €99 for an assessment. */
export const REPORT_FAQS = [
  {
    q: "What exactly am I paying €99 for?",
    a: "A company-specific written assessment: AI inventory, risk classification, Article 50 duties, disclosure wording, evidence gaps and a prioritised action plan. A specialist reviews it before delivery. It is not a generic template.",
  },
  {
    q: "How do I know it will actually arrive?",
    a: "You receive a payment reference and receipt. The assessment is delivered to your work email within 24–48 hours. If it does not arrive in that window, reply to the receipt for a full refund. The seller's registered company details are published and linked to Companies House.",
  },
  {
    q: "Can our legal team use it?",
    a: "Yes. The assessment gives counsel a structured inventory, system classifications, evidence gaps and implementation questions they can review directly.",
  },
  {
    q: "Does company size matter?",
    a: "The applicable duty depends primarily on what each system does and your role. Company size is relevant to proportionality and penalties. If your exposure is limited, the assessment states that clearly.",
  },
  {
    q: "Is this legal advice?",
    a: "No. RapidAct provides a technical and organisational assessment. Where a legal opinion is needed, the document identifies the question and the evidence to take to counsel.",
  },
  {
    q: "Didn't the EU delay the AI Act to 2027?",
    a: "The revised timeline moved parts of the high-risk framework. Article 50 transparency duties still apply from 2 August 2026. A limited transition applies to some provider-side machine-readable marking duties for systems already on the market; it is not a general Article 50 delay.",
  },
  {
    q: "What happens after I get the report?",
    a: "Use the action plan internally, send it to counsel, or ask RapidAct to support implementation. There is no subscription or follow-on obligation.",
  },
  {
    q: "What data do you need, and what do you do with it?",
    a: "The intake form: your company, site, sector, size and which AI you use. We use it to prepare your report and for nothing else. It is never resold or added to a marketing list. The free scanner uses a remote browser to inspect only the submitted public website and up to two relevant same-origin public pages.",
  },
];
