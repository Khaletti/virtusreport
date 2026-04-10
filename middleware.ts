import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'de', 'fr', 'es'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasLocale = locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();
  const lang = request.headers.get('accept-language')?.split(',')[0].split('-')[0] ?? 'en';
  const locale = locales.includes(lang) ? lang : 'en';
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = { matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)'] };
