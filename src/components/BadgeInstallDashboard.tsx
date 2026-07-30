import { useMemo, useState, type ComponentType } from "react";
import {
  AppWindow,
  BadgeCheck,
  Blocks,
  Braces,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Frame,
  LayoutPanelTop,
  MessageSquareMore,
  PanelsTopLeft,
  ShoppingBag,
  Tag,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { INSTALLER_COPY } from "@/data/badgeInstaller";
import {
  buildBadgeSnippet,
  type BadgeDisplay,
  type BadgePlatform,
} from "@/lib/badgeInstaller";
import { track } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import type { GuideCopy } from "@/data/localizedGuide";

type PlatformOption = {
  id: BadgePlatform;
  name: string;
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
};

const platforms: PlatformOption[] = [
  {
    id: "wordpress",
    name: "WordPress",
    icon: PanelsTopLeft,
  },
  {
    id: "shopify",
    name: "Shopify",
    icon: ShoppingBag,
  },
  {
    id: "wix",
    name: "Wix",
    icon: Blocks,
  },
  {
    id: "html",
    name: "HTML & JavaScript",
    icon: Code2,
  },
  {
    id: "react",
    name: "React",
    icon: Braces,
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: AppWindow,
  },
  {
    id: "gtm",
    name: "Google Tag Manager",
    icon: Tag,
  },
  {
    id: "webflow",
    name: "Webflow",
    icon: LayoutPanelTop,
  },
];

const displayIcons: Record<
  BadgeDisplay,
  ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>
> = {
  bubble: MessageSquareMore,
  standard: PanelsTopLeft,
  popup: AppWindow,
  iframe: Frame,
};

const displayOrder: BadgeDisplay[] = ["bubble", "standard", "popup", "iframe"];
const WIX_INSTALL_URL = "https://wix.to/JKi80ih";

function HighlightedCode({ code }: { code: string }) {
  const tokens = code.split(
    /(\/\/[^\n]*|["'`][^"'`\n]*["'`]|<\/?[a-z][^>]*>|(?:import|from|export|function|return|const|if|new|true|false|null)\b)/g
  );

  return (
    <code>
      {tokens.map((token, index) => {
        const className = token.startsWith("//")
          ? "text-[#8da2c6]"
          : /^["'`]/.test(token)
            ? "text-[#75e2ff]"
            : /^<\/?[a-z]/.test(token)
              ? "text-[#8fbdff]"
              : /^(import|from|export|function|return|const|if|new|true|false|null)$/.test(
                    token
                  )
                ? "text-[#d7a7ff]"
                : "text-white/85";
        return (
          <span key={`${index}-${token.slice(0, 8)}`} className={className}>
            {token}
          </span>
        );
      })}
    </code>
  );
}

