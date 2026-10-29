'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Search,
  User,
  MoreVertical,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Shield,
} from 'lucide-react'

interface User {
  id: string
  name: string | null
  email: string
  country: string | null
  role: string
  isActive: boolean
  createdAt: string
}

export default function AdminUsers() {
  const { t } = useTranslation()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')

  useEffect(() => {
    // Demo data
    setUsers([
      {
        id: '1',
        name: 'Carlos Mendoza',
        email: 'carlos@example.com',
        country: 'CO',
        role: 'user',
        isActive: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        name: 'María González',
        email: 'maria@example.com',
        country: 'CO',
        role: 'subscriber',
        isActive: true,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        name: 'Admin User',
        email: 'admin@julieth.com',
        country: 'CO',
        role: 'admin',
        isActive: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        name: 'Pedro Ramirez',
        email: 'pedro@example.com',
        country: 'MX',
        role: 'user',
        isActive: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ])
    setLoading(false)
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name?.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(amount)
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
            {t('admin.users')}
          </h1>
          <p className="text-white/50">
            {users.length} registrados en total
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <Input
              placeholder="Buscar usuarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500/50"
            >
              <option value="all">Todos los roles</option>
              <option value="user">Usuarios</option>
              <option value="subscriber">Suscriptores</option>
              <option value="admin">Administradores</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-white/40 border-b border-white/5 bg-white/5">
                  <th className="p-4 font-medium">Usuario</th>
                  <th className="p-4 font-medium">Correo</th>
                  <th className="p-4 font-medium">País</th>
                  <th className="p-4 font-medium">Rol</th>
                  <th className="p-4 font-medium">Estado</th>
                  <th className="p-4 font-medium">Registrado</th>
                  <th className="p-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-400 flex items-center justify-center text-sm font-bold text-white">
                          {user.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.name || 'Anónimo'}
                          </p>
                          {user.role === 'admin' && (
                            <Badge variant="danger" className="text-xs mt-0.5">
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-white/50">{user.email}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.country === 'CO'
                            ? 'success'
                            : user.country
                            ? 'info'
                            : 'default'
                        }
                      >
                        {user.country || '—'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.role === 'admin'
                            ? 'danger'
                            : user.role === 'subscriber'
                            ? 'success'
                            : 'default'
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user.isActive
                              ? 'bg-emerald-400'
                              : 'bg-red-400'
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            user.isActive ? 'text-emerald-300' : 'text-red-300'
                          }`}
                        >
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-white/50">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No se encontraron usuarios</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
