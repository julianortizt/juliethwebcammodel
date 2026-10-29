import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createPrismaClient() {
  try {
    const { PrismaPg } = require('@prisma/adapter-pg')
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('No DATABASE_URL')
    }
    const adapter = new PrismaPg({ connectionString })
    return new PrismaClient({ adapter })
  } catch (e) {
    // Fallback for build time
    return new PrismaClient({} as any)
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
