const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient()
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
