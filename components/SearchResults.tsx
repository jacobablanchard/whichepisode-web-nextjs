import { Box, Divider, Stack } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import {
    ImageConfig,
    TVShowSearthResultType,
} from '../server/routers/theMovieDBRouter';
import { trpc } from '../utils/trpc';
import { SearchResult } from './SearchResult';

export interface ISearchResultsProps {
    queryString: string;
    ImageConfigurations: ImageConfig | undefined;
    onShowSelected: (SelectedShow: TVShowSearthResultType) => void;
}

export function SearchResults(props: ISearchResultsProps) {
    const [queryShouldRun, setQueryShouldRun] = useState(false);

    const results = trpc.theMovieDB.search.useQuery(
        { query: props.queryString },
        {
            enabled: props.queryString.trim().length > 0,
            refetchOnWindowFocus: false,
        }
    );

    if (results.isLoading) {
        return <Box width={'33%'}> </Box>;
    } else if (results.isError) {
        return <>ERROR</>;
    } else {
        if (results.data.results) {
            return (
                <Stack spacing={2} width={'33%'}>
                    {results.data.results.map((result) => (
                        <SearchResult
                            result={result}
                            key={result.id}
                            onClick={props.onShowSelected}
                        />
                    ))}
                </Stack>
            );
        } else {
            return <Box width={'33%'}> No results </Box>;
        }
    }
}
