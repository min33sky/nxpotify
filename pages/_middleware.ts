import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: any) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true..
  // 1) It's a request for next-auth session & provider fetching
  // 2) the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect them to llogin if they don't have token AND are requesting a protected route
  // ? 로그아웃 버튼 클릭 시 로그인 페이지로 돌아간다.
  if (!token && pathname !== '/auth/login') {
    return NextResponse.redirect('/auth/login');
  }
}
