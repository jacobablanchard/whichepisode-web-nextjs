import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import { useContext } from 'react';

import useImageBlur from '../hooks/useImageBlur';
import { ImageConfigContext } from '../hooks/useImageConfig';
import { TVResultType } from '../server/routers/theMovieDBRouter';

export interface ISelectedShowProps {
    show: TVResultType | null;
}

export function SelectedShow(props: ISelectedShowProps) {
    const imageConfig = useContext(ImageConfigContext);
    const imageWidth = imageConfig?.images.backdrop_sizes[2] ?? '';
    const imageBlurURL = useImageBlur(parseInt(imageWidth?.slice(1)), 250);

    return (
        props.show && (
            <Stack position={'relative'} padding={1}>
                <Typography>{props.show?.name}</Typography>
                <Image
                    src={`${imageConfig?.images.secure_base_url}${imageWidth}${props.show?.backdrop_path}`}
                    alt={`${props.show.name} backdrop`}
                    fill
                    placeholder="blur"
                    blurDataURL={imageBlurURL}
                    style={{
                        objectFit: 'scale-down',
                    }}
                />
            </Stack>
        )
    );
}
