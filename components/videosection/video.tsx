"use client"

import { useState, useEffect } from "react"

// Define the fixed categories
const VIDEO_CATEGORIES = [
  "All Videos",
  "Wedding Videos",
  "Pre-Wedding Videos",
  "Housewarming Videos"
] as const

type VideoCategory = typeof VIDEO_CATEGORIES[number]

interface Video {
  id: string
  title: string
  description: string | null
  url: string
  category: VideoCategory
  createdAt: string
  updatedAt: string | null
}

export default function Video() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<VideoCategory>("All Videos")

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/admin/videos')
        if (!response.ok) {
          throw new Error('Failed to fetch videos')
        }
        const data = await response.json()
        setVideos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch videos')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Filter videos based on active filter
  const filteredVideos = activeFilter === "All Videos" 
    ? videos 
    : videos.filter(video => video.category === activeFilter)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Videos</h2>
          <p className="max-w-2xl mt-4 text-lg text-muted-foreground">
            Watch our latest video productions
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {VIDEO_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all
                  ${activeFilter === category 
                    ? "bg-red-600 text-white shadow-md" 
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 py-10">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No videos available</p>
          </div>
        )}

        {/* Videos Grid */}
        {!loading && !error && videos.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">No videos found in this category</p>
              </div>
            ) : (
              filteredVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.url.replace("youtu.be", "www.youtube.com/embed")}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    {video.description && (
                      <p className="text-gray-600 text-sm">{video.description}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  )
}