/**
 * Contents of the AI Act Complete Pre-Consultory Report — the paid deliverable.
 * Shared by the homepage offer section and the /report intake page so the promise
 * made on the landing page and the promise made at checkout can never drift apart.
 */

export interface ReportChapter {
  n: string;
  title: string;
  text: string;
}

/** Short bullets — used in the checkout sidebar and CTA bands. */
export const REPORT_DELIVERABLES = [
  "Full written assessment of every AI system you operate, mapped to the exact EU AI Act articles that apply to it",
  "Risk classification per system: prohibited, high-risk, transparency-only, or out of scope",
  "Your Article 50 transparency duties stated per touchpoint — not as generic advice",
  "The exact disclosure wording for your case, and where each notice must appear",
  "The documentation and evidence you are expected to produce on request",
  "A prioritised action list with deadlines, separating what is urgent from what is not",
  "A professional contact assessment — a named specialist's read on your situation and what to do next",
];

/** Long-form chapters — used on the homepage offer section. */
export const REPORT_CHAPTERS: ReportChapter[] = [
  {
    n: "01",
    title: "Your AI inventory",
    text: "Every AI system you actually run — the chatbot, the generated copy, the voice agent, the scoring model, the tools your team quietly adopted — written down in one place. Most companies have never seen this list.",
  },
  {
    n: "02",
    title: "Risk classification per system",
    text: "Each system placed in its real category: prohibited, high-risk under Annex III, transparency-only under Article 50, or out of scope. This is the answer that determines everything else, and the one most companies get wrong.",
  },
  {
    n: "03",
    title: "What you must disclose, exactly",
    text: "Per touchpoint: what has to be said, where it has to appear, at what moment, and in which languages. Including the disclosure wording, written for your systems rather than copied from a template.",
  },
  {
    n: "04",
    title: "Your evidence position",
    text: "What a regulator, an enterprise client or an insurer can ask you to produce, what you can produce today, and the specific gap between those two. Documentation duties are where most exposure hides.",
  },
  {
    n: "05",
    title: "Prioritised action plan",
    text: "Everything you need to do, ordered by deadline and severity, with the items that are genuinely urgent separated from the items being sold to you as urgent.",
  },
  {
    n: "06",
    title: "Professional contact assessment",
    text: "A named specialist's direct read on your situation: where you stand, what we would do first, what needs a lawyer and what does not. You can reply to it and reach a human.",
  },
];

/** Objections buyers actually raise before paying €99 for an assessment. */
export const REPORT_FAQS = [
  {
    q: "What exactly am I paying €99 for?",
    a: "A complete written assessment of your company's position under the EU AI Act, prepared for your specific systems, plus a professional contact assessment from a named specialist. It works like a law firm's pre-consultation fee: you pay to have your case properly looked at, and you get a document you can act on, forward to your board, or hand to a lawyer. It is not a template and not an automated PDF.",
  },
  {
    q: "How do I know it will actually arrive?",
    a: "Because you get it within 24–48 hours or your money back in full, no questions asked. You receive a receipt with a VAT invoice and a reference code the moment you pay, and the report comes from a person whose email you can reply to. If the deadline passes with nothing in your inbox, one reply gets you refunded.",
  },
  {
    q: "We're a large company with a legal team. Is this useful to us?",
    a: "Usually more so, because the gap is wider. Legal teams know the regulation; what they typically lack is a written inventory of which AI systems the business actually runs and how each one classifies. That mapping is what the report delivers, in a form your counsel can work from directly.",
  },
  {
    q: "We're tiny. Do we even need this?",
    a: "Article 50 triggers on what your AI does, not on how big you are. A five-person shop with an AI chatbot on its checkout page carries the same disclosure duty as an enterprise — fine structures consider scale, obligations do not. If it turns out you have little exposure, the report says so plainly, and that answer in writing is worth having.",
  },
  {
    q: "Is this legal advice?",
    a: "No, and we will not pretend otherwise. RapidAct produces technical and organisational compliance assessments. Where your situation genuinely needs a legal opinion, the report says so and tells you precisely what to bring to counsel — which makes that conversation shorter and cheaper.",
  },
  {
    q: "Didn't the EU delay the AI Act to 2027?",
    a: "That was the high-risk rulebook — Annex III moved to December 2027, Annex I to August 2028. The Article 50 transparency obligations were deliberately left on schedule and apply from 2 August 2026. This 'two-clock' misreading is the most common and most expensive mistake we see right now.",
  },
  {
    q: "What happens after I get the report?",
    a: "Whatever you want. Many companies act on the action list themselves — the free scanner and the self-install disclosure layer on this site cover the technical part at no cost. Others reply to the assessment and have us handle the implementation. There is no subscription and no obligation either way.",
  },
  {
    q: "What data do you need, and what do you do with it?",
    a: "The intake form: your company, site, sector, size and which AI you use. We use it to prepare your report and nothing else — no reselling, no marketing lists. The free scanner fetches only the public HTML of a URL you submit.",
  },
];
