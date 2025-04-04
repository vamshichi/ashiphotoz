import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

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
    // Parse FormData instead of JSON
    const formData = await request.formData();
    console.log("Received form data:", Object.fromEntries(formData.entries())); // Debug log

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as Blob;

    // Validate required fields
    if (!title || !description || !image) {
      return NextResponse.json(
        { error: "Title, description, and image are required" },
        { status: 400 }
      );
    }

    try {
      // Ensure uploads directory exists
      await mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });

      // Save the image
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const extension = image.type.split('/')[1] || 'jpg';
      const filename = `service-${uniqueSuffix}.${extension}`;
      const imagePath = join(process.cwd(), 'public', 'uploads', filename);
      
      await writeFile(imagePath, buffer);
      const imageUrl = `/uploads/${filename}`;

      // Create service in database
      const service = await prisma.service.create({
        data: {
          title,
          description,
          imageUrl,
        },
      });

      console.log("Created service:", service); // Debug log
      return NextResponse.json(service);
    } catch (error) {
      console.error("Error processing image:", error);
      return NextResponse.json(
        { error: "Failed to process image" },
        { status: 500 }
      );
    }
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
    const service = await prisma.service.update({
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

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
} 