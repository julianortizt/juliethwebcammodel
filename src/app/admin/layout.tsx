'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  Users,
  MessageCircle,
  Gift,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'admin.dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'admin.users', icon: Users },
  { href: '/admin/messages', label: 'admin.messages', icon: MessageCircle },
  { href: '/admin/gifts', label: 'admin.gifts', icon: Gift },
  { href: '/admin/settings', label: 'admin.settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin') {
        router.push('/')
      }
    } else if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin" />
      </div>
    )
  }

  if (session?.user?.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-gray-900/80 backdrop-blur-xl border-r border-white/5 p-6 overflow-y-auto">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">Admin Panel</p>
              <p className="text-xs text-white/50">
                {session.user?.email}
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5 group"
              >
                <item.icon className="w-5 h-5 text-white/50 group-hover:text-pink-400 transition-colors" />
                {t(item.label)}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={() => {
                // Handle logout
                window.location.href = '/api/auth/signout?callbackUrl=/'
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
            >
              <LogOut className="w-5 h-5" />
              {t('nav.logout')}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="ml-64">{children}</main>
      </div>
    </div>
  )
}
