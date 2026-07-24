export interface RequirementGuide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  whoNeedsIt: string[];
  whatLawSays: string;
  deadline: string;
  freeSteps: string[];
  mistakes: string[];
}

export const REQUIREMENTS: RequirementGuide[] = [
  {
    slug: "chatbot-ai-disclosure",
    title: "Chatbot AI disclosure",
    metaTitle: "Chatbot AI disclosure under EU AI Act Article 50 — plain-English guide | RapidAct",
    metaDescription:
      "From 2 Aug 2026 your website chatbot must tell visitors they are talking to AI. Who it applies to, what the law says, and how to fix it free on WordPress, Wix or any stack.",
    h1: "Your chatbot must say it's an AI — here's exactly what that means",
    intro:
      "If your website has a chatbot, virtual assistant or AI support agent, EU law now requires it to introduce itself as an AI before the conversation starts. Not in the footer. Not in your terms. Right there, where the visitor sees it, at first contact.",
    whoNeedsIt: [
      "Online shops with a support chat widget (Tidio, Zendesk, Intercom, LiveChat, Smartsupp…)",
      "Businesses using AI assistants for bookings, quotes or appointments",
      "Anyone whose website answers visitor questions automatically",
      "Companies outside the EU whose site serves EU visitors — the law follows the audience, not your address",
    ],
    whatLawSays:
      "Article 50(1) of the EU AI Act (Regulation 2024/1689) says that people must be informed, clearly and in a way they can't miss, when they are interacting with an AI system. It applies from 2 August 2026 to companies of every size — there is no small-business exemption. Breaking it sits in the mid-tier of fines: up to €15 million or 3% of worldwide turnover, whichever is higher.",
    deadline: "2 August 2026 — already in force for new deployments.",
    freeSteps: [
      "Scan your site free — we detect which chatbot platform you run and whether a disclosure is already visible.",
      "Install the free RapidAct plugin (WordPress, Wix, or one script tag for anything else).",
      "The disclosure notice appears above your chat widget automatically, in English and Spanish.",
      "Turn on the evidence log so every disclosure view is timestamped — your proof if anyone ever asks.",
    ],
    mistakes: [
      "Thinking your chatbot vendor's label covers you — it doesn't. The duty sits with you, the site owner.",
      "Hiding the notice in a settings page or terms document — it must be visible at first contact.",
      "Assuming a 'human-sounding' bot name (like a person called Leia) is fine without disclosure — it's the exact thing the law targets.",
      "Believing the 2027 delay applies — that was the high-risk rulebook, not Article 50.",
    ],
  },
  {
    slug: "ai-content-labeling",
    title: "AI content labeling",
    metaTitle: "Labeling AI-generated text and images — EU AI Act guide for businesses | RapidAct",
    metaDescription:
      "AI-written articles and AI-generated images must be labeled under Article 50 from 2 Aug 2026. Plain-English guide: what's covered, the human-review exception, and free label templates.",
    h1: "AI-made images and text need a label — here's the simple version",
    intro:
      "If your business publishes AI-generated images, videos or articles, the EU AI Act requires them to be marked as AI-made. This covers marketing images, product photos with AI models, AI-written blog posts and news-style content.",
    whoNeedsIt: [
      "E-commerce stores using AI product photos or AI fashion models",
      "Marketing teams publishing AI-generated ad creatives or social images",
      "Publishers and blogs using AI to draft articles",
      "Agencies producing synthetic content for client brands",
    ],
    whatLawSays:
      "Article 50(2) and 50(4) require AI-generated content to be marked as artificially generated — visibly for deepfakes and public-interest text, and in machine-readable form for generative AI outputs. AI-written text on public-interest topics can skip the label only if a human editor genuinely reviewed it, changed it where needed, and takes editorial responsibility — a quick glance doesn't count.",
    deadline: "2 August 2026 for most duties; machine-readable marking for older systems by 2 December 2026.",
    freeSteps: [
      "List where AI content appears on your site: product images, banners, blog posts, videos.",
      "Download the free EU-standard AI label templates and icon set from RapidAct.",
      "Add the labels to AI-made assets — our pack places them automatically on WordPress.",
      "For AI-drafted text: either label it, or document the human editorial review properly.",
    ],
    mistakes: [
      "Thinking 'a human checked it' qualifies for the exemption — the review must be substantive and documented.",
      "Labeling only the obvious deepfakes — AI product photos count too.",
      "Assuming the AI tool's own watermark covers your publishing duty — platform labels don't replace yours.",
    ],
  },
  {
    slug: "deepfake-labeling",
    title: "Deepfake labeling",
    metaTitle: "Deepfake and synthetic media labeling — EU AI Act Article 50(4) guide | RapidAct",
    metaDescription:
      "Deepfakes and AI-altered photos, audio and video must be visibly labeled from 2 Aug 2026. What counts as a deepfake for a business, and how to label them correctly.",
    h1: "If it looks real but AI made it, it needs a visible label",
    intro:
      "Deepfakes aren't just celebrity scams. An AI-generated model wearing your clothes, an AI voiceover on your ad, a face swapped into your campaign video — all of these count as synthetic media under the EU AI Act, and all of them need a visible label.",
    whoNeedsIt: [
      "Fashion and retail brands using AI-generated models or virtual influencers",
      "Advertisers using AI voiceovers or AI-animated presenters",
      "Anyone publishing AI-edited photos or videos that could pass as real",
      "Social media teams running AI-generated campaign content",
    ],
    whatLawSays:
      "Article 50(4) requires deepfakes — AI-generated or AI-altered audio, image or video that resembles real people, places or events — to be disclosed visibly and clearly. For artistic or satirical work the label can be more discreet, but it can't be hidden. The duty applies to whoever publishes the content, including brands reposting AI-influencer content.",
    deadline: "2 August 2026.",
    freeSteps: [
      "Identify AI-made people, voices and scenes in your published content.",
      "Apply visible labels using the free EU-standard templates.",
      "If you work with AI influencers or agencies, add labeling duties to the contract.",
      "Keep a record of what was labeled and when — the evidence log does this for you.",
    ],
    mistakes: [
      "Believing 'everyone knows she's an AI influencer' counts as disclosure — profile-level mentions don't cover each piece of content.",
      "Forgetting that republishing someone else's AI content still makes you the publisher.",
      "Hiding the label in metadata only — deepfakes need a visible notice.",
    ],
  },
  {
    slug: "ai-disclosure-evidence",
    title: "Evidence & record-keeping",
    metaTitle: "Prove your AI disclosures happened — evidence logs for EU AI Act | RapidAct",
    metaDescription:
      "When a regulator or client asks you to prove AI disclosures, a screenshot isn't enough. How timestamped evidence logs work and how to set one up free.",
    h1: "The question won't be 'did you disclose?' — it'll be 'prove it'",
    intro:
      "Regulatory questions arrive months later, in writing: show that your AI disclosure was actually live, on this page, at this time. If your answer is a screenshot from last week, you're guessing. An evidence log answers it in one email.",
    whoNeedsIt: [
      "Any business that installed an AI disclosure and wants proof it stays live",
      "Agencies that must show clients the work was done and persists",
      "Companies in regulated sectors where documentation is already a habit",
      "Anyone whose compliance depends on a plugin nobody has checked since installing",
    ],
    whatLawSays:
      "Article 50 sets the disclosure duty; enforcement works through documentation. Market-surveillance authorities can ask deployers to demonstrate conformity, and fines consider whether you can show good-faith, documented effort. A timestamped, tamper-evident record of disclosure events is the practical way businesses show that.",
    deadline: "Evidence matters from the day your disclosure goes live — ideally before 2 August 2026.",
    freeSteps: [
      "Install the free RapidAct plugin — the evidence log is built in.",
      "Every time the disclosure appears for a visitor, the event is timestamped in your own database.",
      "Nothing personal is stored: event, page URL, time. No IPs, no cookies.",
      "Export the CSV whenever someone asks — that's the whole workflow.",
    ],
    mistakes: [
      "Keeping evidence on the vendor's side where you can't export it.",
      "Logging personal data you don't need — it creates a GDPR problem to solve an AI Act one.",
      "Installing the disclosure and never checking it again — logs also prove it stayed live.",
    ],
  },
];

export function getRequirement(slug: string): RequirementGuide | undefined {
  return REQUIREMENTS.find((r) => r.slug === slug);
}
