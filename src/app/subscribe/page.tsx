'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import {
  Check,
  Heart,
  Zap,
  Shield,
  MessageCircle,
  Diamond,
  Star,
  ArrowRight,
  X,
} from 'lucide-react'

const plans = [
  {
    id: 'monthly',
    name: 'Mensual',
    price: 29,
    period: '/mes',
    originalPrice: null,
    badge: null,
    features: [
      'Acceso ilimitado al chat en vivo',
      'Prioridad en mensajes',
      'Contenido exclusivo para suscriptores',
      'Soporte prioritario',
      'Genera ingresos directamente',
    ],
    cta: 'Suscribirse',
    highlight: false,
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 290,
    period: '/año',
    originalPrice: 348,
    badge: 'ahorra-20',
    features: [
      'Todo lo del plan mensual',
      'Ahorro del 20%',
      'Contenido VIP exclusivo',
      'Llamadas de video mensuales',
      'Prioridad total en regalos',
      'Eventos exclusivos VIP',
    ],
    cta: 'Ahorrar 20%',
    highlight: true,
  },
]

const faq = [
  {
    question: '¿Cómo funciona la suscripción?',
    answer:
      'Al suscribirte, recibes acceso a todo el contenido exclusivo de Julieth. Tu suscripción se renueva automáticamente cada mes o año según elijas, y puedes cancelarla en cualquier momento desde tu perfil.',
  },
  {
    question: '¿Es seguro pagar por Stripe?',
    answer:
      'Sí, usamos Stripe, el procesador de pagos más seguro del mundo. Tus datos bancarios están encriptados y nunca se almacenan en nuestros servidores.',
  },
  {
    question: '¿Puedo cancelar cuando quiera?',
    answer:
      'Absolutamente. Puedes cancelar tu suscripción en cualquier momento desde tu perfil. No hay penalizaciones ni costos ocultos.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos todas las tarjetas de crédito y débito principaless (Visa, Mastercard, American Express) y pagos con PayPal.',
  },
]

export default function SubscribePage() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      toast.error('Debes iniciar sesión para suscribirte')
      return
    }

    setLoadingPlan(planId)
    try {
      const res = await fetch('/api/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planId,
          successUrl: `${window.location.origin}/subscribe?success=true`,
          cancelUrl: `${window.location.origin}/subscribe?canceled=true`,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error || 'Error al crear la suscripción')
      }
    } catch {
      toast.error('Error de conexión')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950">
      {/* Success/Canceled messages */}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-8 text-center animate-in fade-in">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold text-emerald-300 mb-1">
            ¡Suscripción exitosa!
          </h2>
          <p className="text-emerald-400/70">
            Gracias por tu apoyo. Ya eres parte de la comunidad VIP.
          </p>
        </div>
      )}

      {canceled && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8 text-center animate-in fade-in">
          <div className="text-4xl mb-2">🤗</div>
          <h2 className="text-2xl font-bold text-amber-300 mb-1">
            Sesión cancelada
          </h2>
          <p className="text-amber-400/70">
            No se completó el pago. Puedes intentarlo de nuevo cuando quieras.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('subscribe.title')}
          </h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Elige tu plan y obtén acceso a todo el contenido exclusivo de
            Julieth
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              hoverable
              className={`relative ${plan.highlight ? 'border-pink-500/30 shadow-2xl shadow-pink-500/10 scale-105 z-10' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-sm font-semibold shadow-lg">
                    ⭐ Más popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.period}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-white mb-1">
                    ${plan.price}
                    <span className="text-xl text-white/50"> USD</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-lg text-white/40 line-through mb-2">
                      ${plan.originalPrice} USD
                    </div>
                  )}
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge variant="success" className="cursor-default">
                      <Check className="w-3 h-3 mr-1" />
                      {plan.badge === 'ahorra-20' ? 'Ahorra 20%' : plan.badge}
                    </Badge>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check
                        className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"
                        fill="currentColor"
                      />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loadingPlan !== null}
                  className={`w-full ${plan.highlight ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500' : ''}`}
                  size="lg"
                >
                  {loadingPlan === plan.id ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((item, i) => (
              <Card key={i} className="overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  onClick={() => {
                    const content = document.getElementById(`faq-${i}`)
                    if (content) {
                      content.style.display =
                        content.style.display === 'none' ? 'block' : 'none'
                    }
                  }}
                >
                  <span className="font-medium text-white pr-4">
                    {item.question}
                  </span>
                  <X
                    className={`w-5 h-5 text-white/40 transition-transform ${
                      false ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-${i}`}
                  className="px-5 pb-5 text-sm text-white/60 leading-relaxed"
                >
                  {item.answer}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-white/40 text-sm">
            <Shield className="w-4 h-4" />
            <span>Pagos seguros procesados por Stripe</span>
          </div>
        </div>
      </div>
    </div>
  )
}
