import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

const PORTFOLIO_CATEGORIES = [
  "Wedding",
  "Pre-Wedding",
  "Housewarming",
  "Birthday",
  "Corporate",
  "Other"
] as const;

export async function GET() {
  try {
    const items = await prisma.portfolio.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return NextResponse.json({ 
      error: "Failed to fetch portfolio items" 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as Blob;

    // Validate required fields
    if (!title || !description || !category || !image) {
      return NextResponse.json({ 
        error: "Title, description, category, and image are required" 
      }, { status: 400 });
    }

    // Validate category
    if (!PORTFOLIO_CATEGORIES.includes(category as any)) {
      return NextResponse.json({ 
        error: "Invalid category" 
      }, { status: 400 });
    }

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    // Process and save image
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = image.type.split('/')[1] || 'jpg';
    const filename = `portfolio-${uniqueSuffix}.${extension}`;
    const imagePath = join(uploadDir, filename);
    await writeFile(imagePath, buffer);

    // Create portfolio item
    const portfolioItem = await prisma.portfolio.create({
      data: {
        title,
        description,
        category,
        image: `/uploads/${filename}`,
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: portfolioItem 
    });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ 
      error: "Failed to create portfolio item" 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as Blob | null;

    // Validate required fields
    if (!id || !title || !description || !category) {
      return NextResponse.json({ 
        error: "ID, title, description, and category are required" 
      }, { status: 400 });
    }

    // Validate category
    if (!PORTFOLIO_CATEGORIES.includes(category as any)) {
      return NextResponse.json({ 
        error: "Invalid category" 
      }, { status: 400 });
    }

    // Get existing portfolio item
    const existingItem = await prisma.portfolio.findUnique({
      where: { id }
    });

    if (!existingItem) {
      return NextResponse.json({ 
        error: "Portfolio item not found" 
      }, { status: 404 });
    }

    let imagePath = existingItem.image;

    // Handle new image if provided
    if (image) {
      // Delete old image
      if (existingItem.image) {
        try {
          const oldImagePath = join(process.cwd(), 'public', existingItem.image);
          await unlink(oldImagePath);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }

      // Save new image
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const extension = image.type.split('/')[1] || 'jpg';
      const filename = `portfolio-${uniqueSuffix}.${extension}`;
      const newImagePath = join(process.cwd(), "public/uploads", filename);
      await writeFile(newImagePath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    // Update portfolio item
    const updatedItem = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        category,
        image: imagePath,
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: updatedItem 
    });
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return NextResponse.json({ 
      error: "Failed to update portfolio item" 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ 
        error: "Portfolio item ID is required" 
      }, { status: 400 });
    }

    // Get item to delete its image
    const item = await prisma.portfolio.findUnique({
      where: { id }
    });

    if (item?.image) {
      try {
        const imagePath = join(process.cwd(), 'public', item.image);
        await unlink(imagePath);
      } catch (error) {
        console.error("Error deleting image file:", error);
      }
    }

    await prisma.portfolio.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Portfolio item deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return NextResponse.json({ 
      error: "Failed to delete portfolio item" 
    }, { status: 500 });
  }
}
