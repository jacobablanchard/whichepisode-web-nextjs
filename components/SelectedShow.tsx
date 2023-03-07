import { LocalDining } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import { useContext } from 'react';

import useImageConfig from '../hooks/useImageConfig';
import { TVShowSearthResultType } from '../server/routers/theMovieDBRouter';
import { trpc } from '../utils/trpc';

export interface ISelectedShowProps {
    show: TVShowSearthResultType | null;
}

export function SelectedShow(props: ISelectedShowProps) {
    const imageConfig = useImageConfig();
    const imageWidth = imageConfig?.data?.images.backdrop_sizes[2] ?? '';
    const showData = trpc.theMovieDB.getShowData.useQuery(
        {
            tv_id: props.show?.id ?? -1,
        },
        { enabled: !!props.show }
    );

    const [imageLoading, setImageLoading] = React.useState(true);

    // React.useEffect(() => {
    //     return () => {
    //         setImageLoading(true);
    //     };
    // }, []);
    return (
        props.show && (
            <Stack padding={1} direction={'column'} flex={1}>
                <Typography variant="h4" component="h1">
                    {props.show?.name}
                </Typography>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        flex: '0 1 15%',
                    }}
                >
                    {imageLoading && (
                        <Typography variant="h4" component="h1">
                            Loading...
                        </Typography>
                    )}
                    <Image
                        src={`${imageConfig?.data?.images.secure_base_url}${imageWidth}${props.show?.backdrop_path}`}
                        alt={`${props.show.name} backdrop`}
                        fill
                        onLoadingComplete={() => setImageLoading(false)}
                        style={{
                            objectFit: 'contain',
                            opacity: imageLoading ? 0 : 100,
                        }}
                        placeholder="empty"
                    />
                </div>
                {showData.isLoading ? (
                    <div>loading...</div>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography textAlign={'center'}>
                                Total Seasons:{' '}
                                {showData.data?.number_of_seasons}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography textAlign={'center'}>
                                First Air Date: {showData.data?.first_air_date}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography textAlign={'center'}>
                                Total Episodes:{' '}
                                {showData.data?.number_of_episodes}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}></Grid>
                    </Grid>
                )}
            </Stack>
        )
    );
}
