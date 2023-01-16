import { FC, ReactNode, createContext, useState } from 'react'

import { ImageConfig } from '../server/routers/theMovieDBRouter'
import { trpc } from '../utils/trpc'

export const ImageConfigContext = createContext<null | ImageConfig>(null)

type ImageConfigProps = {
    children: ReactNode
}

const ImageConfigProvider: FC<ImageConfigProps> = (props) => {
    const [imageConfig, setImageConfig] = useState<null | ImageConfig>(null)
    const configResult = trpc.theMovieDB.getImageConfig.useQuery(undefined, {
        cacheTime: 12 * 60 * 60 * 1000,
        // hours->minutes->seconds->miliseconds
        onSuccess: (data) => {
            setImageConfig(data)
        },
    })

    return (
        <ImageConfigContext.Provider value={imageConfig}>
            {props.children}
        </ImageConfigContext.Provider>
    )
}

export default ImageConfigProvider
