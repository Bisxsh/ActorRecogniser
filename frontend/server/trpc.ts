import { identifyActorsResponseSchema, actorMediaSchema } from "@/lib/schemas";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const publicProcedure = t.procedure;
export const router = t.router;

export const appRouter = router({
  identify: publicProcedure
    .input(z.object({ image: z.string() }))
    .query(async (opts) => {
      try {
        const res = await fetch(
          `${process.env.SERVICE_API_URL}/identify-actor`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: opts.input.image }),
          }
        );

        if (!res.ok) {
          throw new Error(`Service responded with status: ${res.status}`);
        }

        const data = await res.json();

        return identifyActorsResponseSchema.parse(data);
      } catch (error) {
        console.error("Failed to identify actors:", error);
        throw new Error("Could not process the request. Please try again.");
      }
    }),

  getMedia: publicProcedure
    .input(z.object({ actorId: z.coerce.string().min(1) }))
    .query(async (opts) => {
      try {
        const res = await fetch(
          `${process.env.SERVICE_API_URL}/actor-media/${opts.input.actorId}`
        );

        if (!res.ok) {
          throw new Error(`Service responded with status: ${res.status}`);
        }

        const data = await res.json();

        return actorMediaSchema.parse(data);
      } catch (error) {
        console.error("Failed to get actor media:", error);
        throw new Error("Could not retrieve actor media. Please try again.");
      }
    }),
});

export type AppRouter = typeof appRouter;
