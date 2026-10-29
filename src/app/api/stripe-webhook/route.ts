import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as {
        mode: string
        metadata: { userId?: string; type?: string }
        customer: string
        subscription?: string
      }

      const userId = session.metadata?.userId
      if (!userId) break

      if (session.mode === 'subscription') {
        // Suscripción creada
        const existing = await prisma.subscription.findFirst({ where: { userId } })
        if (existing) {
          await prisma.subscription.update({
            where: { id: existing.id },
            data: {
              stripeId: (session as any).subscription || undefined,
              status: 'active',
              endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
            },
          })
        } else {
          await prisma.subscription.create({
            data: {
              userId,
              stripeId: (session as any).subscription || undefined,
              status: 'active',
              plan: (session as any).subscription ? 'annual' : 'monthly',
              amount: (session as any).amount_total || 0,
              currency: (session as any).currency || 'USD',
              startTime: new Date(),
              endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          })
        }
      } else if (session.mode === 'payment') {
        // Regalo enviado
        const giftType = (session as any).metadata?.type === 'gift' ? 'gift' : 'unknown'
        await prisma.gift.create({
          data: {
            userId,
            type: giftType,
            name: (session as any).display_items?.[0]?.custom?.name || 'Regalo',
            amount: (session as any).amount_total || 0,
            currency: (session as any).currency || 'USD',
            message: (session as any).payment_intent_details?.description || undefined,
            status: 'completed',
          },
        })
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription: any = event.data.object

      const sub = await prisma.subscription.findFirst({
        where: { stripeId: subscription.id },
      })

      if (sub) {
        await prisma.subscription.update({
          where: { id: sub.id },
          data: {
            status: subscription.status === 'active' ? 'active' : 'canceled',
            endTime: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : undefined,
          },
        })
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription: any = event.data.object

      const sub = await prisma.subscription.findFirst({
        where: { stripeId: subscription.id },
      })

      if (sub) {
        await prisma.subscription.update({
          where: { id: sub.id },
          data: { status: 'canceled' },
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
