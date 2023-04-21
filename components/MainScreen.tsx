import SearchIcon from '@mui/icons-material/Search';
import { Divider, Input, InputAdornment, Stack } from '@mui/material';
import * as React from 'react';

import { SearchResults } from '../components/SearchResults';
import useImageConfig from '../hooks/useImageConfig';
import { TVShowSearthResultType } from '../server/routers/theMovieDBRouter';
import { SelectedShow } from './SelectedShow';

export function MainScreen() {
    const [queryString, setQueryString] = React.useState('');
    const configResult = useImageConfig();
    const [selectedShow, setSelectedShow] =
        React.useState<null | TVShowSearthResultType>(null);
    const onQueryStringChanged: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setQueryString(event.target.value);
    };

    return (
        <Stack m={3}>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                placeholder="Enter a show you want to search for"
                onChange={onQueryStringChanged}
                value={queryString}
                sx={{ mb: 2 }}
            />
            <Stack direction={'row'}>
                <SearchResults
                    queryString={queryString}
                    ImageConfigurations={configResult.data}
                    onShowSelected={setSelectedShow}
                />
                <Divider orientation="vertical" flexItem />
                <SelectedShow show={selectedShow} />
            </Stack>
        </Stack>
    );
}
