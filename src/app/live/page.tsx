'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import {
  Send,
  Heart,
  Star,
  Crown,
  Diamond,
  Flower2,
  Candy,
  Camera,
  Users,
  Eye,
} from 'lucide-react'

const gifts = [
  { id: 'rose', name: 'Rosas', price: 5, emoji: '🌹', icon: Flower2 },
  { id: 'chocolate', name: 'Chocolate', price: 10, emoji: '🍫', icon: Candy },
  { id: 'jewelry', name: 'Joyas', price: 50, emoji: '💎', icon: Diamond },
  { id: 'dream', name: 'De tu amor', price: 100, emoji: '💕', icon: Heart },
  { id: 'luxury', name: 'Lujo', price: 500, emoji: '👑', icon: Crown },
]

// Simulación de mensajes del chat para demo
const mockChatMessages = [
  { id: '1', user: 'Karina_95', message: 'Hola Julieth! ❤️', time: '2 min' },
  { id: '2', user: 'Miguel_C', message: 'Que bonita eres 😍', time: '5 min' },
  { id: '3', user: 'Laura_M', message: 'Saludos desde Medellín!', time: '8 min' },
]

export default function LivePage() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [selectedGift, setSelectedGift] = useState<string | null>(null)
  const [giftAmount, setGiftAmount] = useState(5000)
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [sendingGift, setSendingGift] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // Demo: agregar mensaje de prueba
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      user: session?.user?.name?.split(' ')[0] || 'Anónimo',
      message: message.trim(),
      time: 'ahora',
    }
    setChatMessages((prev) => [...prev, newMessage])
    setMessage('')

    // Simular borrado de mensajes antiguos
    setTimeout(() => {
      setChatMessages((prev) => prev.slice(-50))
    }, 10000)
  }

  const handleSendGift = async () => {
    if (!selectedGift && giftAmount < 1000) return

    setSendingGift(true)
    try {
      if (selectedGift) {
        const res = await fetch('/api/create-gift', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            giftId: selectedGift,
            message: '¡Un regalo especial!',
          }),
        })
        const data = await res.json()
        if (data.url) {
          window.location.href = data.url
        }
      } else {
        toast.error('Selecciona un regalo del menú')
      }
    } catch {
      toast.error('Error al enviar el regalo')
    } finally {
      setSendingGift(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-gray-950 to-gray-950">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-white/5 sticky top-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <span className="text-2xl">👩</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{t('live.title')}</h1>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  En vivo
                  <span className="mx-2">·</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    1,247 espectadores
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-white/50">Gift de</div>
                <div className="text-sm font-medium text-pink-300">
                  {session?.user?.name?.split(' ')[0] || 'Invitado'}
                </div>
              </div>
              <Camera className="w-5 h-5 text-white/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video placeholder - main content */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/50 via-gray-900 to-gray-950 border border-white/10">
              {/* Simulated video feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 border border-pink-500/20 flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl">👩</span>
                  </div>
                  <p className="text-white/70 text-lg mb-2">
                    En Vivo - Julieth
                  </p>
                  <p className="text-white/50 text-sm">
                    Transmisión activa • Chatea y envía regalos
                  </p>
                </div>
              </div>

              {/* Overlay elements */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="success" className="gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  EN VIVO
                </Badge>
                <span className="px-3 py-1 rounded-full bg-black/50 text-white/70 text-sm">
                  1,247 viendo
                </span>
              </div>

              {/* Viewer animation */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['👩', '👨', '👩‍🦰', '👨‍🦱', '👩‍🦱'].slice(0, 4).map((emoji, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-900 flex items-center justify-center text-sm"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-white/50">+ 1,243</span>
              </div>
            </div>

            {/* Live chat */}
            <Card className="flex flex-col h-[400px]">
              <CardContent className="flex-1 flex flex-col p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-pink-400" />
                    Chat en vivo
                  </h3>
                  <span className="text-xs text-white/50">
                    {chatMessages.length} mensajes
                  </span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-400 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
                        {msg.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-pink-300">
                            {msg.user}
                          </span>
                          <span className="text-xs text-white/30">{msg.time}</span>
                        </div>
                        <p className="text-sm text-white/80 mt-0.5">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="flex gap-2 pt-3 border-t border-white/5"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('live.chatMessage')}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 transition-colors text-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!message.trim()}
                    className="shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Gift sidebar */}
          <div className="space-y-6">
            {/* Gift guide */}
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {t('gifts.title')}
                </h3>
                <p className="text-sm text-white/50 mb-4">
                  {t('gifts.subtitle')}
                </p>

                {/* Quick gift buttons */}
                <div className="space-y-2">
                  {gifts.map((gift) => (
                    <button
                      key={gift.id}
                      onClick={() => {
                        setSelectedGift(gift.id)
                        setGiftAmount(gift.price)
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        selectedGift === gift.id
                          ? 'bg-pink-500/20 border border-pink-500/30 shadow-lg shadow-pink-500/10'
                          : 'bg-white/5 border border-white/5 hover:border-white/10'
                      }`}
                    >
                      <span className="text-2xl">{gift.emoji}</span>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white">
                          {gift.name}
                        </div>
                        <div className="text-xs text-white/50">
                          {t('common.loading')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-pink-300">
                          ${gift.price} USD
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  {selectedGift && (
                    <>
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-1">
                          {gifts.find((g) => g.id === selectedGift)?.emoji}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {gifts.find((g) => g.id === selectedGift)?.name}
                        </div>
                        <div className="text-lg font-bold text-pink-300">
                          ${giftAmount} USD
                        </div>
                      </div>

                      <Button
                        onClick={handleSendGift}
                        disabled={sendingGift}
                        className="w-full"
                        size="lg"
                      >
                        {sendingGift ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            {t('gifts.sending')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            {t('gifts.send')}
                          </span>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
