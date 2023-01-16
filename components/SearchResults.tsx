import { Box, Divider, Stack } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'

import { ImageConfig } from '../server/routers/theMovieDBRouter'
import { trpc } from '../utils/trpc'
import { SearchResult } from './SearchResult'

export interface ISearchResultsProps {
    queryString: string
    ImageConfigurations: ImageConfig | undefined
}

export function SearchResults(props: ISearchResultsProps) {
    const [queryShouldRun, setQueryShouldRun] = useState(false)

    const results = trpc.theMovieDB.search.useQuery(
        { query: props.queryString },
        {
            enabled: props.queryString.trim().length > 0,
            refetchOnWindowFocus: false,
        }
    )

    if (results.isLoading) {
        return <></>
    } else if (results.isError) {
        return <>ERROR</>
    } else {
        if (results.data.results) {
            return (
                <Stack spacing={2}>
                    {results.data.results.map((result) => (
                        <SearchResult result={result} key={result.id} />
                    ))}
                </Stack>
            )
        } else {
            return <></>
        }
    }
}
