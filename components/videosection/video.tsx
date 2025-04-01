"use client"

import { useState } from "react"

const videoSections = [
  {
    title: "Wedding Videos",
    videos: ["https://youtu.be/tEK61syaF1o", "https://youtu.be/Avi3Gk2G0G0", "https://youtu.be/D77AbK2V0aI"],
  },
  {
    title: "Pre-Wedding Videos",
    videos: [
      "https://youtu.be/eXcuKQDzZ9E",
      "https://youtu.be/kduO1hfW-Lc",
      "https://youtu.be/PPuxNT_H2GE",
      "https://youtu.be/X0_iSAYgpuE",
    ],
  },
  {
    title: "Housewarming Videos",
    videos: ["https://youtu.be/z3N9fjZuV2s", "https://youtu.be/0jXv2G0_flc"],
  },
]

export default function Video() {
  const [activeFilter, setActiveFilter] = useState("All")

  // Get all unique category titles for the filter
  const categories = ["All", ...videoSections.map((section) => section.title)]

  // Filter sections based on the active filter
  const filteredSections =
    activeFilter === "All" ? videoSections : videoSections.filter((section) => section.title === activeFilter)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Filter Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeFilter === category ? "bg-red-600 text-white font-medium" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category === "All" ? "All Videos" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Sections */}
      {filteredSections.map((section, index) => (
        <section key={index} className="py-20 bg-gray-50">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.videos.map((video, i) => (
                <iframe
                  key={i}
                  width="100%"
                  height="315"
                  src={video.replace("youtu.be", "www.youtube.com/embed")}
                  title="YouTube video player"
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

