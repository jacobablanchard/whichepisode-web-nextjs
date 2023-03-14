import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import { Box, Stack, useTheme } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

import useImageBlur from '../hooks/useImageBlur';
import useImageConfig from '../hooks/useImageConfig';
import { TVShowSearthResultType } from '../server/routers/theMovieDBRouter';

export interface ISearchResultProps {
    result: TVShowSearthResultType;
    onClick: (SelectedShow: TVShowSearthResultType) => void;
}

export function SearchResult(props: ISearchResultProps) {
    const imageConfig = useImageConfig();
    const imageWidth = imageConfig?.data?.images.poster_sizes[0] ?? '';
    const imageBlurURL = useImageBlur(parseInt(imageWidth?.slice(1)), 125);
    const theme = useTheme();

    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={1}
            onClick={() => props.onClick(props.result)}
            sx={{
                '&:hover': {
                    outline: `1px solid ${theme.palette.warning.dark}`,
                },
            }}
        >
            <Box>
                {props.result.poster_path ? (
                    <Image
                        src={`${imageConfig?.data?.images.secure_base_url}${imageWidth}${props.result.poster_path}`}
                        alt={`${props.result.name} poster`}
                        width={parseInt(imageWidth?.slice(1))}
                        height={125}
                        placeholder="blur"
                        blurDataURL={imageBlurURL}
                    />
                ) : (
                    <ImageNotSupportedOutlinedIcon
                        sx={{
                            width: parseInt(imageWidth?.slice(1)),
                            height: 125,
                        }}
                    />
                )}
            </Box>
            <div>{props.result.name} </div>
        </Stack>
    );
}
