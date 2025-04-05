"use client"

import { useState, useEffect } from "react"

// Define types for our data structure
interface Video {
  id: string
  title: string
  category: string
  url: string
  createdAt: string
}

interface VideoSection {
  title: string
  videos: Video[]
}

export default function Video() {
  const [videoSections, setVideoSections] = useState<VideoSection[]>([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch videos from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api?model=video")

        if (!response.ok) {
          throw new Error("Failed to fetch videos")
        }

        const data = await response.json()
        const videos = data.data || []

        // Group videos by category
        const groupedVideos: { [key: string]: Video[] } = {}

        videos.forEach((video: Video) => {
          if (!groupedVideos[video.category]) {
            groupedVideos[video.category] = []
          }
          groupedVideos[video.category].push(video)
        })

        // Convert grouped videos to sections format
        const sections: VideoSection[] = Object.keys(groupedVideos).map((category) => ({
          title: category,
          videos: groupedVideos[category],
        }))

        setVideoSections(sections)
      } catch (err) {
        console.error("Error fetching videos:", err)
        setError("Failed to load videos. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Get all unique category titles for the filter
  const categories = ["All", ...videoSections.map((section) => section.title)]

  // Filter sections based on the active filter
  const filteredSections =
    activeFilter === "All" ? videoSections : videoSections.filter((section) => section.title === activeFilter)

  // Helper function to extract YouTube video ID or convert URL
  function getYouTubeEmbedUrl(url: string): string {
    // Handle youtu.be format
    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/")
    }

    // Handle youtube.com/watch format
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v")
      return `https://www.youtube.com/embed/${videoId}`
    }

    // If it's already an embed URL or other format, return as is
    return url
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Responsive Filter Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md py-4 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 sm:gap-4 justify-center flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base whitespace-nowrap transition-all border border-gray-300 
                  ${activeFilter === category ? "bg-red-600 text-white font-medium border-red-600" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {category === "All" ? "All Videos" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && videoSections.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-2">No videos found</p>
          <p className="text-gray-500">Please add videos through the admin panel</p>
        </div>
      )}

      {/* Video Sections */}
      {!isLoading &&
        !error &&
        filteredSections.map((section, index) => (
          <section key={index} className="py-16 sm:py-20 bg-gray-50">
            <div className="container px-4 mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">{section.title}</h2>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {section.videos.map((video, i) => (
                  <iframe
                    key={i}
                    width="100%"
                    height="250"
                    className="rounded-lg shadow-md"
                    src={getYouTubeEmbedUrl(video.url)}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            </div>
          </section>
        ))}
    </div>
  )
}

