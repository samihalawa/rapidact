import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";

type App = Hono<{ Bindings: HttpBindings }>;

export function isSpaRouteRequest(method: string, pathname: string) {
  return (
    (method === "GET" || method === "HEAD") && path.extname(pathname) === ""
  );
}

export function canonicalRedirectPath(pathname: string) {
  let target = pathname;

  if (target !== "/") target = target.replace(/\/+$/, "");
  target = target.replace(/^\/en(?=\/|$)/, "") || "/";
  target = target.replace(
    /^\/(es|de|fr|it)(?=\/(?:privacy|terms|requirements)(?:\/|$))/,
    ""
  );
  target = target.replace(/\/start$/, "/report");

  return target || "/";
}

export function prerenderedRoutePath(distPath: string, pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.some(segment => segment === "." || segment === ".."))
    return null;
  const candidate = path.resolve(distPath, ...segments, "index.html");
  const relative = path.relative(distPath, candidate);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return candidate;
}

export function immutableAssetCacheControl(
  method: string,
  pathname: string,
  status: number
) {
  const immutablePath =
    pathname.startsWith("/assets/") ||
    pathname === "/brand/rapidact-exact-symbol-128.webp";
  return (method === "GET" || method === "HEAD") &&
    status >= 200 &&
    status < 300 &&
    immutablePath
    ? "public, max-age=31536000, immutable"
    : null;
}

export function serveStaticFiles(app: App) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");

  app.use("*", async (c, next) => {
    await next();
    const assetCacheControl = immutableAssetCacheControl(
      c.req.method,
      c.req.path,
      c.res.status
    );
    if (assetCacheControl) c.header("Cache-Control", assetCacheControl);
    if (c.res.headers.get("content-type")?.includes("text/html")) {
      c.header(
        "Cache-Control",
        c.res.status >= 400 ? "no-store" : "public, max-age=0, must-revalidate"
      );
    }
  });

  app.use("*", async (c, next) => {
    if (!isSpaRouteRequest(c.req.method, c.req.path)) return next();

    const url = new URL(c.req.url);
    const host = (c.req.header("host") ?? url.host).split(":")[0].toLowerCase();
    const canonicalPath = canonicalRedirectPath(c.req.path);
    if (host === "www.rapidact.eu" || canonicalPath !== c.req.path) {
      url.protocol = "https:";
      url.host = "rapidact.eu";
      url.pathname = canonicalPath;
      return c.redirect(url.toString(), 308);
    }

    return next();
  });

  app.use("*", serveStatic({ root: "./dist/public" }));

  app.notFound(c => {
    if (!isSpaRouteRequest(c.req.method, c.req.path)) {
      c.header("Cache-Control", "no-store");
      return c.json({ error: "Not Found" }, 404);
    }
    const routePath = prerenderedRoutePath(distPath, c.req.path);
    if (routePath && fs.existsSync(routePath)) {
      return c.html(fs.readFileSync(routePath, "utf-8"));
    }

    const notFoundPath = path.resolve(distPath, "404.html");
    c.header("Cache-Control", "no-store");
    c.header("X-Robots-Tag", "noindex, nofollow");
    if (fs.existsSync(notFoundPath)) {
      return c.html(fs.readFileSync(notFoundPath, "utf-8"), 404);
    }
    return c.json({ error: "Not Found" }, 404);
  });
}