export default function BadgeInstallDashboard({
  guideCopy,
}: {
  guideCopy: GuideCopy;
}) {
  const { lang } = useI18n();
  const copy = INSTALLER_COPY[lang];
  const [selected, setSelected] = useState<PlatformOption | null>(null);
  const [display, setDisplay] = useState<BadgeDisplay>("bubble");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );
  const snippet = useMemo(
    () =>
      selected
        ? buildBadgeSnippet({
            platform: selected.id,
            display,
            language: lang,
            message: guideCopy.noticeMessage,
          })
        : "",
    [display, guideCopy.noticeMessage, lang, selected]
  );

  const previewUrl = useMemo(() => {
    const params = new URLSearchParams({
      display: display === "iframe" ? "standard" : display,
      language: lang,
      message: guideCopy.noticeMessage,
      embedded: "1",
    });
    return `/badge-preview.html?${params.toString()}`;
  }, [display, guideCopy.noticeMessage, lang]);

  const selectPlatform = (platform: PlatformOption) => {
    setSelected(platform);
    setDisplay("bubble");
    setCopyStatus("idle");
    track("badge_installer_platform_selected", { platform: platform.id });
  };

  const copySnippet = async () => {
    if (!selected) return;
    let didCopy = false;
    try {
      await navigator.clipboard.writeText(snippet);
      didCopy = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = snippet;
      textarea.readOnly = true;
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.width = "1px";
      textarea.style.height = "1px";
      textarea.style.opacity = "0.01";
      document.body.appendChild(textarea);
      try {
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        didCopy = document.execCommand("copy");
      } catch {
        didCopy = false;
      } finally {
        textarea.remove();
      }
    }
    if (!didCopy) {
      setCopyStatus("failed");
      track("badge_installer_copy_failed", {
        installer: selected.id,
        display,
      });
      return;
    }
    track("badge_installer_copy", {
      installer: selected.id,
      display,
    });
    setCopyStatus("copied");
    window.setTimeout(() => setCopyStatus("idle"), 2500);
  };

  const trackWordpressDownload = () => {
    track("badge_installer_download_clicked", {
      installer: "wordpress",
      package_format: "zip",
      package_version: "1.0.0",
    });
  };

  const trackWixInstall = () => {
    track("badge_installer_marketplace_clicked", {
      installer: "wix",
      marketplace: "wix",
    });
  };

  return (
    <>
      <section
        id="install"
        className="relative left-1/2 mt-10 w-[calc(100vw-2rem)] max-w-6xl -translate-x-1/2 scroll-mt-28 border border-[#cbd8ec] bg-[#f7f7f5] p-4 sm:w-[calc(100vw-3rem)] sm:p-7 lg:p-9"
      >
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <p className="eyebrow text-[#174a9b]">{guideCopy.installLabel}</p>
            <h2 className="mt-2 max-w-xl text-2xl font-bold tracking-tight text-[#16181d] sm:text-3xl">
              {guideCopy.installTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#5c6370]">
              {guideCopy.installBody}
            </p>
          </div>
          <div className="grid grid-cols-3 border border-[#d8d8d2] bg-white">
            {[
              ["01", copy.choosePlatform],
              ["02", copy.chooseSetup],
              ["03", copy.installAndVerify],
            ].map(([number, label]) => (
              <div
                key={number}
                className="min-w-0 border-r border-[#e2e2dd] p-3 last:border-r-0 sm:p-4"
              >
                <span className="mono text-[10px] font-bold text-[#174a9b]">
                  {number}
                </span>
                <p className="mt-1 text-[11px] leading-snug font-bold text-[#16181d] sm:text-[13px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4 border-t border-[#d8d8d2] pt-6">
          <div>
            <h3 className="text-xl font-bold text-[#16181d]">
              {copy.choosePlatform}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#5c6370]">
              {copy.choosePlatformBody}
            </p>
          </div>
          <BadgeCheck
            className="hidden h-7 w-7 shrink-0 text-[#174a9b] sm:block"
            aria-hidden="true"
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
          {platforms.map(platform => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => selectPlatform(platform)}
                className="group min-h-32 border border-[#d8d8d2] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#174a9b] hover:shadow-[0_10px_28px_rgba(3,18,61,0.1)] focus-visible:ring-2 focus-visible:ring-[#174a9b] focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-36 sm:p-5"
                aria-label={`${copy.installOn} ${platform.name}`}
                data-testid={`installer-platform-${platform.id}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center border border-[#b9d8ff] bg-[#eef6ff] text-[#174a9b]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mono text-[9px] font-bold tracking-[0.08em] text-[#6b7280] uppercase">
                    {platform.id === "wordpress"
                      ? copy.pluginAndCode
                      : platform.id === "wix"
                        ? copy.officialWixApp
                        : copy.direct}
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-tight font-bold text-[#16181d] sm:text-base">
                  {platform.name}
                </p>
                <p className="mt-1 text-[11px] text-[#6b7280]">
                  {copy.platformLabels[platform.id]}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <Dialog
        open={selected !== null}
        onOpenChange={open => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="max-h-[94dvh] w-[calc(100vw-1rem)] max-w-6xl overflow-y-auto border-[#b9c9df] bg-white p-0 shadow-[0_28px_100px_rgba(3,18,61,0.35)] sm:w-[calc(100vw-2rem)] sm:max-w-6xl"
          overlayClassName="z-[2147483500] bg-[#03123d]/60 backdrop-blur-sm"
          closeLabel={copy.close}
          style={{ zIndex: 2147483600 }}
        >
          {selected ? (
            <>
              <DialogHeader className="border-b border-[#d8d8d2] px-5 py-5 pr-16 text-left sm:px-7">
                <p className="mono text-[10px] font-bold tracking-[0.1em] text-[#174a9b] uppercase">
                  {selected.id === "wordpress"
                    ? copy.pluginAndCode
                    : selected.id === "wix"
                      ? copy.officialWixApp
                      : copy.direct}
                </p>
                <DialogTitle className="text-2xl leading-tight font-bold tracking-tight text-[#16181d] sm:text-3xl">
                  {selected.id === "wix"
                    ? copy.wixInstallTitle
                    : `${copy.installOn} ${selected.name}`}
                </DialogTitle>
                <DialogDescription className="max-w-2xl text-sm leading-relaxed text-[#5c6370]">
                  {selected.id === "wix"
                    ? copy.wixInstallBody
                    : copy.chooseDisplay}
                </DialogDescription>
              </DialogHeader>

              {selected.id === "wordpress" ? (
                <div className="border-b border-[#b9c9df] bg-[#eaf3ff] px-5 py-5 sm:px-7">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
                    <div>
                      <p className="eyebrow text-[#174a9b]">
                        {copy.recommended}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-[#16181d]">
                        {copy.wordpressDownloadTitle}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#4e5968]">
                        {copy.wordpressDownloadBody}
                      </p>
                      <a
                        href="/downloads/rapidact-ai-disclosure.zip?v=1.0.0"
                        download
                        onClick={trackWordpressDownload}
                        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#0b2a5b] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174a9b] focus-visible:ring-2 focus-visible:ring-[#174a9b] focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        {copy.downloadWordpress}
                      </a>
                    </div>
                    <div className="border border-[#b9c9df] bg-white p-4 sm:p-5">
                      <p className="text-sm font-bold text-[#16181d]">
                        {copy.wordpressStepsTitle}
                      </p>
                      <ol className="mt-3 space-y-3">
                        {copy.wordpressSteps.map((step, index) => (
                          <li
                            key={step}
                            className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 text-sm leading-relaxed text-[#4e5968]"
                          >
                            <span className="mono grid h-7 w-7 place-items-center bg-[#0b2a5b] text-[10px] font-bold text-white">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ) : null}

              {selected.id === "wix" ? (
                <div className="grid gap-0 bg-[#eaf3ff] lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)]">
                  <div className="px-5 py-6 sm:px-7 sm:py-7">
                    <h3 className="text-lg font-bold text-[#16181d]">
                      {copy.wixStepsTitle}
                    </h3>
                    <ol className="mt-4 space-y-3">
                      {copy.wixSteps.map((step, index) => (
                        <li
                          key={step}
                          className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-3 text-sm leading-relaxed text-[#4e5968]"
                        >
                          <span className="mono grid h-8 w-8 place-items-center bg-[#0b2a5b] text-[10px] font-bold text-white">
                            {index + 1}
                          </span>
                          <span className="pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <a
                      href={WIX_INSTALL_URL}
                      target="_blank"
                      rel="noopener"
                      onClick={trackWixInstall}
                      className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#0b2a5b] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174a9b] focus-visible:ring-2 focus-visible:ring-[#174a9b] focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
                    >
                      {copy.installWix}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="border-t border-[#b9c9df] bg-white p-4 sm:p-5 lg:border-t-0 lg:border-l">
                    <p className="mono text-[10px] font-bold tracking-[0.08em] text-[#174a9b] uppercase">
                      {copy.previewTitle}
                    </p>
                    <div className="mt-3 overflow-hidden border border-[#cbd8ec] bg-[#f7f7f5]">
                      <iframe
                        src={previewUrl}
                        title={copy.previewTitle}
                        className="h-56 w-full bg-white sm:h-64"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {selected.id !== "wix" ? (
                <>
                  <div className="border-b border-[#d8d8d2] bg-[#f7f7f5] px-4 py-4 sm:px-7">
                    <div
                      className="grid grid-cols-2 gap-2 lg:grid-cols-4"
                      role="group"
                      aria-label={copy.chooseDisplay}
                    >
                      {displayOrder.map(option => {
                        const Icon = displayIcons[option];
                        const active = display === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={active}
                            onClick={() => {
                              setDisplay(option);
                              setCopyStatus("idle");
                              track("badge_installer_display_selected", {
                                platform: selected.id,
                                display: option,
                              });
                            }}
                            className={`relative min-h-28 border p-3 text-left transition focus-visible:ring-2 focus-visible:ring-[#174a9b] focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-32 sm:p-4 ${
                              active
                                ? "border-[#174a9b] bg-white shadow-[inset_0_0_0_1px_#174a9b]"
                                : "border-[#d8d8d2] bg-white/70 hover:border-[#8aa9d0]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <Icon
                                className={`h-5 w-5 ${
                                  active ? "text-[#174a9b]" : "text-[#6b7280]"
                                }`}
                                aria-hidden="true"
                              />
                              {option === "bubble" ? (
                                <span className="bg-[#174a9b] px-1.5 py-1 text-[8px] leading-none font-bold tracking-[0.06em] text-white uppercase">
                                  {copy.recommended}
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-3 text-sm font-bold text-[#16181d]">
                              {copy.styles[option].name}
                            </p>
                            <p className="mt-1 text-[11px] leading-snug text-[#5c6370] sm:text-xs">
                              {copy.styles[option].description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]">
                    <div className="min-w-0 p-5 sm:p-7">
                      <div>
                        <p className="eyebrow text-[#174a9b]">
                          {selected.id === "wordpress"
                            ? copy.manualOption
                            : copy.manualFallback}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-[#16181d]">
                          {copy.location}: {copy.locations[selected.id]}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5c6370]">
                          {copy.manualFallbackBody}
                        </p>
                      </div>

                      <div className="mt-5 overflow-hidden border border-[#203457] bg-[#07132d]">
                        <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/15 px-3 sm:px-4">
                          <span className="mono text-[10px] font-bold tracking-[0.1em] text-white/55 uppercase">
                            {copy.code}
                          </span>
                          <button
                            type="button"
                            onClick={copySnippet}
                            className="inline-flex min-h-11 items-center gap-2 px-2 text-xs font-bold text-white transition hover:text-[#75e2ff] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                            aria-live="polite"
                          >
                            {copyStatus === "copied" ? (
                              <Check className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Copy className="h-4 w-4" aria-hidden="true" />
                            )}
                            {copyStatus === "copied"
                              ? copy.copied
                              : copyStatus === "failed"
                                ? copy.copyFailed
                                : copy.copy}
                          </button>
                        </div>
                        <pre className="max-h-80 overflow-auto p-4 text-[11px] leading-relaxed sm:text-xs">
                          <HighlightedCode code={snippet} />
                        </pre>
                      </div>
                    </div>

                    <aside className="border-t border-[#d8d8d2] bg-[#eef3f8] p-5 sm:p-7 lg:border-t-0 lg:border-l">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="eyebrow text-[#174a9b]">
                            {copy.previewTitle}
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#16181d]">
                            {copy.styles[display].name}
                          </p>
                        </div>
                        <a
                          href={previewUrl}
                          target="_blank"
                          rel="noopener"
                          onClick={() =>
                            track("badge_installer_preview", {
                              platform: selected.id,
                              display,
                            })
                          }
                          className="inline-flex min-h-11 items-center gap-2 border border-[#174a9b] bg-white px-3 text-xs font-bold text-[#174a9b] transition hover:bg-[#e7f1ff] focus-visible:ring-2 focus-visible:ring-[#174a9b] focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          {copy.preview}
                          <ExternalLink
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                      <div className="mt-4 overflow-hidden border border-[#b9c9df] bg-white shadow-[0_12px_35px_rgba(3,18,61,0.12)]">
                        <div className="flex items-center gap-1.5 border-b border-[#d8d8d2] bg-[#f7f7f5] px-3 py-2">
                          <span className="h-2 w-2 rounded-full bg-[#c9ced6]" />
                          <span className="h-2 w-2 rounded-full bg-[#c9ced6]" />
                          <span className="h-2 w-2 rounded-full bg-[#174a9b]" />
                        </div>
                        <iframe
                          key={previewUrl}
                          src={previewUrl}
                          title={`${copy.previewTitle}: ${copy.styles[display].name}`}
                          sandbox="allow-scripts allow-popups"
                          className="h-80 w-full border-0"
                        />
                      </div>
                    </aside>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
