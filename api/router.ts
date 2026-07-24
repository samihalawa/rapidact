import { createRouter, publicQuery } from "./middleware";
import { scanRouter } from "./routers/scan";
import { leadsRouter } from "./routers/leads";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  scan: scanRouter,
  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
