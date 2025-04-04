import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

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
      error: "Failed to fetch portfolio items",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log("Received request headers:", Object.fromEntries(request.headers.entries()));
    console.log("Request method:", request.method);
    console.log("Request URL:", request.url);

    // Parse the form data
    const formData = await request.formData();
    console.log("Received form data fields:", Array.from(formData.keys()));

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    console.log("Extracted form data:", { title, description, category, imageName: image?.name });

    if (!title || !description || !category || !image) {
      console.log("Missing required fields:", { title, description, category, image: !!image });
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Convert image to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${image.name}`;
    const filePath = join(uploadDir, filename);

    // Save the file
    await writeFile(filePath, buffer);
    console.log("Image saved to:", filePath);

    // Save to database
    console.log("Attempting to create portfolio item in database...");
    const portfolioItem = await prisma.portfolio.create({
      data: {
        title,
        description,
        category,
        image: `/uploads/${filename}`,
      },
    });
    console.log("Portfolio item created successfully:", portfolioItem);

    return NextResponse.json({ success: true, data: portfolioItem });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ 
      error: "Failed to create portfolio item",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
