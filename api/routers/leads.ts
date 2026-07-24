import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { leads } from "@db/schema";
import type { LeadResult } from "@contracts/types";

export const leadsRouter = createRouter({
  capture: publicQuery
    .input(
      z.object({
        email: z.string().email().max(255),
        url: z.string().max(1000).optional(),
        source: z.string().max(64).optional(),
      }),
    )
    .mutation(async ({ input }): Promise<LeadResult> => {
      await getDb()
        .insert(leads)
        .values({
          email: input.email,
          url: input.url ?? null,
          source: input.source ?? "scanner",
        });
      return { ok: true };
    }),
});
