import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

/**
 * 참고자료
 * https://github.com/nextauthjs/next-auth-refresh-token-example/blob/main/pages/api/auth/%5B...nextauth%5D.js
 */

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken!);
    spotifyApi.setRefreshToken(token.refreshToken!);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('REFRESHED TOKEN IS ', refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, //* = 1 hour as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log('================= NEXT AUTH ================');
      console.log('[account]: ', account);
      console.log('[user]: ', user);

      //* initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          usernmae: account.providerAccountId,
          // we are handling expiry times in Milliseconds hence * 1000
          acceddTokenExpires: account.expires_at ? account.expires_at * 1000 : undefined,
        };
      }

      //* Return privious token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires!) {
        console.log('Existing Access Token is valid');
        return token;
      }

      //* Access token has expired, so we need to refresh it
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      console.log('======== session callback 호출 ==========');
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      //! token.name이 맞는지 확인
      session.username = token.name;
      return session;
    },
  },
});
