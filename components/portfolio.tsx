"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// Define types for our data structure
interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl: string
//   category: string
  createdAt: string
}

interface PortfolioSection {
  title: string
  items: PortfolioItem[]
}

export default function Portfolio() {
  const [portfolioSections, setPortfolioSections] = useState<PortfolioSection[]>([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch portfolio items from the backend
  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api?model=portfolio")

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio items")
        }

        const data = await response.json()
        const portfolioItems = data.data || []

        // Group portfolio items by category
        const groupedItems: { [key: string]: PortfolioItem[] } = {}

        portfolioItems.forEach((item: PortfolioItem) => {
          // Use a default category if none is provided
          const description = item.description || "Uncategorized"

          if (!groupedItems[description]) {
            groupedItems[description] = []
          }
          groupedItems[description].push(item)
        })

        // Convert grouped items to sections format
        const sections: PortfolioSection[] = Object.keys(groupedItems).map((description) => ({
          title: description ,
          items: groupedItems[description],
        }))

        setPortfolioSections(sections)
      } catch (err) {
        console.error("Error fetching portfolio items:", err)
        setError("Failed to load portfolio items. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolio()
  }, [])

  // Get all unique category titles for the filter
  const categories = ["All", ...portfolioSections.map((section) => section.title)]

  // Filter sections based on the active filter
  const filteredSections =
    activeFilter === "All" ? portfolioSections : portfolioSections.filter((section) => section.title === activeFilter)

  // Open modal with selected item
  const openItemModal = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedItem(null), 300) // Clear after animation
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
                {category === "All" ? "All Projects" : category}
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
      {!isLoading && !error && portfolioSections.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-2">No portfolio items found</p>
          <p className="text-gray-500">Please add portfolio items through the admin panel</p>
        </div>
      )}

      {/* Portfolio Sections */}
      {!isLoading &&
        !error &&
        filteredSections.map((section, index) => (
          <section key={index} className="py-16 sm:py-20 bg-gray-50">
            <div className="container px-4 mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">{section.title}</h2>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => openItemModal(item)}
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={item.imageUrl || "/placeholder.svg?height=256&width=384"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=256&width=384"
                        }}
                      />
                    </div>
                    <div className="p-4 text-left">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

      {/* Modal for viewing portfolio item details */}
      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[50vh]">
              <Image
                src={selectedItem.imageUrl || "/placeholder.svg?height=400&width=800"}
                alt={selectedItem.title}
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=400&width=800"
                }}
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
              <p className="text-gray-700 mb-4">{selectedItem.description}</p>
              <div className="flex justify-end">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

