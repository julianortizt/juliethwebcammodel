'use client'

import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Image as ImageIcon } from 'lucide-react'

export default function GalleryPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <ImageIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('nav.gallery')}</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Galería de fotos y videos exclusivos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} hoverable className="aspect-square overflow-hidden group cursor-pointer">
              <CardContent className="p-0 h-full">
                <div className="h-full bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-gray-900 flex items-center justify-center relative overflow-hidden">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📸</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-xs text-white/80">Foto {i}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
