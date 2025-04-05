const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('Database connection successful!')
    
    // Test query
    const userCount = await prisma.user.count()
    console.log('Number of users:', userCount)
    
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 