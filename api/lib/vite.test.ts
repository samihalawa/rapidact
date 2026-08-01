import { describe, expect, it } from "vitest";
import {
  canonicalRedirectPath,
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
