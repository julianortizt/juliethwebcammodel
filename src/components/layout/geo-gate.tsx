'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkGeoRestriction } from '@/lib/geo'
import { Button } from '@/components/ui/button'

interface GeoGateProps {
  onAllow?: () => void
  onBlock?: () => void
}

export function GeoGate({ onAllow }: GeoGateProps) {
  useEffect(() => {
    onAllow?.()
  }, [])
  return null
}
