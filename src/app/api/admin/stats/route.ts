import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const [
      totalUsers,
      activeSubscribers,
      totalGifts,
      totalRevenue,
      pendingMessages,
      recentUsers,
      recentGifts,
      recentMessages,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.subscription.count({ where: { status: 'active' } }),
      prisma.gift.count(),
      prisma.gift.aggregate({ _sum: { amount: true } }),
      prisma.message.count({ where: { status: 'pending' } }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, country: true, createdAt: true },
      }),
      prisma.gift.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } },
      }),
      prisma.message.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } },
      }),
    ])

    return NextResponse.json({
      stats: {
        totalUsers,
        activeSubscribers,
        totalGifts,
        totalRevenue: totalRevenue._sum.amount || 0,
        pendingMessages,
      },
      recentUsers,
      recentGifts,
      recentMessages,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
