'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { GeoGate } from '@/components/layout/geo-gate'
import {
  Play,
  Users,
  Heart,
  Video,
  Star,
  Sparkles,
  ArrowRight,
  Shield,
  Globe,
} from 'lucide-react'

const features = [
  {
    icon: Play,
    title: 'Transmisiones en Vivo',
    description:
      'Disfruta de mis sesiones en vivo con interacción real y momentos auténticos.',
  },
  {
    icon: Heart,
    title: 'Contenido Exclusivo',
    description:
      'Contenido premium solo para mis suscriptores más cercanos.',
  },
  {
    icon: Users,
    title: 'Comunidad VIP',
    description:
      'Únete a una comunidad selecta de fans con acceso a eventos especiales.',
  },
  {
    icon: Video,
    title: 'Video Calls',
    description:
      'Programa llamadas de video privadas para una experiencia personalizada.',
  },
  {
    icon: Star,
    title: 'Contenido para Suscriptores',
    description:
      'Fotos y videos exclusivos que no encontrarás en ningún otro lugar.',
  },
  {
    icon: Sparkles,
    title: 'Experiencias Únicas',
    description:
      'Cada sesión es única, creada especialmente para ti con atención al detalle.',
  },
]

const stats = [
  { value: '15K+', label: 'Fans felices', icon: Heart },
  { value: '24/7', label: 'Disponible', icon: Globe },
  { value: '50K+', label: 'Regalos recibidos', icon: Star },
  { value: '100%', label: 'Colombiana', icon: Shield },
]

export default function HomePage() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([])

  useEffect(() => {
    setMounted(true)
    setParticles(Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    })))
  }, [])

  return (
    <>
      <GeoGate />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-pink-400/30 rounded-full animate-pulse"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                  {t('home.bio').split('.')[0]}
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">{t('home.welcome')}.</span>
                  <br />
                  <span className="gradient-text">
                    {t('home.subtitle').split(',')[0]}
                  </span>
                </h1>
              </div>

              <p className="text-xl text-white/60 max-w-lg leading-relaxed">
                {t('home.bio')}
                <br />
                <span className="text-white/40 mt-4 block">
                  📍 {t('home.location')}
                </span>
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/subscribe">
                  <Button size="lg" className="group">
                    <Sparkles className="w-5 h-5 group-hover:rotate-60 transition-transform" />
                    {t('home.subscribeNow')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/live">
                  <Button size="lg" variant="secondary" className="group">
                    <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                    {t('home.watchTrail')}
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/20 transition-all"
                  >
                    <stat.icon className="w-5 h-5 text-pink-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Model showcase */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-strong glow">
                {/* Main image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 opacity-30 animate-pulse" />
                      <div className="absolute inset-4 rounded-full bg-gray-900/60 border border-white/10 flex items-center justify-center overflow-hidden">
                        <span className="text-6xl sm:text-7xl">👩</span>
                      </div>
                      {/* Glow rings */}
                      <div className="absolute -inset-4 rounded-full border border-pink-500/20 animate-ping opacity-20" />
                      <div className="absolute -inset-8 rounded-full border border-fuchsia-500/10 animate-pulse opacity-10" />
                    </div>
                  </div>
                </div>

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-950/90 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {t('home.modelName')}
                  </h3>
                  <p className="text-sm text-white/60 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {t('home.location')} · En vivo ahora
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-3 shadow-xl float">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💝</span>
                  <div>
                    <div className="text-sm font-semibold">
                      5,000+ Amigos
                    </div>
                    <div className="text-xs text-white/50">
                      en la comunidad
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="relative py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              ¿Qué obtendrás como{' '}
              <span className="gradient-text">suscriptor</span>?
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Cada suscripción es más que una membresía, es acceso a un
              mundo exclusivo creado para ti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-pink-500/20 hover:bg-white/[0.04] transition-all duration-500 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-rose-500/30 group-hover:to-fuchsia-500/30 transition-all">
                  <feature.icon className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 via-fuchsia-900/10 to-purple-900/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-3xl p-10 md:p-16 glow">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              ¿Listo para una{' '}
              <span className="gradient-text">experiencia única</span>?
            </h2>

            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Únete a miles de fans felices y obtén acceso exclusivo a todo mi
              contenido.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/subscribe">
                <Button size="lg" className="group">
                  Empezar ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/gifts">
                <Button size="lg" variant="secondary">
                  🎁 Ver regalos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-16 bg-gray-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
            {['Visa', 'Mastercard', 'American Express', 'PayPal', 'Stripe'].map(
              (brand) => (
                <div
                  key={brand}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-white/40 text-sm font-medium flex items-center gap-2"
                >
                  {brand}
                </div>
              )
            )}
          </div>
          <p className="text-center text-white/30 text-sm mt-8">
            Pagos seguros y encriptados con tecnología de punta
          </p>
        </div>
      </section>
    </>
  )
}
