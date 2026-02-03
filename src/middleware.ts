import createMiddleware from 'next-intl/middleware'
import {NextRequest, NextResponse} from 'next/server'
import {routing} from './i18n/routing'

const intlMiddleware = createMiddleware(routing)
const locales = routing.locales as readonly string[]

function safeDecodePath(pathname: string): string {
  try {
    return decodeURIComponent(pathname)
  } catch {
    return pathname
  }
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameDecoded = safeDecodePath(pathname)
  const segment1 = pathnameDecoded.split('/').filter(Boolean)[0]

  // Nếu segment đầu không phải locale (vd. slug tiếng Trung 加拿大) → rewrite nội bộ sang /zh/...
  if (segment1 && !locales.includes(segment1)) {
    const defaultLocale = routing.defaultLocale
    const pathNormalized = pathnameDecoded.startsWith('/') ? pathnameDecoded : '/' + pathnameDecoded
    // Dùng path đã encode (ASCII) để Vercel/Edge match route ổn định với slug Unicode
    const segments = pathNormalized.split('/').filter(Boolean)
    const encodedPath =
      '/' + defaultLocale + '/' + segments.map((s) => encodeURIComponent(s)).join('/')
    const rewritten = new URL(encodedPath, request.url)
    return NextResponse.rewrite(rewritten)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
