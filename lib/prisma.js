import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Only create Prisma client if DATABASE_URL is available
const prisma = process.env.DATABASE_URL ? 
  (globalForPrisma.prisma || new PrismaClient()) : 
  null

if (process.env.NODE_ENV !== 'production' && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma
}

export { prisma } 