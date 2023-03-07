import { trpc } from '../utils/trpc';

const imageConfig = () => {
    return trpc.theMovieDB.getImageConfig.useQuery(undefined, {
        staleTime: 24 * 60 * 60 * 1000,
    });
};

export default imageConfig;
