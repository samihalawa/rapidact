import { describe, expect, it } from "vitest";
import { isSpaRouteRequest } from "./vite";

describe("isSpaRouteRequest", () => {
  it.each([
    ["GET", "/report"],
    ["HEAD", "/example-report"],
    ["GET", "/es"],
    ["GET", "/es/report"],
  ])("serves the SPA shell for %s %s", (method, pathname) => {
    expect(isSpaRouteRequest(method, pathname)).toBe(true);
  });

  it.each([
    ["POST", "/report"],
    ["GET", "/assets/missing.js"],
    ["GET", "/missing.png"],
  ])("keeps a real 404 for %s %s", (method, pathname) => {
    expect(isSpaRouteRequest(method, pathname)).toBe(false);
  });
});
