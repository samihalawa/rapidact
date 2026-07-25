import { createRouter, publicQuery } from "./middleware";
import { scanRouter } from "./routers/scan";
import { leadsRouter } from "./routers/leads";
import { reportRouter } from "./routers/report";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  scan: scanRouter,
  leads: leadsRouter,
  report: reportRouter,
});

export type AppRouter = typeof appRouter;
