import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createClient() {
  try {
    if (process.env.DATABASE_URL) {
      const { PrismaPg } = require('@prisma/adapter-pg')
      const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
      return new PrismaClient({ adapter })
    }
  } catch (e) {
    // ignore
  }
  // For build without DB
  return new PrismaClient({} as any)
}

export const prisma = globalForPrisma.prisma || createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
