# Nxpotify

> NextJS + Spotify ClonE

## Error

1. next-auth 에러 해결하기

- https://next-auth.js.org/errors#client_fetch_error request to https://localhost:3000/api/auth/providers failed
  - .env.local에서 https가 아니라 http로 수정

```
NEXTAUTH_URL=http://localhost:3000
```
