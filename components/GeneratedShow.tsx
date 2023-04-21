import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import {
    Button,
    CircularProgress,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

import useImageConfig from '../hooks/useImageConfig';
import { trpc } from '../utils/trpc';

export interface IGeneratedShowProps {
    tv_id: number;
}

/**
Returns a random number between min and max (both included)
*/
function getRndInteger(min: number, max: number) {
    //
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GeneratedShow(props: IGeneratedShowProps) {
    const LoadingComponent = () => {
        return (
            <Stack alignItems={'center'}>
                <CircularProgress size={75} />
            </Stack>
        );
    };
    const imageConfig = useImageConfig();
    const imageWidth = imageConfig?.data?.images.backdrop_sizes[1] ?? '';
    const showData = trpc.theMovieDB.getShowData.useQuery(
        {
            tv_id: props.tv_id ?? -1,
        },
        { refetchOnWindowFocus: false }
    );

    const [chosenSeason, setChosenSeason] = React.useState<null | number>(null);

    const getNumberOfEpisodesQuery =
        trpc.theMovieDB.getNumberofEpisodesForSeason.useQuery(
            {
                season: chosenSeason!,
                tv_id: props.tv_id ?? -1,
            },
            {
                enabled: !!chosenSeason,
                refetchOnWindowFocus: false,
            }
        );

    const [chosenEpisode, setChosenEpisode] = React.useState<number | null>(
        null
    );

    const [imageLoading, setImageLoading] = React.useState(true);
    const episodeData = trpc.theMovieDB.getEpisodeData.useQuery(
        {
            tv_id: props.tv_id ?? -1,
            season: chosenSeason!,
            episode: chosenEpisode!,
        },
        {
            enabled: !!chosenSeason && !!chosenEpisode,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                if (!data.still_path) {
                    setImageLoading(false);
                }
            },
        }
    );

    // When we get showData, then we need to pick a season
    React.useEffect(() => {
        if (!!showData.data) {
            setChosenSeason(getRndInteger(1, showData.data.number_of_seasons));
        }
    }, [showData.data]);
    // When we have a season, and we have the number of episodes in that season, then we need to pick an episode
    React.useEffect(() => {
        if (!!getNumberOfEpisodesQuery.data) {
            setChosenEpisode(getRndInteger(1, getNumberOfEpisodesQuery.data));
        }
    }, [getNumberOfEpisodesQuery.data]);

    if (!showData.data || showData.isError) {
        return <div>ERROR</div>;
    }
    if (showData.isLoading) {
        return <LoadingComponent />;
    }
    return (
        <Stack alignItems={'center'}>
            <Grid container>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onClick={() => {
                            const season = getRndInteger(
                                1,
                                showData.data.number_of_seasons
                            );
                            if (season === chosenSeason) {
                                const epi = getRndInteger(
                                    1,
                                    getNumberOfEpisodesQuery.data!
                                );
                                console.log(`episode ${epi}`);
                                setChosenEpisode(epi);
                            } else {
                                console.log(`setting to ${season}`);
                                setChosenSeason(season);
                            }
                        }}
                    >
                        Find me an episode!
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography textAlign={'center'}>
                        Season{' '}
                        <Typography sx={{ background: 'A400' }}>
                            {chosenSeason}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography textAlign={'center'}>
                        Episode{' '}
                        <Typography sx={{ background: 'A400' }}>
                            {chosenEpisode}
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h2">
                {episodeData.data?.name}
            </Typography>
            <Stack
                style={{
                    width: '100%',
                    height: '300px',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {(imageLoading || episodeData.isLoading) && (
                    <CircularProgress />
                )}
                {episodeData.data?.still_path ? (
                    <Image
                        src={`${imageConfig?.data?.images.secure_base_url}${imageWidth}${episodeData.data?.still_path}`}
                        alt={`Still image from episode`}
                        fill
                        style={{
                            objectFit: 'contain',
                        }}
                        placeholder="empty"
                    />
                ) : (
                    <ImageNotSupportedOutlinedIcon
                        sx={{
                            width: parseInt(imageWidth?.slice(1)),
                            height: 125,
                        }}
                    />
                )}
            </Stack>
            <Typography>{episodeData.data?.overview}</Typography>
        </Stack>
    );
}
