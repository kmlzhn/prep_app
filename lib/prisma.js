import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

let prisma

// Safe Prisma client initialization
try {
  if (process.env.DATABASE_URL) {
    prisma = globalForPrisma.prisma || new PrismaClient()
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma
    }
  } else {
    console.log('DATABASE_URL not found, Prisma client will not be initialized')
    prisma = null
  }
} catch (error) {
  console.error('Error initializing Prisma client:', error)
  prisma = null
}

export { prisma } 