'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function GeoBlockedPage() {
  const [country, setCountry] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/geo-check')
      .then((res) => res.json())
      .then((data) => setCountry(data.country))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-red-950/20 to-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-white mb-3">
          🇨🇴 Acceso Restringido
        </h1>

        <p className="text-lg text-white/60 mb-2">
          Este sitio web solo está disponible para usuarios ubicados en
        </p>
        <p className="text-xl font-bold text-pink-300 mb-6">Colombia</p>

        {country && (
          <p className="text-sm text-white/40 mb-8">
            Tu ubicación detectada: <span className="text-white/60">{country}</span>
          </p>
        )}

        <div className="space-y-4">
          <Button
            size="lg"
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-rose-500 to-fuchsia-500"
          >
            Intentar acceder
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Verificar ubicación nuevamente
          </Button>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5">
          <p className="text-xs text-white/30">
            Si crees que esto es un error y estás en Colombia, contacta con
            soporte.
          </p>
        </div>
      </div>
    </div>
  )
}
