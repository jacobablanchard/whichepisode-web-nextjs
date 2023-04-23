import { TRPCError, initTRPC } from '@trpc/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { Context } from './context';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();
// Base router and procedure helpers
export const router = t.router;

export const middleware = t.middleware;

// Create a middleware that rate limits all requests
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(40, '10 s'),
    analytics: true,
    /**
     * Optional prefix for the keys used in redis. This is useful if you want to share a redis
     * instance with other applications and want to avoid key collisions. The default prefix is
     * "@upstash/ratelimit"
     */
    prefix: '@upstash/ratelimit',
});
const rateLimitMiddlware = middleware(async ({ ctx, next }) => {
    const { success } = await ratelimit.limit(ctx.ip);
    if (!success) {
        throw new TRPCError({
            message: 'Too many requests',
            code: 'TOO_MANY_REQUESTS',
        });
    }
    return next();
});

export const publicProcedure = t.procedure.use(rateLimitMiddlware);
