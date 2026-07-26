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
    metaTitle:
      "AI disclosure on WordPress — one-script Article 50 notice | RapidAct",
    metaDescription:
      "Add a clear AI-interaction notice to WordPress in minutes with one RapidAct script. No account, cookies or tracking.",
    h1: "AI disclosure on WordPress — paste one script",
    intro:
      "If you provide an AI assistant under your own service or brand, Article 50(1) may require a clear notice before the first interaction. The free RapidAct notice gives you that visible technical layer without replacing the role and scope assessment.",
    detectionNote:
      "Run the free website scan first. It checks the public page against 52 known AI-chat signatures and reports whether disclosure wording is visible. It cannot inspect private plugins, custom back-office AI or your contractual role.",
    freeInstall: [
      "Open the AI notice installer and copy the production script.",
      "In WordPress, add it through your theme's header/footer custom-code field or a trusted custom-code plugin.",
      "Paste it before the closing body tag, edit the title and message for your actual AI system, then publish.",
      "Open the live page in a private window and verify the notice is visible before a visitor starts the AI interaction.",
    ],
    commonWidgets: [
      "Tidio (Lyro AI)",
      "WPBot",
      "Zendesk",
      "LiveChat / ChatBot.com",
      "Smartsupp",
      "Chatbase",
      "JivoChat",
    ],
  },
  {
    slug: "wix",
    name: "Wix",
    metaTitle:
      "AI disclosure on Wix — EU AI Act Article 50 setup guide | RapidAct",
    metaDescription:
      "Wix sites with chat (Wix Chat, Tidio, custom AI apps) need an AI disclosure from 2 Aug 2026. Free setup: add the RapidAct snippet via Wix custom code — step by step.",
    h1: "AI disclosure on Wix — five minutes via custom code",
    intro:
      "Wix sites often run Wix Chat, Tidio or another AI app. Your exact duty depends on whether you are the provider or deployer and what the system does. Where a direct-interaction notice is required, the RapidAct notice takes one paste in your Wix dashboard.",
    detectionNote:
      "Run the free scan first: it checks your published Wix site for known chat widgets and shows whether any disclosure is already visible. Wix renders widgets client-side, so the scan reads what your visitors actually receive.",
    freeInstall: [
      "Open the AI notice installer and copy the production script.",
      "In your Wix dashboard, go to Settings → Custom Code and add it to the pages that contain the AI experience.",
      "Place it at the end of the body, edit the title and message for the system your visitors meet, then publish.",
      "Open the published page in a private window and verify the notice appears before the first AI interaction.",
    ],
    commonWidgets: ["Wix Chat (AI)", "Tidio", "Chatbase", "Custom GPT apps"],
  },
  {
    slug: "shopify",
    name: "Shopify",
    metaTitle:
      "AI disclosure on Shopify — EU AI Act Article 50 for online stores | RapidAct",
    metaDescription:
      "Add a clear AI-interaction notice to Shopify with one RapidAct script, including theme.liquid and live-store verification steps.",
    h1: "AI disclosure on Shopify — one script in your theme",
    intro:
      "If your store provides an AI shopping or support assistant, you may need a clear direct-interaction notice. AI-generated content has separate rules, so first classify the system and your role; use the notice where it fits.",
    detectionNote:
      "The free scan checks the public storefront for common Shopify AI-chat signatures and visible disclosure wording. It cannot determine whether a product image was generated or materially altered by AI.",
    freeInstall: [
      "Open the AI notice installer and copy the production script.",
      "In Shopify, go to Online Store → Themes → Edit code and open theme.liquid.",
      "Paste the script immediately before the closing body tag, edit its message, save and publish.",
      "Open the storefront in a private window and verify the disclosure is visible before the first AI interaction.",
    ],
    commonWidgets: [
      "Tidio (Lyro)",
      "Gorgias AI Agent",
      "Willdesk",
      "Chatty",
      "Rep AI",
    ],
  },
  {
    slug: "tidio",
    name: "Tidio",
    metaTitle:
      "Tidio & Lyro AI disclosure — Article 50 compliance for Tidio users | RapidAct",
    metaDescription:
      "Using Tidio or Lyro AI? Learn when an Article 50 interaction notice may be needed and add a free, configurable notice without changing chat vendors.",
    h1: "Add a clear AI notice alongside Tidio or Lyro",
    intro:
      "Lyro can answer visitors automatically. Article 50(1) places the direct-interaction notice on the AI-system provider, while deployers have distinct duties in other Article 50 cases. Establish your role first, then make the notice clear before the first automated exchange.",
    detectionNote:
      "The free scan recognizes Tidio's public loader and checks whether AI-disclosure wording is visible on the page. A technical match does not by itself determine your legal role or full set of duties.",
    freeInstall: [
      "Keep Tidio exactly as it is — you don't need to change vendors.",
      "Open the RapidAct notice installer and copy the production script.",
      "Paste it into the same site template that loads Tidio and name the AI assistant in the message.",
      "Publish, then verify in a private window that the disclosure is visible before the visitor starts chatting.",
    ],
    commonWidgets: [
      "Tidio live chat",
      "Lyro AI agent",
      "Tidio flows (automated replies)",
    ],
  },
  {
    slug: "botpress",
    name: "Botpress",
    metaTitle:
      "Botpress AI agent disclosure — Article 50 compliance guide | RapidAct",
    metaDescription:
      "Add a visible AI-interaction notice to a Botpress webchat without rebuilding the bot. One free script and practical verification steps.",
    h1: "Give your Botpress agent a clear AI identity",
    intro:
      "Botpress agents can hold natural conversations, so visitors may not know they are interacting with AI. If you are the provider responsible for the direct-interaction notice, disclose that fact before the exchange starts and keep the wording specific to the system.",
    detectionNote:
      "Botpress webchat embeds load from botpress.cloud — our signature database fingerprints them along with 50+ other platforms and checks for visible disclosure wording.",
    freeInstall: [
      "Open the RapidAct notice installer and copy the production script.",
      "Add it to every page where the Botpress webchat loads and customize the title and message.",
      "Also consider repeating the notice in the bot's first message, then verify both surfaces in a private window.",
    ],
    commonWidgets: [
      "Botpress Webchat",
      "Custom GPT-based agents",
      "Voiceflow bots (similar setup)",
    ],
  },
  {
    slug: "custom-website",
    name: "Any website",
    metaTitle:
      "AI disclosure for any website — one script tag, EU AI Act ready | RapidAct",
    metaDescription:
      "No WordPress, no Wix? One script tag adds the Article 50 AI disclosure to any website — Webflow, Squarespace, custom stacks. Free, EN/ES, with evidence options.",
    h1: "Any stack, one script tag, disclosure done",
    intro:
      "Custom site, Webflow, Squarespace or a React app: the technical installation is the same. First establish whether Article 50 requires a direct-interaction notice for your role and system; if it does, the notice is one script you can paste yourself.",
    detectionNote:
      "The free scan reads your public HTML for 52 AI chat signatures. If your AI is fully custom, the scan won't name it — but your developers know it's there, and the disclosure works the same way.",
    freeInstall: [
      "Copy the RapidAct snippet from the guide page.",
      "Paste it before the closing body tag of your pages (or in your tag manager).",
      "Set the title, message, provider, details URL, position and accent color with data attributes.",
      "Publish and verify the real page, at desktop and mobile widths, before relying on it.",
    ],
    commonWidgets: [
      "Custom GPT assistants",
      "Intercom Fin",
      "Drift",
      "HubSpot chat",
      "Voice AI widgets",
    ],
  },
];

export function getPlatform(slug: string): PlatformGuide | undefined {
  return PLATFORMS.find(p => p.slug === slug);
}
