'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Heart,
  Gift,
  DollarSign,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
} from 'lucide-react'

interface Stats {
  totalUsers: number
  activeSubscribers: number
  totalGifts: number
  totalRevenue: number
  pendingMessages: number
}

interface RecentUser {
  id: string
  name: string | null
  email: string
  country: string | null
  createdAt: string
}

interface RecentGift {
  id: string
  type: string
  name: string
  amount: number
  user: { name: string | null }
  createdAt: string
}

interface RecentMessage {
  id: string
  content: string
  user: { name: string | null }
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const { t } = useTranslation()
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [recentGifts, setRecentGifts] = useState<RecentGift[]>([])
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats)
        setRecentUsers(data.recentUsers || [])
        setRecentGifts(data.recentGifts || [])
        setRecentMessages(data.recentMessages || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-12">
        <div className="w-8 h-8 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin mx-auto" />
      </div>
    )
  }

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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          {t('admin.dashboard')}
        </h1>
        <p className="text-white/50">
          {new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {stats?.totalUsers || 0}
                </p>
                <p className="text-sm text-white/50">{t('admin.totalUsers')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {stats?.activeSubscribers || 0}
                </p>
                <p className="text-sm text-white/50">
                  {t('admin.activeSubscribers')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                <Gift className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {stats?.totalGifts || 0}
                </p>
                <p className="text-sm text-white/50">{t('admin.totalGifts')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(stats?.totalRevenue || 0)}
                </p>
                <p className="text-sm text-white/50">{t('admin.revenue')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-pink-400" />
              {t('admin.pendingMessages')} ({stats?.pendingMessages || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-400 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
                      {msg.user.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-pink-300">
                          {msg.user.name || 'Anónimo'}
                        </span>
                        <Badge
                          variant={msg.status === 'pending' ? 'warning' : 'success'}
                          className="text-xs"
                        >
                          {msg.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 mt-1 line-clamp-2">
                        {msg.content}
                      </p>
                      <span className="text-xs text-white/30">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/40 text-sm text-center py-4">
                  {t('admin.noUsers')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent gifts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" />
              {t('admin.recentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {recentGifts.length > 0 ? (
                recentGifts.map((gift) => (
                  <div
                    key={gift.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-xl">
                      {gift.type === 'gift' ? '🎁' : '💝'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          {gift.name}
                        </span>
                        <span className="text-sm font-semibold text-amber-400">
                          {formatCurrency(gift.amount)}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mt-0.5">
                        de {gift.user.name || 'Anónimo'} ·{' '}
                        {formatDate(gift.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/40 text-sm text-center py-4">
                  No hay actividad reciente
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent users */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Registro reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-white/40 border-b border-white/5">
                  <th className="pb-3 font-medium">Usuario</th>
                  <th className="pb-3 font-medium">Correo</th>
                  <th className="pb-3 font-medium">País</th>
                  <th className="pb-3 font-medium">Registrado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-400 flex items-center justify-center text-xs font-bold text-white">
                          {user.name?.charAt(0) || '?'}
                        </div>
                        <span className="text-sm text-white">
                          {user.name || 'Anónimo'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-white/50">{user.email}</td>
                    <td className="py-3">
                      <Badge>{user.country || 'Desconocido'}</Badge>
                    </td>
                    <td className="py-3 text-sm text-white/50">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
