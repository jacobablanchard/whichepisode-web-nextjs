import { router, publicProcedure } from "../trpc";
import { z } from "zod";
export const theMovieDBRouter = router({
  list: publicProcedure.query(() => {
    // [..]
    return [];
  }),
});
