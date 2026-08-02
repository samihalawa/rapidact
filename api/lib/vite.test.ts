import { describe, expect, it } from "vitest";
import {
  canonicalRedirectPath,
  immutableAssetCacheControl,
  isSpaRouteRequest,
  prerenderedRoutePath,
} from "./vite";

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

describe("immutableAssetCacheControl", () => {
  it.each([
    ["GET", "/assets/index-AbCd1234.js"],
    ["HEAD", "/assets/index-AbCd1234.css"],
    ["GET", "/brand/rapidact-exact-symbol-128.webp"],
  ])("caches successful versioned assets for %s %s", (method, pathname) => {
    expect(immutableAssetCacheControl(method, pathname, 200)).toBe(
      "public, max-age=31536000, immutable"
    );
  });

  it.each([
    ["GET", "/assets/missing.js", 404],
    ["GET", "/rapidact-badge.js", 200],
    ["POST", "/assets/index-AbCd1234.js", 200],
  ])(
    "does not cache mutable or failed responses",
    (method, pathname, status) => {
      expect(immutableAssetCacheControl(method, pathname, status)).toBeNull();
    }
  );
});

describe("canonicalRedirectPath", () => {
  it.each([
    ["/report/", "/report"],
    ["/en", "/"],
    ["/en/answers/example", "/answers/example"],
    ["/start", "/report"],
    ["/es/start", "/es/report"],
    ["/es/privacy", "/privacy"],
    [
      "/de/requirements/chatbot-ai-disclosure",
      "/requirements/chatbot-ai-disclosure",
    ],
    ["/es/report", "/es/report"],
  ])("normalizes %s to %s", (pathname, expected) => {
    expect(canonicalRedirectPath(pathname)).toBe(expected);
  });
});

describe("prerenderedRoutePath", () => {
  it("maps an extensionless route to its generated document", () => {
    expect(prerenderedRoutePath("/srv/public", "/es/report")).toBe(
      "/srv/public/es/report/index.html"
    );
  });

  it("cannot escape the generated public directory", () => {
    expect(prerenderedRoutePath("/srv/public", "/../secret")).toBeNull();
  });
});
