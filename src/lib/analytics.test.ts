import { describe, expect, it } from "vitest";
import {
  ANALYTICS_EVENTS,
  buildDataLayerEvent,
  claimSessionEvent,
  googleTransportUrl,
  isAnalyticsHost,
  isQaSession,
  isLeadRetained,
  stableEventId,
} from "./analytics";

describe("analytics host filtering", () => {
  it("captures only the public RapidAct domains", () => {
    expect(isAnalyticsHost("rapidact.eu")).toBe(true);
    expect(isAnalyticsHost("www.rapidact.eu")).toBe(true);
    expect(isAnalyticsHost("RAPIDACT.EU")).toBe(true);
  });

  it("does not contaminate production analytics from development or previews", () => {
    expect(isAnalyticsHost("127.0.0.1")).toBe(false);
    expect(isAnalyticsHost("localhost")).toBe(false);
    expect(isAnalyticsHost("rapidact.megawebs.com")).toBe(false);
  });
});

describe("Google Tag Gateway", () => {
  it("uses the absolute first-party transport URL Google expects", () => {
    expect(googleTransportUrl("https://rapidact.eu")).toBe(
      "https://rapidact.eu/metrics"
    );
    expect(googleTransportUrl("https://www.rapidact.eu/")).toBe(
      "https://www.rapidact.eu/metrics"
    );
  });
});

describe("traffic classification", () => {
  const makeStorage = () => {
    const values = new Map<string, string>();
    return {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    };
  };

  it("marks explicit verification and proof visits as QA traffic", () => {
    expect(
      isQaSession(
        "https://rapidact.eu/article-50?proof=review#install",
        "",
        makeStorage()
      )
    ).toBe(true);
    expect(
      isQaSession(
        "https://rapidact.eu/scanner?verify=production",
        "",
        makeStorage()
      )
    ).toBe(true);
  });

  it("persists Tag Assistant classification across later page views", () => {
    const storage = makeStorage();
    expect(
      isQaSession(
        "https://rapidact.eu/",
        "https://tagassistant.google.com/",
        storage
      )
    ).toBe(true);
    expect(isQaSession("https://rapidact.eu/report", "", storage)).toBe(true);
  });

  it("keeps ordinary public visits external", () => {
    expect(
      isQaSession(
        "https://rapidact.eu/article-50?utm_source=google",
        "https://www.google.com/",
        makeStorage()
      )
    ).toBe(false);
  });
});

describe("canonical commercial events", () => {
  it("keeps GA4 key-event names aligned with the product funnel", () => {
    expect(ANALYTICS_EVENTS).toEqual({
      scannerLeadCaptured: "scanner_lead_captured",
      reportSubmitted: "report_submitted",
      partnerApplicationSubmitted: "partner_application_submitted",
      paymentInitiated: "payment_initiated",
      purchase: "purchase",
    });
  });

  it("counts a lead only when the database or CRM retained it", () => {
    expect(isLeadRetained({ stored: true, crm: "failed" })).toBe(true);
    expect(isLeadRetained({ stored: false, crm: "synced" })).toBe(true);
    expect(isLeadRetained({ stored: false, crm: "failed" })).toBe(false);
    expect(isLeadRetained({ stored: false, crm: "skipped" })).toBe(false);
  });

  it("deduplicates a checkout event within one browser session", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    };
    const eventId = stableEventId("checkout", "RA-1234");

    expect(eventId).toBe(stableEventId("checkout", "RA-1234"));
    expect(eventId).not.toBe(stableEventId("checkout", "RA-5678"));
    expect(claimSessionEvent(eventId, storage)).toBe(true);
    expect(claimSessionEvent(eventId, storage)).toBe(false);
  });

  it("clears mapped GTM values before every distinct product event", () => {
    const payment = buildDataLayerEvent("payment_initiated", {
      value: 99,
      currency: "EUR",
      payment_provider: "bunq",
    });
    const lead = buildDataLayerEvent("report_submitted", {
      lead_type: "paid_assessment",
      stored: true,
    });

    expect(payment).toMatchObject({
      value: 99,
      currency: "EUR",
      payment_provider: "bunq",
    });
    expect(lead).toMatchObject({
      lead_type: "paid_assessment",
      stored: true,
    });
    expect(lead.value).toBeUndefined();
    expect(lead.currency).toBeUndefined();
    expect(lead.payment_provider).toBeUndefined();
    expect(lead.checkout_id).toBeUndefined();
    expect(lead.traffic_type).toBeUndefined();
    expect(lead.debug_mode).toBeUndefined();
  });
});
