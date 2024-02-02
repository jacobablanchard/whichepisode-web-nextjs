# Which Episode?

![Logo of the project](./.readmeImages/logo.jpg)

Are you someone who has a hard time picking which episode of a show to watch? Look no further! Let WhichEpisode decide for you!

https://whichepisode.jacobblanchard.dev/

## Why did you make this project?

I work as a full stack dev, and at work, we use a python w/ django backend and a react / django frontend. Frequently, I get pretty frustrated at the DX that this stack gives, and decided to dabble around to see what all is out there. For me this project accomplished a few different things (in no particular order).

- I've made small projects in the past, but never really deployed anything
- I've always been interesting in using node as a backend runtime
- Learning serverless architecture
- Rate limiting
    - We use Amazon's load balancing at work, but it was interesting setting it up at the backend layer rather than the infrastructure layer
- Using react query for query state management, and the caching strategies it provides

## What did you learn?

- Having a your type-safe backend and frontend in the same codebase makes for an AMAZING DX
    - To that end, at least for my hobby projects, NextJS + tRPC will be my go-to
- Serverless also makes for a pretty good DX (for a solo dev with just hobby projects) - I wasn't a big fan of SSH'ing into a box to periodically update + setting up infra to deploy (I used dokku in the past) + managing it all + paying monthly for a box that barely saw any traffic
## Tech Stack

- NextJS
- React
- tRPC
- Redis (through Upstash)
    - Used for rate limiting
- Material UI

### Deployed to Vercel
### TV show data provided by [TMDB](https://www.themoviedb.org)

## Ideas for further develpment
- Make mobile friendly
- Logo
- Save favorite shows