export const BADGE_SCRIPT_URL = "https://rapidact.eu/rapidact-badge.js";
export const BADGE_PREVIEW_URL = "https://rapidact.eu/badge-preview.html";

export type BadgeDisplay = "bubble" | "standard" | "popup" | "iframe";
export type BadgePlatform =
  | "wordpress"
  | "shopify"
  | "wix"
  | "html"
  | "react"
  | "nextjs"
  | "gtm"
  | "webflow";

type BadgeSnippetOptions = {
  platform: BadgePlatform;
  display: BadgeDisplay;
  language: string;
  message: string;
};

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function iframeUrl(language: string, message: string) {
  return `${BADGE_PREVIEW_URL}?embedded=1&display=standard&language=${encodeURIComponent(language)}&message=${encodeURIComponent(message)}`;
}

function iframeHtml(language: string, message: string) {
  return `<iframe
  src="${iframeUrl(language, message)}"
  title="AI use disclosure"
  loading="lazy"
  sandbox="allow-scripts allow-popups"
  style="width:100%;min-height:420px;border:0"
></iframe>`;
}

function iframeJsx(language: string, message: string) {
  return `<iframe
  src="${iframeUrl(language, message)}"
  title="AI use disclosure"
  loading="lazy"
  sandbox="allow-scripts allow-popups"
  style={{ width: "100%", minHeight: 420, border: 0 }}
/>`;
}

function htmlSnippet(
  display: Exclude<BadgeDisplay, "iframe">,
  language: string,
  message: string
) {
  const target =
    display === "standard" ? '<div id="rapidact-notice"></div>\n' : "";
  const targetAttribute =
    display === "standard" ? '\n  data-target="#rapidact-notice"' : "";

  return `${target}<script
  defer
  src="${BADGE_SCRIPT_URL}"
  data-display="${display}"${targetAttribute}
  data-language="${escapeAttribute(language)}"
  data-message="${escapeAttribute(message)}"
></script>`;
}

function reactSnippet(
  display: Exclude<BadgeDisplay, "iframe">,
  language: string,
  message: string,
  nextjs: boolean
) {
  const directive = nextjs ? '"use client";\n\n' : "";
  const target =
    display === "standard"
      ? '  return <div id="rapidact-notice" />;'
      : "  return null;";

  return `${directive}import { useEffect } from "react";

export function RapidActNotice() {
  useEffect(() => {
    if (document.getElementById("rapidact-install-script")) return;

    const script = document.createElement("script");
    script.id = "rapidact-install-script";
    script.src = "${BADGE_SCRIPT_URL}";
    script.defer = true;
    script.dataset.display = "${display}";
    script.dataset.language = "${language}";
    script.dataset.message = ${JSON.stringify(message)};
${display === "standard" ? '    script.dataset.target = "#rapidact-notice";\n' : ""}    document.body.appendChild(script);

    return () => {
      document.getElementById("rapidact-ai-disclosure")?.remove();
      script.remove();
    };
  }, []);

${target}
}`;
}

export function buildBadgeSnippet({
  platform,
  display,
  language,
  message,
}: BadgeSnippetOptions) {
  if (display === "iframe") {
    return platform === "react" || platform === "nextjs"
      ? iframeJsx(language, message)
      : iframeHtml(language, message);
  }

  if (platform === "react" || platform === "nextjs") {
    return reactSnippet(display, language, message, platform === "nextjs");
  }

  return htmlSnippet(display, language, message);
}
