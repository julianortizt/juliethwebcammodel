'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Gift,
  Heart,
  Crown,
  Diamond,
  Flower2,
  Candy,
  TrendingUp,
  User,
} from 'lucide-react'

interface Gift {
  id: string
  type: string
  name: string
  amount: number
  message: string | null
  isPublic: boolean
  status: string
  createdAt: string
  user: {
    name: string | null
    country: string | null
  }
}

const giftIcons: Record<string, React.ElementType> = {
  rose: Flower2,
  chocolate: Candy,
  jewelry: Diamond,
  dream: Heart,
  luxury: Crown,
  gift: Gift,
}

export default function AdminGifts() {
  const { t } = useTranslation()
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Datos simulados
    setGifts([
      {
        id: '1',
        type: 'jewelry',
        name: '💎 Joyas',
        amount: 50000,
        message: '¡Feliz cumpleaños Julieth! 🥳',
        isPublic: true,
        status: 'completed',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Carlos_M', country: 'CO' },
      },
      {
        id: '2',
        type: 'rose',
        name: '🌹 Rosas',
        amount: 5000,
        message: 'Te quiero mucho ❤️',
        isPublic: true,
        status: 'completed',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Ana_L', country: 'CO' },
      },
      {
        id: '3',
        type: 'luxury',
        name: '👑 Lujo',
        amount: 500000,
        message: 'Eres la única para mí',
        isPublic: false,
        status: 'completed',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Miguel_A', country: 'CO' },
      },
      {
        id: '4',
        type: 'dream',
        name: '💕 De tu amor',
        amount: 100000,
        message: 'Siempre en mi corazón 💝',
        isPublic: true,
        status: 'completed',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Laura_G', country: 'CO' },
      },
    ])
    setLoading(false)
  }, [])

  const totalGifts = gifts.length
  const totalValue = gifts.reduce((sum, g) => sum + g.amount, 0)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(amount)
  }
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  if (loading) {
    return (
      <div className="p-12">
        <div className="w-8 h-8 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin mx-auto" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          {t('admin.gifts')}
        </h1>
        <p className="text-white/50">
          {totalGifts} regalos recibidos · {formatCurrency(totalValue)} en total
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="p-4">
            <Gift className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{totalGifts}</p>
            <p className="text-xs text-white/50">Total regalos</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <TrendingUp className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalValue)}
            </p>
            <p className="text-xs text-white/50">Valor total</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {(totalValue / (totalGifts || 1)).toLocaleString('es-CO')} COP
            </p>
            <p className="text-xs text-white/50">Promedio por regalo</p>
          </CardContent>
        </Card>
      </div>

      {/* Gifts list */}
      <div className="space-y-4">
        {gifts.map((gift) => {
          const Icon = giftIcons[gift.type] || Gift
          return (
            <Card key={gift.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-2xl shrink-0">
                    <Icon className="w-7 h-7 text-amber-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {gift.name}
                        </h3>
                        <p className="text-sm text-white/50 flex items-center gap-2 mt-0.5">
                          <User className="w-3.5 h-3.5" />
                          {gift.user.name || 'Anónimo'}
                          {gift.user.country && (
                            <Badge className="text-xs" variant="success">
                              {gift.user.country}
                            </Badge>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-400">
                          {formatCurrency(gift.amount)}
                        </p>
                        <p className="text-xs text-white/30">
                          {formatDate(gift.createdAt)}
                        </p>
                      </div>
                    </div>

                    {gift.message && (
                      <p className="text-sm text-white/60 italic bg-white/5 rounded-xl p-3">
                        "{gift.message}"
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-3">
                      <Badge
                        variant={gift.isPublic ? 'success' : 'info'}
                        className="text-xs"
                      >
                        {gift.isPublic ? 'Público' : 'Privado'}
                      </Badge>
                      <Badge variant="success" className="text-xs">
                        Recibido ✓
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {gifts.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">No hay regalos registrados</p>
        </div>
      )}
    </div>
  )
}
