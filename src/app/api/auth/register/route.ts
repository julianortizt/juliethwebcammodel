import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { checkGeoRestriction } from '@/lib/geo'

export async function POST(request: Request) {
  try {
    // Verificar restricción geográfica
    const { allowed } = checkGeoRestriction(request)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Registro no permitido desde esta ubicación. Solo Colombia.' },
        { status: 403 }
      )
    }

    const { name, email, password } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este correo ya está registrado' },
        { status: 400 }
      )
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Obtener país de IP
    const { getClientIp, getCountryFromIp } = await import('@/lib/utils')
    const ip = getClientIp(request)
    const country = ip ? getCountryFromIp(ip) : 'CO'

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        country,
        role: 'user',
      },
    })

    return NextResponse.json(
      {
        message: 'Usuario creado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
