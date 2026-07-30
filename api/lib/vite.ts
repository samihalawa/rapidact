import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";

type App = Hono<{ Bindings: HttpBindings }>;

export function isSpaRouteRequest(method: string, pathname: string) {
  return (method === "GET" || method === "HEAD") && path.extname(pathname) === "";
}

export function serveStaticFiles(app: App) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");

  app.use("*", async (c, next) => {
    await next();
    if (c.res.headers.get("content-type")?.includes("text/html")) {
      c.header("Cache-Control", "no-cache, no-store, must-revalidate");
    }
  });

  app.use("*", serveStatic({ root: "./dist/public" }));

  app.notFound((c) => {
    if (!isSpaRouteRequest(c.req.method, c.req.path)) {
      c.header("Cache-Control", "no-store");
      return c.json({ error: "Not Found" }, 404);
    }
    const indexPath = path.resolve(distPath, "index.html");
    const content = fs.readFileSync(indexPath, "utf-8");
    return c.html(content);
  });
}
