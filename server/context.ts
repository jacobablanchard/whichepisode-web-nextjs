import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: CreateNextContextOptions) {
    return {
        ip: opts.req.socket.remoteAddress ?? 'default',
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;
