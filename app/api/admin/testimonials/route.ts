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

    // Transform testimonials to ensure content is never null
    const transformedTestimonials = testimonials.map(testimonial => ({
      ...testimonial,
      content: testimonial.content || ""
    }));

    return NextResponse.json(transformedTestimonials);
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
    const { name, content, rating } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!rating) {
      return NextResponse.json(
        { error: "Rating is required" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        content: content || "", // Provide empty string if content is null
        rating,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
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
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 