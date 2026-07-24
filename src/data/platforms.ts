export interface PlatformGuide {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  detectionNote: string;
  freeInstall: string[];
  commonWidgets: string[];
}

export const PLATFORMS: PlatformGuide[] = [
  {
    slug: "wordpress",
    name: "WordPress",
    metaTitle: "AI disclosure on WordPress — free plugin for EU AI Act Article 50 | RapidAct",
    metaDescription:
      "Add the EU AI Act chatbot disclosure to WordPress in minutes: free plugin detects Tidio, Zendesk, WPBot and 45+ more, shows the notice, keeps timestamped evidence.",
    h1: "AI disclosure on WordPress — install, checkbox, done",
    intro:
      "WordPress runs over 40% of the web, and most of those sites run a chat widget. If yours is one of them, the EU AI Act's disclosure duty lands on you on 2 August 2026. The free RapidAct plugin is the fastest way to cover it — no code, no developer.",
    detectionNote:
      "The plugin scans your active plugins, theme code and homepage against 52 known AI chat signatures — Tidio, Zendesk, Intercom, WPBot, LiveChat, Smartsupp, Chatbase and more — and shows you exactly what it found and where.",
    freeInstall: [
      "In wp-admin, go to Plugins → Add New → search RapidAct (or upload the zip).",
      "Activate, then open RapidAct → AI Systems and click 'Scan my homepage'.",
      "If AI systems are found, the visitor disclosure is already on — adjust text and position in Settings.",
      "Open the Evidence tab to see disclosure events logged with timestamps.",
    ],
    commonWidgets: ["Tidio (Lyro AI)", "WPBot", "Zendesk", "LiveChat / ChatBot.com", "Smartsupp", "Chatbase", "JivoChat"],
  },
  {
    slug: "wix",
    name: "Wix",
    metaTitle: "AI disclosure on Wix — EU AI Act Article 50 setup guide | RapidAct",
    metaDescription:
      "Wix sites with chat (Wix Chat, Tidio, custom AI apps) need an AI disclosure from 2 Aug 2026. Free setup: add the RapidAct snippet via Wix custom code — step by step.",
    h1: "AI disclosure on Wix — five minutes via custom code",
    intro:
      "Wix sites often run Wix Chat, Tidio, or AI apps from the Wix market. Under the EU AI Act, the disclosure duty belongs to the site owner — not to Wix or the app. Adding it takes one paste in your Wix dashboard.",
    detectionNote:
      "Run the free scan first: it checks your published Wix site for known chat widgets and shows whether any disclosure is already visible. Wix renders widgets client-side, so the scan reads what your visitors actually receive.",
    freeInstall: [
      "In your Wix dashboard, go to Settings → Custom Code.",
      "Paste the RapidAct snippet before the closing body tag, apply to all pages.",
      "Publish — the AI notice now appears above your chat widget, EN/ES automatic.",
      "Optional: enable the evidence endpoint to keep timestamped proof.",
    ],
    commonWidgets: ["Wix Chat (AI)", "Tidio", "Chatbase", "Custom GPT apps"],
  },
  {
    slug: "shopify",
    name: "Shopify",
    metaTitle: "AI disclosure on Shopify — EU AI Act Article 50 for online stores | RapidAct",
    metaDescription:
      "Shopify stores with AI chat (Tidio, Gorgias, Willdesk, Rep AI) must disclose AI interaction from 2 Aug 2026. Free install via theme app block or one script tag.",
    h1: "AI disclosure on Shopify — one block, zero theme edits",
    intro:
      "If your store chats with shoppers through an AI assistant — or your product photos are AI-generated — Article 50 applies to you on 2 August 2026. The RapidAct theme app extension adds the disclosure without touching your theme code.",
    detectionNote:
      "The free scan checks your storefront for the usual Shopify AI apps — Tidio, Gorgias, Willdesk, Chatty, Rep AI — and flags any AI-generated imagery workflow worth labeling.",
    freeInstall: [
      "Install the RapidAct app from the Shopify App Store (or ask us to).",
      "In Online Store → Customize → App embeds, toggle RapidAct AI Disclosure on.",
      "Choose position and language — save. The notice now covers your chat apps.",
      "For AI product photos: apply the free label templates from your RapidAct dashboard.",
    ],
    commonWidgets: ["Tidio (Lyro)", "Gorgias AI Agent", "Willdesk", "Chatty", "Rep AI"],
  },
  {
    slug: "tidio",
    name: "Tidio",
    metaTitle: "Tidio & Lyro AI disclosure — Article 50 compliance for Tidio users | RapidAct",
    metaDescription:
      "Using Tidio or Lyro AI on your site? Article 50 puts the AI-disclosure duty on you, not Tidio. What Lyro users must add and how to do it free.",
    h1: "You use Tidio. The AI disclosure duty is yours — not Tidio's.",
    intro:
      "Tidio is one of the most-installed chat widgets in Europe, and its Lyro AI answers visitors automatically. That makes your site exactly what Article 50(1) was written for: visitors must be told they're talking to AI before the conversation starts.",
    detectionNote:
      "Tidio appears in over 74,000 sites we can fingerprint by its loader script. Our scan finds it in seconds and checks whether any AI disclosure is visible near the widget.",
    freeInstall: [
      "Keep Tidio exactly as it is — you don't need to change vendors.",
      "Install the free RapidAct plugin or snippet on your site.",
      "The disclosure notice renders above the Tidio launcher and inside the first interaction zone.",
      "Enable the evidence log so every notice view is timestamped.",
    ],
    commonWidgets: ["Tidio live chat", "Lyro AI agent", "Tidio flows (automated replies)"],
  },
  {
    slug: "botpress",
    name: "Botpress",
    metaTitle: "Botpress AI agent disclosure — Article 50 compliance guide | RapidAct",
    metaDescription:
      "Botpress-built AI agents on your website need a visible AI disclosure from 2 Aug 2026. How to add it without rebuilding your bot — free snippet + evidence log.",
    h1: "Your Botpress agent chats like a person. The law wants it to admit it's AI.",
    intro:
      "Botpress builds capable AI agents that hold real conversations — which is precisely the case Article 50 cares about. The more human your bot sounds, the more important the disclosure becomes.",
    detectionNote:
      "Botpress webchat embeds load from botpress.cloud — our signature database fingerprints them along with 50+ other platforms and checks for visible disclosure wording.",
    freeInstall: [
      "Add the RapidAct snippet to the pages where your Botpress webchat loads.",
      "The notice appears before the first message — you can also set it as the bot's greeting text.",
      "Keep the evidence log on: it timestamps every disclosure view for your records.",
    ],
    commonWidgets: ["Botpress Webchat", "Custom GPT-based agents", "Voiceflow bots (similar setup)"],
  },
  {
    slug: "custom-website",
    name: "Any website",
    metaTitle: "AI disclosure for any website — one script tag, EU AI Act ready | RapidAct",
    metaDescription:
      "No WordPress, no Wix? One script tag adds the Article 50 AI disclosure to any website — Webflow, Squarespace, custom stacks. Free, EN/ES, with evidence options.",
    h1: "Any stack, one script tag, disclosure done",
    intro:
      "Custom site, Webflow, Squarespace, a React app your agency built — it doesn't matter. If an AI system talks to your visitors, the disclosure duty is yours, and the fix is one line of code you can paste yourself.",
    detectionNote:
      "The free scan reads your public HTML for 52 AI chat signatures. If your AI is fully custom, the scan won't name it — but your developers know it's there, and the disclosure works the same way.",
    freeInstall: [
      "Copy the RapidAct snippet from the guide page.",
      "Paste it before the closing body tag of your pages (or in your tag manager).",
      "Configure text, position and language in one config object — EN/ES included.",
      "Point the evidence endpoint at your own logging URL if you want timestamped proof.",
    ],
    commonWidgets: ["Custom GPT assistants", "Intercom Fin", "Drift", "HubSpot chat", "Voice AI widgets"],
  },
];

export function getPlatform(slug: string): PlatformGuide | undefined {
  return PLATFORMS.find((p) => p.slug === slug);
}
