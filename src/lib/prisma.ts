import { PrismaClient } from '@prisma/client'

// @ts-ignore
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// @ts-ignore
export const prisma = globalForPrisma.prisma || new PrismaClient()

// @ts-ignore
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
