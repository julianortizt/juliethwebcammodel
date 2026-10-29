'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { languages } from '@/i18n/config'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Menu,
  X,
  Globe,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  Heart,
  Video,
  Image,
  Users,
  Home,
} from 'lucide-react'

const navLinks = [
  { href: '/', label: 'nav.home', icon: Home },
  { href: '/gallery', label: 'nav.gallery', icon: Image },
  { href: '/live', label: 'nav.live', icon: Video },
  { href: '/subscribe', label: 'nav.subscribe', icon: Heart },
  { href: '/gifts', label: 'nav.gifts', icon: Heart },
]

const adminLinks = [
  { href: '/admin', label: 'admin.dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'admin.users', icon: Users },
  { href: '/admin/messages', label: 'admin.messages', icon: Settings },
  { href: '/admin/gifts', label: 'admin.gifts', icon: Heart },
  { href: '/admin/settings', label: 'admin.settings', icon: Settings },
]

export function Header() {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('language', code)
    setLangOpen(false)
  }

  const isAdmin = session?.user?.role === 'admin'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-shadow">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="hidden sm:block text-white font-bold text-xl tracking-tight">
              Julieth Webcam Model
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <link.icon className="w-4 h-4" />
                {t(link.label)}
              </Link>
            ))}
            {isAdmin && (
              <>
                <div className="w-px h-6 bg-white/10 mx-2" />
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-pink-300 hover:text-pink-200 hover:bg-pink-500/10 transition-all duration-300"
                  >
                    <link.icon className="w-4 h-4" />
                    {t(link.label)}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <Globe className="w-5 h-5" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2 animate-in fade-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangChange(lang.code)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all',
                        i18n.language === lang.code
                          ? 'bg-pink-500/20 text-pink-300'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                      {i18n.language === lang.code && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            {session ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 border border-pink-500/30 text-white text-sm font-medium hover:from-rose-500/30 hover:to-fuchsia-500/30 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-400 flex items-center justify-center text-xs font-bold">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:inline">
                    {session.user?.name || 'Usuario'}
                  </span>
                  <User className="w-4 h-4" />
                </button>
                {userOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-white/5">
                      <p className="text-sm font-medium text-white">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-white/50">{session.user?.email}</p>
                      {session.user?.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs">
                          Admin
                        </span>
                      )}
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <User className="w-4 h-4" />
                      {t('nav.profile')}
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-pink-300 hover:bg-pink-500/10 transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {t('admin.dashboard')}
                      </Link>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">{t('auth.register')}</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-xl border-t border-white/5 animate-in fade-in slide-in-from-top-2">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <link.icon className="w-5 h-5" />
                {t(link.label)}
              </Link>
            ))}
            {isAdmin && (
              <>
                <div className="border-t border-white/5 my-2" />
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-pink-300 hover:bg-pink-500/10 transition-all"
                  >
                    <link.icon className="w-5 h-5" />
                    {t(link.label)}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
