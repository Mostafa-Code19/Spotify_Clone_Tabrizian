import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import SpotifyWebApi from "spotify-web-api-node";

import { log } from '../components/base'

const useSpotify = () => {
    const { data: session, statue } = useSession()

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    })

    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshAccessTokenError') {
                signIn()
            }

            spotifyApi.setAccessToken(session?.user.accessToken)
        }
    }, [session]);

    return spotifyApi
}

export default useSpotify