import posthog from "posthog-js";

export const ANALYTICS = {
  googleTagManagerId: "GTM-TZFZ5ZHK",
  ga4MeasurementId: "G-PEFSF0DS02",
  googleAdsId: "AW-18196170782",
  posthogKey: "phc_tKAxP5F6oRE3XHximxQYW8dMX4gtE9XYBraJ4PNwfemk",
  posthogHost: "https://posthog.megawebs.com",
  release: "2026-07-29",
} as const;

export const ANALYTICS_EVENTS = {
  scannerLeadCaptured: "scanner_lead_captured",
  reportSubmitted: "report_submitted",
  paymentInitiated: "payment_initiated",
  purchase: "purchase",
} as const;

export type ConsentChoice = "all" | "essential";
export type EventProperties = Record<
  string,
  string | number | boolean | undefined
>;
type EventStorage = Pick<Storage, "getItem" | "setItem">;

export const GTM_EVENT_PARAMETERS = [
  "value",
  "currency",
  "payment_provider",
  "product_name",
  "checkout_id",
  "lead_type",
  "lead_source",
  "stored",
  "crm_status",
  "company_size",
  "sector",
  "ai_system_count",
  "transaction_id",
  "partner_type",
] as const;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "rapidact-consent-v1";
const ANALYTICS_HOSTS = new Set(["rapidact.eu", "www.rapidact.eu"]);
let initialized = false;

export function isLeadRetained(result: {
  stored: boolean;
  crm?: "synced" | "skipped" | "failed";
}) {
  return result.stored || result.crm === "synced";
}

export function stableEventId(namespace: string, seed: string) {
  let hash = 2166136261;
  for (const character of `${namespace}:${seed}`) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `${namespace}_${(hash >>> 0).toString(36)}`;
}

export function googleTransportUrl(origin: string) {
  return `${origin.replace(/\/+$/, "")}/metrics`;
}

export function claimSessionEvent(eventId: string, storage?: EventStorage) {
  try {
    const target = storage ?? window.sessionStorage;
    if (target.getItem(eventId)) return false;
    target.setItem(eventId, "1");
    return true;
  } catch {
    // Analytics must not block the user when browser storage is unavailable.
    return true;
  }
}

export function isAnalyticsHost(
  hostname = typeof location === "undefined" ? "" : location.hostname
) {
  return ANALYTICS_HOSTS.has(hostname.toLowerCase());
}

export function getConsent(): ConsentChoice | null {
  const value = localStorage.getItem(CONSENT_KEY);
  return value === "all" || value === "essential" ? value : null;
}

function googleConsent(choice: ConsentChoice | null) {
  window.gtag("consent", choice ? "update" : "default", {
    analytics_storage: choice === "all" ? "granted" : "denied",
    ad_storage: choice === "all" ? "granted" : "denied",
    ad_user_data: choice === "all" ? "granted" : "denied",
    ad_personalization: choice === "all" ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: choice ? 0 : 500,
  });
}

export function initAnalytics() {
  if (initialized || !isAnalyticsHost()) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  const consent = getConsent();
  googleConsent(consent);
  window.gtag("js", new Date());
  window.gtag("config", ANALYTICS.ga4MeasurementId, {
    send_page_view: false,
    allow_google_signals: consent === "all",
    transport_url: googleTransportUrl(location.origin),
    first_party_collection: true,
  });
  window.gtag("config", ANALYTICS.googleAdsId, {
    allow_ad_personalization_signals: consent === "all",
  });

  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const googleScript = document.createElement("script");
  googleScript.async = true;
  googleScript.src = `https://www.googletagmanager.com/gtm.js?id=${ANALYTICS.googleTagManagerId}`;
  googleScript.dataset.rapidactAnalytics = "gtm";
  document.head.appendChild(googleScript);

  posthog.init(ANALYTICS.posthogKey, {
    api_host: ANALYTICS.posthogHost,
    defaults: "2026-01-30",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    capture_exceptions: true,
    capture_performance: true,
    enable_heatmaps: true,
    disable_session_recording: consent !== "all",
    opt_out_capturing_by_default: consent !== "all",
    mask_all_text: false,
    mask_all_element_attributes: false,
  });

  if (consent === "all") {
    if (!posthog.has_opted_in_capturing()) {
      posthog.opt_in_capturing({ captureEventName: false });
    }
    posthog.startSessionRecording();
  }
}

export function setConsent(choice: ConsentChoice) {
  localStorage.setItem(CONSENT_KEY, choice);
  if (!isAnalyticsHost()) {
    window.dispatchEvent(
      new CustomEvent("rapidact:consent", { detail: choice })
    );
    return;
  }
  googleConsent(choice);
  if (choice === "all") {
    if (!posthog.has_opted_in_capturing()) {
      posthog.opt_in_capturing({ captureEventName: false });
    }
    posthog.startSessionRecording();
    track("consent_updated", { analytics: true, advertising: true });
  } else {
    posthog.stopSessionRecording();
    posthog.opt_out_capturing();
  }
  window.dispatchEvent(new CustomEvent("rapidact:consent", { detail: choice }));
}

function baseProperties(): EventProperties {
  return {
    platform: "web",
    release: ANALYTICS.release,
    page_path: `${location.pathname}${location.search}`,
    page_language: document.documentElement.lang || "en",
  };
}

export function buildDataLayerEvent(
  name: string,
  properties: EventProperties
): EventProperties & { event: string } {
  const clearedParameters = Object.fromEntries(
    GTM_EVENT_PARAMETERS.map((parameter) => [parameter, undefined])
  );
  return { event: name, ...clearedParameters, ...properties };
}

export function track(name: string, properties: EventProperties = {}) {
  if (!isAnalyticsHost()) return;
  const payload = { ...baseProperties(), ...properties };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(buildDataLayerEvent(name, payload));
  if (getConsent() === "all") posthog.capture(name, payload);
}

export function trackPageView() {
  if (!isAnalyticsHost()) return;
  const payload = {
    ...baseProperties(),
    page_title: document.title,
    page_location: location.href,
  };
  window.gtag?.("event", "page_view", payload);
  if (getConsent() === "all") posthog.capture("$pageview", payload);
}
