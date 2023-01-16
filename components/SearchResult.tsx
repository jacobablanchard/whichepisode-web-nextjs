import { Box, Stack, Typography } from '@mui/material'
import { height } from '@mui/system'
import Image from 'next/image'
import * as React from 'react'
import { useContext } from 'react'

import { ImageConfigContext } from '../hooks/useImageConfig'
import { TVResultType } from '../server/routers/theMovieDBRouter'

export interface ISearchResultProps {
    result: TVResultType
}

export function SearchResult(props: ISearchResultProps) {
    const imageConfig = useContext(ImageConfigContext)
    const imageWidth = imageConfig?.images.poster_sizes[0] ?? ''

    return (
        <Stack direction={'row'} alignItems={'center'} position={'relative'}>
            <Image
                src={`${imageConfig?.images.secure_base_url}${imageWidth}${props.result.poster_path}`}
                alt={`${props.result.name} poster`}
                width={parseInt(imageWidth?.slice(1))}
                height={125}
            />
            <div>{props.result.name} </div>
        </Stack>
    )
}
