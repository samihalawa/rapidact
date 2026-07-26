import posthog from "posthog-js";

export const ANALYTICS = {
  googleTagManagerId: "GTM-TZFZ5ZHK",
  ga4MeasurementId: "G-PEFSF0DS02",
  googleAdsId: "AW-18196170782",
  posthogKey: "phc_tKAxP5F6oRE3XHximxQYW8dMX4gtE9XYBraJ4PNwfemk",
  posthogHost: "https://posthog.megawebs.com",
  release: "2026-07-26",
} as const;

export type ConsentChoice = "all" | "essential";
export type EventProperties = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "rapidact-consent-v1";
let initialized = false;

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
  if (initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const consent = getConsent();
  googleConsent(consent);
  window.gtag("js", new Date());
  window.gtag("config", ANALYTICS.ga4MeasurementId, {
    send_page_view: false,
    allow_google_signals: consent === "all",
    transport_url: "/metrics",
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
    posthog.opt_in_capturing();
    posthog.startSessionRecording();
  }
}

export function setConsent(choice: ConsentChoice) {
  localStorage.setItem(CONSENT_KEY, choice);
  googleConsent(choice);
  if (choice === "all") {
    posthog.opt_in_capturing();
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

export function track(name: string, properties: EventProperties = {}) {
  const payload = { ...baseProperties(), ...properties };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
  window.gtag?.("event", name, payload);
  if (getConsent() === "all") posthog.capture(name, payload);
}

export function trackPageView() {
  const payload = {
    ...baseProperties(),
    page_title: document.title,
    page_location: location.href,
  };
  window.gtag?.("event", "page_view", payload);
  if (getConsent() === "all") posthog.capture("$pageview", payload);
}
