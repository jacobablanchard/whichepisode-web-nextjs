import { Analytics } from '@vercel/analytics/react';
import type { AppType } from 'next/app';

import '../styles/globals.css';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <>
            <Analytics />
            <Component {...pageProps} />
        </>
    );
};
export default trpc.withTRPC(MyApp);
