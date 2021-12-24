import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { log } from "../../../components/base"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

const refreshAccessToken = async (token) => {
    try {

        spotifyApi.setAccessToken(token.access_token)
        spotifyApi.setRefreshToken(token.refresh_token)

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
        console.log('refresh token is: ', refreshedToken)

        return { 
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 86_400_000,
            refreshToken: refreshedToken.refresh_token ?? token.refresh_token,
        }

    } catch (err){
        console.error(err)
        console.log('error nextAuth')

        return {
            ...token,
            error: 'RefreshAccessToken'
        }
    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authentication: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
      signIn: '/login'
  },
  callbacks: {
      async jwt({ token, account, user }){
          if (account && user) {
              return {
                  ...token,
                  accessToken: account.access_token,
                  refreshToken: account.refresh_token,
                  username: account.providerAccountId,
                  accessTokenExpires: account.expires_at * 86_400_000,
              }
          }

          if (Date.now() < token.accessTokenExpires) {
              log('existing token valid.')
              return token
          }

          console.log('existing token expired. refresh')
          return await refreshAccessToken(token)

      },

      async session({ session, token }) {
          session?.user.accessToken = token.accessToken
          session?.user.refreshToken = token.refreshToken
          session?.user.username = token.username

          return session
      }
  }
})