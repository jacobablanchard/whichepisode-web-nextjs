import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'
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

    const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

    const toBase64 = (str: string) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)

    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            position={'relative'}
            spacing={1}
        >
            <Box>
                {props.result.poster_path ? (
                    <Image
                        src={`${imageConfig?.images.secure_base_url}${imageWidth}${props.result.poster_path}`}
                        alt={`${props.result.name} poster`}
                        width={parseInt(imageWidth?.slice(1))}
                        height={125}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(parseInt(imageWidth?.slice(1)), 125)
                        )}`}
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
    )
}
