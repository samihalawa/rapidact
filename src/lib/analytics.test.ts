import { describe, expect, it } from "vitest";
import { isAnalyticsHost } from "./analytics";

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
