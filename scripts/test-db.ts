import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const result = await prisma.$connect()
    console.log('Database connection successful!')
    return result
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main() 