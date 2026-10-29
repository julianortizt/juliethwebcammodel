import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/api/', '/_next/', '/favicon.ico', '/robots.txt']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir rutas públicas
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Permitir archivos estáticos
  if (
    pathname.includes('.') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/fonts/')
  ) {
    return NextResponse.next()
  }

  // GEO-RESTRICTION DISABLED FOR DEVELOPMENT
  // const { allowed } = checkGeoRestriction(request)
  // if (!allowed) {
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/geo-blocked'
  //   return NextResponse.redirect(url)
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
