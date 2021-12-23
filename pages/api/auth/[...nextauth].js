import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { LOGIN_URL } from "../../../lib/spotify"

const refreshAccessToken = async (token) => {
    try {

        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
        console.log('refresh token is: ', refreshedToken)

        return { 
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Data.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
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
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  username: account.providerAccountId,
                  accessTokenExpires: account.expires_at * 1000,
              }
          }

          if (Date.now() < token.accessTokenExpires) {
              console.log('existing token valid.')
              return token
          }

          console.log('existing token expired.')
          return await refreshAccessToken(token)

      },

      async session({ session, token }) {
          session.user.accessToken = token.accessToken
          session.user.refreshToken = token.refreshToken
          session.user.username = token.username

          return session
      }
  }
})