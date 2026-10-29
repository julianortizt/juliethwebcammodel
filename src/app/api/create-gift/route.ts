import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createGiftPayment, getOrCreateStripeCustomer } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { giftId, message, successUrl, cancelUrl } = await request.json()

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Obtener detalles del regalo
    const gifts: Record<string, { name: string; price: number; emoji: string }> = {
      rose: { name: 'Rosas', price: 5, emoji: '🌹' },
      chocolate: { name: 'Chocolate', price: 10, emoji: '🍫' },
      jewelry: { name: 'Joyas', price: 50, emoji: '💎' },
      dream: { name: 'De tu amor', price: 100, emoji: '💕' },
      luxury: { name: 'Lujo', price: 500, emoji: '👑' },
    }

    const gift = gifts[giftId || 'rose']
    if (!gift) {
      return NextResponse.json({ error: 'Regalo no válido' }, { status: 400 })
    }

    const customer = await getOrCreateStripeCustomer(
      user.email || `user-${user.id}@example.com`,
      user.name || undefined
    )

    const checkoutSession = await createGiftPayment({
      amount: gift.price,
      currency: 'usd',
      customerEmail: user.email,
      userId: session.user.id,
      giftName: `${gift.emoji} ${gift.name}`,
      giftMessage: message || undefined,
      successUrl: successUrl || `${process.env.NEXTAUTH_URL}/gifts?success=true`,
      cancelUrl: cancelUrl || `${process.env.NEXTAUTH_URL}/gifts?canceled=true`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating gift session:', error)
    return NextResponse.json(
      { error: 'Error al enviar el regalo' },
      { status: 500 }
    )
  }
}
