'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MessageCircle,
  Check,
  Clock,
  Trash2,
  Eye,
  Ban,
} from 'lucide-react'

interface Message {
  id: string
  content: string
  isPrivate: boolean
  status: string
  createdAt: string
  user: {
    name: string | null
    email: string
    country: string | null
  }
}

export default function AdminMessages() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all')

  useEffect(() => {
    // Simulación de mensajes
    setMessages([
      {
        id: '1',
        content: 'Hola Julieth! Me encanta tu contenido ❤️',
        isPrivate: false,
        status: 'approved',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Karina_95', email: 'karina@example.com', country: 'CO' },
      },
      {
        id: '2',
        content: 'Qué lindo perfil tienes 😊',
        isPrivate: false,
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Miguel_C', email: 'miguel@example.com', country: 'CO' },
      },
      {
        id: '3',
        content: 'Eres la mejor modelo de Colombia 🇨🇴',
        isPrivate: true,
        status: 'pending',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        user: { name: 'Laura_M', email: 'laura@example.com', country: 'CO' },
      },
      {
        id: '4',
        content: '¡Feliz día! 🌹',
        isPrivate: false,
        status: 'approved',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Pedro_R', email: 'pedro@example.com', country: 'CO' },
      },
    ])
    setLoading(false)
  }, [])

  const filteredMessages =
    filter === 'all'
      ? messages
      : messages.filter((m) => m.status === filter)

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const toggleStatus = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'pending' ? 'approved' : 'pending' }
          : m
      )
    )
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            {t('admin.messages')}
          </h1>
          <p className="text-white/50">
            {messages.length} mensajes en total
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'pending', 'approved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendientes' : 'Aprobados'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-400 flex-shrink-0 flex items-center justify-center text-lg font-bold text-white">
                  {message.user.name?.charAt(0) || '?'}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div>
                      <span className="text-sm font-medium text-white">
                        {message.user.name || 'Anónimo'}
                      </span>
                      <span className="text-xs text-white/30 ml-2">
                        {message.user.email}
                      </span>
                      {message.user.country && (
                        <Badge className="ml-2 text-xs">
                          {message.user.country}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-white/30 shrink-0">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 mb-3">
                    <p className="text-white/80">
                      {message.content}
                      {message.isPrivate && (
                        <Badge variant="info" className="inline ml-2 text-xs">
                          Privado
                        </Badge>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {message.status === 'pending' ? (
                        <Badge variant="warning" className="gap-1">
                          <Clock className="w-3 h-3" />
                          {t('errors.generic')}
                        </Badge>
                      ) : (
                        <Badge variant="success" className="gap-1">
                          <Check className="w-3 h-3" />
                          Aprobado
                        </Badge>
                      )}
                      {message.isPrivate && (
                        <Badge variant="info" className="gap-1">
                          <Eye className="w-3 h-3" />
                          Privado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleStatus(message.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          message.status === 'pending'
                            ? 'text-emerald-400 hover:bg-emerald-500/10'
                            : 'text-pink-400 hover:bg-pink-500/10'
                        }`}
                        title={
                          message.status === 'pending'
                            ? 'Aprobar'
                            : 'Pendiente'
                        }
                      >
                        {message.status === 'pending' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </button>
                      <button className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">No hay mensajes para filtrar</p>
        </div>
      )}
    </div>
  )
}
