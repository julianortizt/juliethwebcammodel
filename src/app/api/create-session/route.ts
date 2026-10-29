import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createCheckoutSession, getOrCreateStripeCustomer } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { plan, successUrl, cancelUrl } = await request.json()

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Obtener o crear cliente Stripe
    const customer = await getOrCreateStripeCustomer(
      user.email || `user-${user.id}@example.com`,
      user.name || undefined
    )

    // ID de precio según plan (en producción estos son IDs reales de Stripe)
    const priceId =
      plan === 'annual'
        ? process.env.STRIPE_ANNUAL_PRICE_ID || 'price_annual'
        : process.env.STRIPE_MONTHLY_PRICE_ID || 'price_monthly'

    const checkoutSession = await createCheckoutSession({
      customerId: customer.id,
      priceId,
      successUrl: successUrl || `${process.env.NEXTAUTH_URL}/subscribe?success=true`,
      cancelUrl: cancelUrl || `${process.env.NEXTAUTH_URL}/subscribe?canceled=true`,
      userId: session.user.id,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago' },
      { status: 500 }
    )
  }
}
