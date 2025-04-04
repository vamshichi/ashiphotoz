import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Update videos with null descriptions
    const videos = await prisma.video.findMany({
      where: {
        description: undefined
      }
    })

    for (const video of videos) {
      await prisma.video.update({
        where: { id: video.id },
        data: { description: "" }
      })
      console.log(`Updated video ${video.id}`)
    }

    // Update testimonials with null content
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

    console.log("Successfully updated all records with null values")
  } catch (error) {
    console.error("Error updating records:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 