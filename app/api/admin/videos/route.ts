import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VIDEO_CATEGORIES = [
  "Wedding Videos",
  "Pre-Wedding Videos",
  "Housewarming Videos",
  "Birthday Videos",
  "Corporate Videos",
  "Other"
] as const;

// Get all videos
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(videos);
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
    const { title, description, url, category } = body;

    if (!title || !url || !category) {
      return NextResponse.json(
        { error: "Title, URL, and category are required" },
        { status: 400 }
      );
    }

    if (!VIDEO_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        description: description || "",
        url,
        category,
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
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, title, url, category } = data;

    if (!id || !title || !url || !category) {
      return NextResponse.json({ 
        error: "Missing required fields" 
      }, { status: 400 });
    }

    // Validate category
    if (!['YOUTUBE', 'IMAGE'].includes(category)) {
      return NextResponse.json({ 
        error: "Invalid category" 
      }, { status: 400 });
    }

    // Check if video exists
    const existingVideo = await prisma.video.findUnique({
      where: { id }
    });

    if (!existingVideo) {
      return NextResponse.json({ 
        error: "Video not found" 
      }, { status: 404 });
    }

    // Update video
    const updatedVideo = await prisma.video.update({
      where: { id },
      data: {
        title,
        url,
        category
      }
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json({ 
      error: "Failed to update video" 
    }, { status: 500 });
  }
}

// Delete a video
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
} 