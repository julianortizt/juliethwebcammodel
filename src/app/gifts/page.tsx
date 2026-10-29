'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import toast from 'react-hot-toast'
import {
  Flower2,
  Candy,
  Diamond,
  Heart,
  Crown,
  Sparkles,
  Send,
  Star,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const giftOptions = [
  {
    id: 'rose',
    name: 'Rosas',
    price: 5,
    emoji: '🌹',
    icon: Flower2,
    description: 'Un ramo de rosas virtuales para alegrar su día',
    popular: false,
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    price: 10,
    emoji: '🍫',
    icon: Candy,
    description: 'Dulces momentos compartidos virtualmente',
    popular: false,
  },
  {
    id: 'jewelry',
    name: 'Joyas',
    price: 50,
    emoji: '💎',
    icon: Diamond,
    description: 'Un detalle especial con valor eterno',
    popular: true,
  },
  {
    id: 'dream',
    name: 'De tu amor',
    price: 100,
    emoji: '💕',
    icon: Heart,
    description: 'El regalo más significativo que puedes dar',
    popular: false,
  },
  {
    id: 'luxury',
    name: 'Lujo',
    price: 500,
    emoji: '👑',
    icon: Crown,
    description: 'Para los verdaderos amantes del lujo',
    popular: false,
  },
]

export default function GiftsPage() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [selectedGift, setSelectedGift] = useState<string | null>('jewelry')
  const [customMessage, setCustomMessage] = useState('')
  const [sending, setSending] = useState(false)

  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  const selectedGiftData = giftOptions.find((g) => g.id === selectedGift)

  const handleSendGift = async () => {
    if (!selectedGiftData) return
    if (!session) {
      toast.error('Debes iniciar sesión para enviar regalos')
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/create-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          giftId: selectedGift,
          message: customMessage || undefined,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error || 'Error al enviar el regalo')
      }
    } catch {
      toast.error('Error de conexión')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950">
      {/* Success message */}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-8 text-center animate-in fade-in">
          <div className="text-4xl mb-2">🎁</div>
          <h2 className="text-2xl font-bold text-emerald-300 mb-1">
            ¡Regalo enviado!
          </h2>
          <p className="text-emerald-400/70">
            Julieth lo recibirá con mucho cariño. ¡Gracias por tu apoyo!
          </p>
        </div>
      )}

      {canceled && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8 text-center animate-in fade-in">
          <div className="text-4xl mb-2">🤗</div>
          <h2 className="text-2xl font-bold text-amber-300 mb-1">
            Pago cancelado
          </h2>
          <p className="text-amber-400/70">
            No se completó el pago. Puedes intentarlo de nuevo cuando quieras.
          </p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('gifts.title')}
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {t('gifts.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Gift grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {giftOptions.map((gift) => (
                <Card
                  key={gift.id}
                  hoverable
                  className={`cursor-pointer transition-all ${
                    selectedGift === gift.id
                      ? 'border-pink-500/50 shadow-xl shadow-pink-500/10 scale-105'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                  onClick={() => setSelectedGift(gift.id)}
                >
                  <CardContent className="p-5 text-center">
                    <div
                      className={`text-5xl mb-3 transition-all ${
                        selectedGift === gift.id ? 'scale-110' : ''
                      }`}
                    >
                      {gift.emoji}
                    </div>
                    <h3 className="font-semibold text-white mb-1">
                      {gift.name}
                    </h3>
                    <p className="text-sm text-white/50 mb-3 line-clamp-2">
                      {gift.description}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-bold text-pink-300">
                        {formatCurrency(gift.price, 'USD')}
                      </span>
                      {gift.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs">
                          Popular
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Gift detail / checkout */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {selectedGiftData && (
                  <>
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">
                        {selectedGiftData.emoji}
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {selectedGiftData.name}
                      </h2>
                      <p className="text-3xl font-bold text-pink-300 mb-2">
                        {formatCurrency(selectedGiftData.price, 'USD')}
                      </p>
                      <p className="text-sm text-white/50">
                        {selectedGiftData.description}
                      </p>
                    </div>

                    {/* Message input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        {t('gifts.yourMessage')}
                      </label>
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Escribe un mensaje especial..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 transition-colors text-sm resize-none h-24"
                      />
                    </div>

                    {/* Send button */}
                    <Button
                      onClick={handleSendGift}
                      disabled={sending || !session}
                      className="w-full"
                      size="lg"
                    >
                      {sending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          {t('gifts.sending')}
                        </span>
                      ) : !session ? (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Inicia sesión para enviar
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          {t('gifts.send')}
                        </span>
                      )}
                    </Button>

                    {!session && (
                      <p className="text-center text-sm text-white/40 mt-4">
                        <a
                          href="/login"
                          className="text-pink-400 hover:text-pink-300 transition-colors"
                        >
                          Inicia sesión
                        </a>{' '}
                        para enviar regalos directamente
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent gifts preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            🎁 Regalos que hacen la diferencia
          </h2>
          <div className="flex flex-wrap justify-center gap-4 opacity-30">
            {[...giftOptions, ...giftOptions].map((gift, i) => (
              <div
                key={`${gift.id}-${i}`}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/5"
              >
                <span className="text-2xl">{gift.emoji}</span>
                <span className="ml-2 text-sm text-white/50">
                  {formatCurrency(gift.price, 'USD')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
