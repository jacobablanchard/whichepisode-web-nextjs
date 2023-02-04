import { Typography } from '@mui/material'
import * as React from 'react'

import { TVResultType } from '../server/routers/theMovieDBRouter'

export interface ISelectedShowProps {
    show: TVResultType | null
}

export function SelectedShow(props: ISelectedShowProps) {
    return <Typography>{props.show?.name}</Typography>
}
