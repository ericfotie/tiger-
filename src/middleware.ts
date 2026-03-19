import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('tiger_auth');
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

  // Si pas de cookie et tente d'aller en admin -> Redirige au login
  if (isAdminPage && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si déjà connecté et va sur /login -> Envoie direct en admin
  if (isLoginPage && authCookie) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};