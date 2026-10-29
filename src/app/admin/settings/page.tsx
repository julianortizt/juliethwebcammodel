'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Globe,
  DollarSign,
  Shield,
  CreditCard,
  Bell,
  Palette,
  Key,
} from 'lucide-react'

const settingsSections = [
  {
    icon: Globe,
    title: 'Idioma y región',
    description: 'Configuración de idiomas y restricciones geográficas',
    items: [
      {
        label: 'Idioma por defecto',
        type: 'select',
        options: [
          { value: 'es', label: 'Español' },
          { value: 'en', label: 'English' },
          { value: 'pt', label: 'Português' },
        ],
        value: 'es',
      },
      {
        label: 'Países permitidos',
        type: 'text',
        value: 'CO',
        description: 'Códigos ISO 3166-1 alpha-2 separados por coma',
        placeholder: 'CO, MX, AR',
      },
    ],
  },
  {
    icon: DollarSign,
    title: 'Pagos',
    description: 'Configuración de Stripe y precios',
    items: [
      {
        label: 'Clave secreta de Stripe',
        type: 'password',
        value: 'sk_test_••••••••',
        disabled: true,
      },
      {
        label: 'Clave pública de Stripe',
        type: 'text',
        value: 'pk_test_••••••••',
        disabled: true,
      },
      {
        label: 'Precio mensual (COP)',
        type: 'number',
        value: '45000',
        placeholder: '45000',
      },
      {
        label: 'Precio anual (COP)',
        type: 'number',
        value: '432000',
        placeholder: '432000',
      },
    ],
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Configuración de seguridad y verificación',
    items: [
      {
        label: 'Clave secreta de reCAPTCHA',
        type: 'password',
        value: '',
        placeholder: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        disabled: true,
      },
      {
        label: 'Clave del sitio de reCAPTCHA',
        type: 'text',
        value: '',
        placeholder: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        disabled: true,
      },
      {
        label: 'Trusted proxies',
        type: 'text',
        value: '127.0.0.1',
        placeholder: 'IP del servidor ó proxy',
        description: 'IPs de confianza para verificación de IP real',
      },
    ],
  },
  {
    icon: Palette,
    title: 'Apariencia',
    description: 'Configuración del tema visual',
    items: [
      {
        label: 'Tema',
        type: 'select',
        options: [
          { value: 'dark', label: 'Oscuro (por defecto)' },
          { value: 'light', label: 'Claro' },
          { value: 'auto', label: ' automático' },
        ],
        value: 'dark',
      },
      {
        label: 'Color primario',
        type: 'color',
        value: '#f472b6',
      },
      {
        label: 'Nombre del modelo',
        type: 'text',
        value: 'Julieth Webcam Model',
        placeholder: 'Nombre de la modelo',
      },
      {
        label: 'Descripción breve',
        type: 'textarea',
        value: 'Modelo webcam colombiana con pasión por conectar con cada espectador',
        placeholder: 'Descripción para SEO y meta tags',
      },
    ],
  },
]

export default function AdminSettings() {
  const { t } = useTranslation()
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Aquí guardaríamos las configuraciones en la BD
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          {t('admin.settings')}
        </h1>
        <p className="text-white/50">
          Configura tu sitio web desde aquí
        </p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="grid gap-2">
                    <label className="text-sm font-medium text-white/70">
                      {item.label}
                      {item.description && (
                        <span className="text-white/30 ml-2">
                          {item.description}
                        </span>
                      )}
                    </label>

                    {item.type === 'select' && (
                      <select
                        defaultValue={item.value}
                        disabled={item.disabled}
                        className={`px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500/50 ${
                          item.disabled ? 'opacity-50' : ''
                        }`}
                      >
                        {item.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {item.type === 'textarea' && (
                      <textarea
                        defaultValue={item.value}
                        placeholder={item.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 text-sm resize-none h-24"
                      />
                    )}

                    {(item.type === 'text' || item.type === 'number') && (
                      <Input
                        defaultValue={item.value}
                        placeholder={item.placeholder}
                        type={item.type === 'number' ? 'number' : 'text'}
                        disabled={item.disabled}
                        className={item.disabled ? 'opacity-50' : ''}
                      />
                    )}

                    {item.type === 'password' && (
                      <Input
                        type="password"
                        defaultValue={item.value}
                        placeholder={item.placeholder}
                        disabled={item.disabled}
                        className={item.disabled ? 'opacity-50' : ''}
                      />
                    )}

                    {item.type === 'color' && (
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          defaultValue={item.value}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        />
                        <Input
                          defaultValue={item.value}
                          type="text"
                          disabled
                          className="flex-1 font-mono text-sm"
                        />
                      </div>
                    )}

                    {item.disabled && (
                      <p className="text-xs text-white/30 mt-1">
                        Configuración de Stripe (editar en .env)
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Save button */}
        <div className="flex items-center gap-4 pt-4">
          <Button
            onClick={handleSave}
            disabled={saving}
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-fuchsia-500"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Guardando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                Guardar cambios
              </span>
            )}
          </Button>
          <p className="text-sm text-white/30">
            Los cambios se aplican automáticamente al guardar
          </p>
        </div>
      </div>
    </div>
  )
}
