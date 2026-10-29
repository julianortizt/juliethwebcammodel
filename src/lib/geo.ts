import { getCountryFromIp, getClientIp } from '@/lib/utils'

const ALLOWED_COUNTRIES = (process.env.ALLOWED_COUNTRIES || 'CO').split(',')

export function isAllowedCountry(countryCode: string | null): boolean {
  if (!countryCode) return false
  return ALLOWED_COUNTRIES.includes(countryCode.toUpperCase())
}

export function checkGeoRestriction(request: Request): {
  allowed: boolean
  country: string | null
  ip: string | null
} {
  const ip = getClientIp(request)
  const country = ip ? getCountryFromIp(ip) : null
  const allowed = isAllowedCountry(country)
  return { allowed, country, ip }
}

export function geoBlockResponse(): Response {
  return new Response(
    JSON.stringify({
      error: 'Acceso no permitido',
      message: 'Este sitio solo está disponible desde Colombia',
    }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
