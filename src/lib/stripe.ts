import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-08-27.basil',
} as any)

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  userId,
  customerEmail,
}: {
  customerId?: string
  priceId: string
  successUrl: string
  cancelUrl: string
  userId: string
  customerEmail?: string
}) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    customer_email: customerEmail,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId },
  } as any)
  return session
}

export async function createGiftPayment({
  amount,
  currency,
  customerEmail,
  userId,
  giftName,
  giftMessage,
  successUrl,
  cancelUrl,
}: {
  amount: number
  currency: string
  customerEmail?: string
  userId: string
  giftName: string
  giftMessage?: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: customerEmail,
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          unit_amount: amount,
          product_data: {
            name: giftName,
            description: giftMessage || undefined,
          },
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId, type: 'gift' },
  } as any)
  return session
}

export async function getOrCreateStripeCustomer(email: string, name?: string) {
  const existing = await stripe.customers.list({ email, limit: 1 })
  if (existing.data.length > 0) {
    return existing.data[0]
  }
  return await stripe.customers.create({ email, name })
}
