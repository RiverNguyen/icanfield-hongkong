import createMiddleware from 'next-intl/middleware'
import {NextRequest, NextResponse} from 'next/server'
import {routing} from './i18n/routing'

const intlMiddleware = createMiddleware(routing)
const locales = routing.locales as readonly string[]

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const segment1 = pathname.split('/').filter(Boolean)[0]

  // Nếu segment đầu không phải locale → rewrite nội bộ sang /zh/... (URL trình duyệt vẫn giữ nguyên, không thành /zh)
  if (segment1 && !locales.includes(segment1)) {
    const defaultLocale = routing.defaultLocale
    const rewritten = new URL(
      `/${defaultLocale}${pathname.startsWith('/') ? pathname : '/' + pathname}`,
      request.url
    )
    return NextResponse.rewrite(rewritten)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
