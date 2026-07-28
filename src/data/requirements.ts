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
    metaTitle:
      "Chatbot AI disclosure under EU AI Act Article 50 — plain-English guide | RapidAct",
    metaDescription:
      "Article 50(1) requires providers of direct-interaction AI systems to inform people they are interacting with AI. Check your role and add a clear notice.",
    h1: "When your chatbot must say it is AI",
    intro:
      "Article 50(1) places the direct-interaction notice on providers of AI systems intended to interact directly with people. A site owner may also be the provider — for example when offering an own-brand assistant — but embedding a third-party tool does not automatically settle the role question.",
    whoNeedsIt: [
      "Providers offering an AI chatbot or assistant directly to people in the EU",
      "Businesses offering an own-brand AI assistant for bookings, quotes or support",
      "Teams that materially modify or relabel a third-party AI system under their own name",
      "Non-EU providers whose system or output is placed or used in the EU",
    ],
    whatLawSays:
      "Article 50(1) of Regulation (EU) 2024/1689 requires providers to design direct-interaction AI systems so people are informed they are interacting with AI, unless that is obvious to a reasonably well-informed, observant and circumspect person. The information must be clear, distinguishable and accessible at the latest at first interaction. Article 99 sets a maximum fine of €15 million or 3% of worldwide annual turnover, subject to proportionality and the specific case.",
    deadline: "2 August 2026.",
    freeSteps: [
      "Scan the rendered public website to record visible AI interactions, disclosure wording and exact source URLs.",
      "Confirm who is the provider, who is the deployer and whether an exception applies.",
      "Install the free one-script RapidAct badge and tailor the wording to the actual system.",
      "Verify the live desktop and mobile experience before the first interaction, then record the URL, wording, owner and verification date.",
    ],
    mistakes: [
      "Assuming the website owner is always the provider — establish the contractual and product role.",
      "Hiding the notice in a settings page or terms document — it must be visible at first contact.",
      "Assuming a human-sounding bot name makes the AI interaction obvious.",
      "Believing the 2027 high-risk-system delay also moves Article 50's transparency date.",
    ],
  },
  {
    slug: "ai-content-labeling",
    title: "AI content labeling",
    metaTitle:
      "Labeling AI-generated text and images — EU AI Act guide for businesses | RapidAct",
    metaDescription:
      "Article 50 has separate machine-readable marking and visible-disclosure duties for synthetic content. Learn who must do what and when.",
    h1: "AI content marking has two different duties",
    intro:
      "Article 50 does not impose one blanket visible label on every AI-assisted asset. Providers of generative AI have a machine-readable marking duty, while deployers have visible disclosure duties for deepfakes and certain public-interest text.",
    whoNeedsIt: [
      "Providers of AI systems that generate synthetic audio, image, video or text",
      "Deployers publishing deepfake audio, images or video",
      "Deployers publishing AI-generated or manipulated text to inform the public on matters of public interest",
      "Teams publishing synthetic media that realistically depicts people, places, entities or events",
    ],
    whatLawSays:
      "Article 50(2) requires providers of generative AI systems to mark outputs in a machine-readable format and make them detectable as artificially generated or manipulated, where technically feasible. Article 50(4) separately requires deployers to disclose deepfake content and AI-generated or manipulated public-interest text. The text duty has an exception where human review or editorial control exists and a person holds editorial responsibility.",
    deadline:
      "2 August 2026; Article 50(2) systems placed on the market before then have a transition until 2 December 2026.",
    freeSteps: [
      "Inventory synthetic audio, image, video and text by system, publishing channel and audience.",
      "Separate the provider's machine-readable marking duty from the deployer's visible-disclosure duty.",
      "Use the Commission's published code-of-practice materials and icons where they fit your case.",
      "Record any human-review or editorial-responsibility basis you rely on for public-interest text.",
    ],
    mistakes: [
      "Treating the machine-readable provider duty and visible deployer duty as the same obligation.",
      "Calling every AI-assisted marketing image a deepfake without checking the statutory definition.",
      "Assuming a platform watermark always satisfies the information, accessibility and timing requirements.",
    ],
  },
  {
    slug: "deepfake-labeling",
    title: "Deepfake labeling",
    metaTitle:
      "Deepfake and synthetic media labeling — EU AI Act Article 50(4) guide | RapidAct",
    metaDescription:
      "Deepfakes and AI-altered photos, audio and video must be visibly disclosed from 2 Aug 2026. Learn what counts and how to disclose it.",
    h1: "If synthetic media looks real, check the deepfake duty",
    intro:
      "Deepfakes are AI-generated or manipulated image, audio or video content that resembles existing people, objects, places, entities or events and would falsely appear authentic or truthful. The definition is narrower than anything made with AI.",
    whoNeedsIt: [
      "Fashion and retail brands using synthetic models that resemble real people",
      "Advertisers using AI voices or presenters that could be mistaken for authentic recordings",
      "Teams publishing face swaps or realistic AI-altered scenes",
      "Deployers publishing third-party deepfake media through their own channels",
    ],
    whatLawSays:
      "Article 50(4) requires deployers using an AI system to generate or manipulate deepfake audio, image or video to disclose that the content was artificially generated or manipulated. For evidently artistic, creative, satirical, fictional or analogous work, disclosure must still be appropriate and cannot hamper display or enjoyment of the work.",
    deadline: "2 August 2026.",
    freeSteps: [
      "Identify AI-generated or manipulated people, voices, objects, places and events.",
      "Check whether each asset meets the Act's deepfake definition rather than applying a blanket rule.",
      "Apply a clear, distinguishable and accessible disclosure at the latest on first exposure.",
      "Record the asset, wording, channel, owner and publication date in your implementation file.",
    ],
    mistakes: [
      "Believing profile-level wording automatically covers each separately published asset.",
      "Ignoring republished synthetic media because another party generated it.",
      "Relying only on hidden metadata where Article 50(4) calls for disclosure to people.",
    ],
  },
  {
    slug: "ai-disclosure-evidence",
    title: "Evidence & record-keeping",
    metaTitle: "Build an AI disclosure evidence pack | RapidAct",
    metaDescription:
      "Build a practical AI-transparency evidence pack with live URLs, screenshots, wording, ownership, change history and periodic verification.",
    h1: "Keep practical proof of what you disclosed",
    intro:
      "Article 50 sets transparency duties; it does not prescribe a RapidAct event log. A compact implementation record is still useful for governance, client assurance and demonstrating what was live, where and when.",
    whoNeedsIt: [
      "Providers and deployers that have implemented an Article 50 disclosure",
      "Agencies that need to hand over verifiable implementation details",
      "Companies that operate the same disclosure across several sites or products",
      "Teams that need owners and review dates when UI or AI vendors change",
    ],
    whatLawSays:
      "Article 50 defines the disclosure outcome, while the Act's enforcement framework and general governance practice make traceable implementation records useful. Your evidence should not claim more than it proves: a screenshot proves one rendered state, not continuous availability.",
    deadline:
      "Start the record when the disclosure is published and re-check it after material UI, vendor or wording changes.",
    freeSteps: [
      "Record the AI system, provider/deployer roles, affected pages and approved wording.",
      "Capture the live desktop and mobile disclosure at first interaction with a date and URL.",
      "Assign an owner and next review date, and preserve relevant code or configuration changes.",
      "Re-test after releases and keep only the minimum evidence needed — no visitor tracking is required.",
    ],
    mistakes: [
      "Claiming continuous compliance from a single screenshot.",
      "Collecting visitor identifiers when a configuration record and periodic rendered proof are enough.",
      "Installing the disclosure and never checking it again after UI or vendor changes.",
    ],
  },
];

export function getRequirement(slug: string): RequirementGuide | undefined {
  return REQUIREMENTS.find(r => r.slug === slug);
}
