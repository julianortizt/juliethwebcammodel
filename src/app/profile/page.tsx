'use client'

import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Mail, Shield } from 'lucide-react'
import { redirect } from 'next/navigation'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const { t } = useTranslation()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 flex items-center justify-center pt-24">
        <div className="w-8 h-8 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <span className="text-white font-bold text-3xl">
              {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{session?.user?.name || 'Usuario'}</h1>
          <p className="text-white/60">{session?.user?.email}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-pink-400" />
              Información de perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <Mail className="w-5 h-5 text-white/50" />
              <div>
                <p className="text-sm text-white/50">Correo electrónico</p>
                <p className="text-white">{session?.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <Shield className="w-5 h-5 text-white/50" />
              <div>
                <p className="text-sm text-white/50">Rol</p>
                <p className="text-white capitalize">{session?.user?.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
