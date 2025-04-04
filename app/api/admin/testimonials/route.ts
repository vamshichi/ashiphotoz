import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ 
      error: "Failed to fetch testimonials" 
    }, { status: 500 });
  }
}

// Create a new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, content, rating } = body;

    // Validate required fields
    if (!name || rating === undefined) {
      return NextResponse.json({ 
        error: "Name and rating are required" 
      }, { status: 400 });
    }

    // Validate rating
    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json({ 
        error: "Rating must be a number between 1 and 5" 
      }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        content: content || "",
        rating: parsedRating,
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: testimonial 
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ 
      error: "Failed to create testimonial" 
    }, { status: 500 });
  }
}

// Update a testimonial
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, content, rating } = body;
    
    // Validate required fields
    if (!id || !name || !content || rating === undefined) {
      return NextResponse.json({ 
        error: "ID, name, content, and rating are required" 
      }, { status: 400 });
    }

    // Validate rating
    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json({ 
        error: "Rating must be a number between 1 and 5" 
      }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        content,
        rating: parsedRating,
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: testimonial 
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ 
      error: "Failed to update testimonial" 
    }, { status: 500 });
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