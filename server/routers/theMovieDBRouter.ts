import axios from 'axios'
import { z } from 'zod'

import { publicProcedure, router } from '../trpc'

const base_url = 'https://api.themoviedb.org/3'

const client = axios.create({
    baseURL: base_url,
    params: { api_key: process.env.TMDB_API_KEY },
})

const TVResult = z.object({
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
})

export type TVResultType = z.output<typeof TVResult>

export const searchResponse = z.object({
    page: z.number(),
    results: z.array(TVResult),
    total_results: z.number(),
    total_pages: z.number(),
})

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
})
export type ImageConfig = z.infer<typeof imageConfig>

export const theMovieDBRouter = router({
    search: publicProcedure
        .input(
            z.object({
                query: z.string().trim().min(1),
            })
        )
        .output(searchResponse)
        .query(({ input }) => {
            return client
                .get('/search/tv', { params: { query: input.query } })
                .then((response) => {
                    return searchResponse.parse(response.data)
                })
        }),
    getImageConfig: publicProcedure.query(() => {
        return client.get('/configuration').then((response) => {
            return imageConfig.parse(response.data)
        })
    }),
})
