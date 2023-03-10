import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { theMovieDBRouter } from "./theMovieDBRouter";
export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  theMovieDB: theMovieDBRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
