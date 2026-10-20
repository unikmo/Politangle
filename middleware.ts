import { NextResponse, type NextRequest } from 'next/server';

const locales = new Set(['en', 'de', 'es', 'fr', 'pt-br']);
const localizedPaths = new Set([
  '/', '/about', '/account', '/classify', '/contact', '/deep', '/imprint', '/learn', '/method',
  '/populism-quiz', '/practice', '/privacy', '/question-banks', '/quiz', '/quizzes', '/results',
  '/school', '/school/pilot', '/terms', '/understand', '/validation', '/countries',
]);

function nextWithLocale(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-politangle-locale', locale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.cookies.set('politangle_locale', locale, {
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export function middleware(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').filter(Boolean);
  const pathLocale = parts[0] && locales.has(parts[0]) ? parts[0] : null;

  // English country pages are canonical at /countries; /en/countries has no route.
  if (pathLocale === 'en' && parts[1] === 'countries') {
    const url = request.nextUrl.clone();
    url.pathname = '/' + parts.slice(1).join('/');
    return NextResponse.redirect(url);
  }
  if (pathLocale) return nextWithLocale(request, pathLocale);

  const saved = request.cookies.get('politangle_locale')?.value;
  const localizablePath =
    localizedPaths.has(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith('/countries/');

  if (saved && saved !== 'en' && locales.has(saved) && localizablePath) {
    const url = request.nextUrl.clone();
    url.pathname = `/${saved}${request.nextUrl.pathname === '/' ? '' : request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }

  return nextWithLocale(request, 'en');
}

export const config = { matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'] };
