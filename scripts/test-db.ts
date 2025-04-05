import { PrismaClient } from '@prisma/client'

async function testConnection() {
  const prisma = new PrismaClient()
  
  try {
    console.log('Attempting to connect to database...')
    
    // Try to connect and perform a simple query
    const userCount = await prisma.user.count()
    console.log('Successfully connected to database!')
    console.log(`Number of users in database: ${userCount}`)
    
    return true
  } catch (error) {
    console.error('Failed to connect to database:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

testConnection() 