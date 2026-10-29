import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '@/i18n/config'
import '@/styles/globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToastContainer } from '@/components/ui/toast'
import { SessionProvider } from '@/components/providers/session-provider'

export const metadata: Metadata = {
  title: {
    default: "Julieth Webcam Model",
    template: '%s | Julieth Webcam Model',
  },
  description:
    'Descubre un mundo de emociones con Julieth Webcam Model. Experiencias exclusivas, chats en vivo y contenido premium.',
  keywords: ['webcam', 'colombiana', 'modelo', 'chat en vivo', 'suscripción'],
  authors: [{ name: 'Julieth Webcam Model', url: 'https://julieth.com' }],
  openGraph: {
    title: "Julieth Webcam Model",
    description: 'Emociones sinceras, momentos exclusivos',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Julieth Webcam Model',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Julieth Webcam Model",
    description: 'Emociones sinceras, momentos exclusivos',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>
        <SessionProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 text-white">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
          <ToastContainer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(20, 10, 30, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderRadius: '16px',
                padding: '14px 20px',
              },
              success: {
                iconTheme: {
                  primary: '#f472b6',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#f87171',
                  secondary: '#fff',
                },
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}
