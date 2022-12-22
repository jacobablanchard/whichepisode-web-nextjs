import { Box } from '@mui/material'
import * as React from 'react'
import { useContext } from 'react'

import { TVResultType } from '../server/routers/theMovieDBRouter'

export interface ISearchResultProps {
    result: TVResultType
}

export function SearchResult(props: ISearchResultProps) {
    return (
        <Box>
            <div>{props.result.name}</div>
        </Box>
    )
}
