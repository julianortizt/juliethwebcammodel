import { NextResponse } from 'next/server'
import { checkGeoRestriction } from '@/lib/geo'

export async function GET(request: Request) {
  const { allowed, country, ip } = checkGeoRestriction(request)

  // Si viene de middleware, ya verificamos
  if (request.headers.get('x-requested-with') === 'middleware-geo-check') {
    return NextResponse.json({ allowed, country, ip })
  }

  // Bloquear si no es de Colombia
  if (!allowed) {
    return NextResponse.json(
      {
        error: 'Acceso restringido',
        message: 'Este sitio solo está disponible desde Colombia',
        country,
        ip,
      },
      { status: 403 }
    )
  }

  return NextResponse.json({ allowed, country, ip })
}
