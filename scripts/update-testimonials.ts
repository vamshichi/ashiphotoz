import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        content: undefined
      }
    })

    for (const testimonial of testimonials) {
      await prisma.testimonial.update({
        where: { id: testimonial.id },
        data: { content: "" }
      })
      console.log(`Updated testimonial ${testimonial.id}`)
    }

    console.log("Successfully updated all testimonials with null content")
  } catch (error) {
    console.error("Error updating testimonials:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 