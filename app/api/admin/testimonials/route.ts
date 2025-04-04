import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      }
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// Create a new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body); // Debug log

    const { name, content, rating } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Ensure rating is a valid number
    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json(
        { error: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        content: content || "", // Provide empty string if content is null
        rating: parsedRating, // Use the parsed rating
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON data provided" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

// Update a testimonial
export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json();
    
    // Ensure rating is a valid number if provided
    if (data.rating !== undefined) {
      const parsedRating = parseInt(data.rating);
      if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return NextResponse.json(
          { error: "Rating must be a number between 1 and 5" },
          { status: 400 }
        );
      }
      data.rating = parsedRating;
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON data provided" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// Delete a testimonial
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
} 