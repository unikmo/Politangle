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
  response.cookies.set('politangle_locale', locale, {
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export function middleware(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').filter(Boolean);
  const pathLocale = parts[0] && locales.has(parts[0]) ? parts[0] : null;

  if (pathLocale) return nextWithLocale(request, pathLocale);

  const saved = request.cookies.get('politangle_locale')?.value;
  const localizablePath =
    localizedPaths.has(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith('/countries/');

  if (saved && locales.has(saved) && localizablePath) {
    const url = request.nextUrl.clone();
    url.pathname = `/${saved}${request.nextUrl.pathname === '/' ? '' : request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }

  return nextWithLocale(request, 'en');
}

export const config = { matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'] };
