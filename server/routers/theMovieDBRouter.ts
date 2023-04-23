import axios from 'axios';
import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

const base_url = 'https://api.themoviedb.org/3';

const client = axios.create({
    baseURL: base_url,
    params: { api_key: process.env.TMDB_API_KEY },
});

const TVShowSearchResult = z.object({
    poster_path: z.string().nullable(),
    popularity: z.number(),
    id: z.number(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    overview: z.string(),
    first_air_date: z.string().optional(),
    origin_country: z.array(z.string()),
    genre_ids: z.array(z.number()),
    original_language: z.string(),
    vote_count: z.number(),
    name: z.string(),
    original_name: z.string(),
});

export type TVShowSearthResultType = z.output<typeof TVShowSearchResult>;

export const TVSearchResponse = z.object({
    page: z.number(),
    results: z.array(TVShowSearchResult),
    total_results: z.number(),
    total_pages: z.number(),
});

export const TVShowSeason = z.object({
    episode_count: z.number(),
    id: z.number(),
    name: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    season_number: z.number(),
});

export const TVShowDetails = z.object({
    first_air_date: z.string(),
    number_of_episodes: z.number(),
    number_of_seasons: z.number(),
    seasons: z.array(TVShowSeason),
});

export const TVEpisodeDetails = z.object({
    air_date: z.string().nullable(),
    name: z.string(),
    overview: z.string(),
    still_path: z.nullable(z.string()),
});

const imageConfig = z.object({
    images: z.object({
        base_url: z.string(),
        secure_base_url: z.string(),
        backdrop_sizes: z.array(z.string()),
        logo_sizes: z.array(z.string()),
        poster_sizes: z.array(z.string()),
        profile_sizes: z.array(z.string()),
        still_sizes: z.array(z.string()),
    }),
});
export type ImageConfig = z.infer<typeof imageConfig>;

export const theMovieDBRouter = router({
    search: publicProcedure
        .input(
            z.object({
                query: z.string().trim().min(1),
            })
        )
        .output(TVSearchResponse)
        .query(async ({ input, ctx }) => {
            return client
                .get('/search/tv', { params: { query: input.query } })
                .then((response) => {
                    return TVSearchResponse.parse(response.data);
                });
        }),
    getImageConfig: publicProcedure.query(() => {
        return client.get('/configuration').then((response) => {
            return imageConfig.parse(response.data);
        });
    }),
    getShowData: publicProcedure
        .input(
            z.object({
                tv_id: z.number(),
            })
        )
        .output(TVShowDetails)
        .query(({ input }) => {
            return client.get(`/tv/${input.tv_id}`).then((response) => {
                return TVShowDetails.parse(response.data);
            });
        }),
    getNumberofEpisodesForSeason: publicProcedure
        .input(
            z.object({
                tv_id: z.number(),
                season: z.number(),
            })
        )
        .output(z.number())
        .query(async ({ input }) => {
            return client
                .get(`/tv/${input.tv_id}/season/${input.season}`)
                .then((response) => {
                    return response.data.episodes.length ?? 0;
                });
        }),
    getEpisodeData: publicProcedure
        .input(
            z.object({
                tv_id: z.number(),
                season: z.number(),
                episode: z.number(),
            })
        )
        .output(TVEpisodeDetails)
        .query(({ input }) => {
            return client
                .get(
                    `/tv/${input.tv_id}/season/${input.season}/episode/${input.episode}`
                )
                .then((response) => {
                    return TVEpisodeDetails.parse(response.data);
                });
        }),
});
