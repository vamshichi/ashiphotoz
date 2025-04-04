import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// Create a new service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

// Update a service
export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json();
    const service = await prisma.services.update({
      where: { id },
      data,
    });

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a service
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

    await prisma.services.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 