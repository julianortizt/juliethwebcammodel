'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-auto bg-black/60 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-white font-bold text-xl">Julieth Webcam Model</span>
            </Link>
            <p className="text-white/50 text-sm max-w-sm">
              {t('home.bio')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link
                  href="/live"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {t('nav.live')}
                </Link>
              </li>
              <li>
                <Link
                  href="/subscribe"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {t('nav.subscribe')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              Plataformas
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://onlyfans.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  OnlyFans
                </a>
              </li>
              <li>
                <a
                  href="https://chaturbate.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Chaturbate
                </a>
              </li>
              <li>
                <a
                  href="https://www.myfreecams.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  MyFreeCams
                </a>
              </li>
              <li>
                <a
                  href="https://stripchat.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Stripchat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-white/40 text-sm">
            Hecho con 💕 en Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
