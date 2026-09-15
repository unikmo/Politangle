import { NextResponse, type NextRequest } from 'next/server';

const locales = new Set(['en', 'de', 'es', 'fr']);
const localizedPaths = new Set([
  '/', '/about', '/classify', '/contact', '/deep', '/imprint', '/learn', '/method',
  '/populism-quiz', '/practice', '/privacy', '/question-banks', '/quiz', '/results',
  '/school', '/school/pilot', '/terms', '/understand', '/validation',
]);

export function middleware(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').filter(Boolean);
  const pathLocale = parts[0] && locales.has(parts[0]) ? parts[0] : null;
  if (pathLocale) {
    const response = NextResponse.next();
    response.cookies.set('politangle_locale', pathLocale, { sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }
  const saved = request.cookies.get('politangle_locale')?.value;
  if (saved && locales.has(saved) && localizedPaths.has(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${saved}${request.nextUrl.pathname === '/' ? '' : request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'] };
