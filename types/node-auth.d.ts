import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    username?: string | null;
  }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    accessTokenExpires?: number;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {}
}
