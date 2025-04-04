import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateAndConvertCategory } from "@/app/utils/categoryUtils";

// Get all videos
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform videos to ensure description is never null
    const transformedVideos = videos.map(video => ({
      ...video,
      description: video.description || ""
    }));

    return NextResponse.json(transformedVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

// Create a new video
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, url } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        description: description || "", // Provide empty string if description is null
        url,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}

// Update a video
export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json();
    
    // Validate and convert category if provided
    if (data.category) {
      try {
        data.category = validateAndConvertCategory(data.category);
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : "Invalid category" },
          { status: 400 }
        );
      }
    }

    const video = await prisma.video.update({
      where: { id },
      data,
    });

    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a video
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 