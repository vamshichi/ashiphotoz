import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const model = searchParams.get("model")
  const id = searchParams.get("id")

  try {
    if (!model) {
      return NextResponse.json({ error: "Model parameter is required" }, { status: 400 })
    }

    let data

    switch (model) {
      case "video":
        data = id ? await prisma.video.findUnique({ where: { id } }) : await prisma.video.findMany()
        break
      case "service":
        data = id ? await prisma.service.findUnique({ where: { id } }) : await prisma.service.findMany()
        break
      case "portfolio":
        data = id ? await prisma.portfolio.findUnique({ where: { id } }) : await prisma.portfolio.findMany()
        break
      case "testimonial":
        data = id ? await prisma.testimonial.findUnique({ where: { id } }) : await prisma.testimonial.findMany()
        break
      default:
        return NextResponse.json({ error: "Invalid model" }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { model, data } = await request.json()

    if (!model || !data) {
      return NextResponse.json({ error: "Model and data are required" }, { status: 400 })
    }

    let result

    switch (model) {
      case "video":
        result = await prisma.video.create({ data })
        break
      case "service":
        result = await prisma.service.create({ data })
        break
      case "portfolio":
        result = await prisma.portfolio.create({ data })
        break
      case "testimonial":
        result = await prisma.testimonial.create({ data })
        break
      default:
        return NextResponse.json({ error: "Invalid model" }, { status: 400 })
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("Error creating data:", error)
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { model, id, data } = await request.json()

    if (!model || !id || !data) {
      return NextResponse.json({ error: "Model, id, and data are required" }, { status: 400 })
    }

    let result

    switch (model) {
      case "video":
        result = await prisma.video.update({ where: { id }, data })
        break
      case "service":
        result = await prisma.service.update({ where: { id }, data })
        break
      case "portfolio":
        result = await prisma.portfolio.update({ where: { id }, data })
        break
      case "testimonial":
        result = await prisma.testimonial.update({ where: { id }, data })
        break
      default:
        return NextResponse.json({ error: "Invalid model" }, { status: 400 })
    }

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("Error updating data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const model = searchParams.get("model")
  const id = searchParams.get("id")

  try {
    if (!model || !id) {
      return NextResponse.json({ error: "Model and id parameters are required" }, { status: 400 })
    }

    let result

    switch (model) {
      case "video":
        result = await prisma.video.delete({ where: { id } })
        break
      case "service":
        result = await prisma.service.delete({ where: { id } })
        break
      case "portfolio":
        result = await prisma.portfolio.delete({ where: { id } })
        break
      case "testimonial":
        result = await prisma.testimonial.delete({ where: { id } })
        break
      default:
        return NextResponse.json({ error: "Invalid model" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting data:", error)
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 })
  }
}

