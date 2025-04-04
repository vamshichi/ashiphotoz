"use client"

import { useState, useEffect } from "react"
import { PrismaClient } from "@prisma/client/edge"

enum ContentType {
  YOUTUBE = "youtube",
  IMAGE = "image",
  SERVICE = "service",
  TESTIMONIAL = "testimonial"
}

interface Content {
  id: string
  type: ContentType
  title: string
  description: string
  url?: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

interface Video {
  id: string
  title: string
  category: ContentType
  url: string
  description?: string
  thumbnail?: string
  isActive: boolean
}

interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: ContentType
  isActive: boolean
}

interface Service {
  id: string
  name: string
  description: string
  price?: number
  isActive: boolean
}

interface Testimonial {
  id: string
  name: string
  feedback: string
  rating: number
  imageUrl?: string
  isActive: boolean
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("videos")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Form states
  const [videoForm, setVideoForm] = useState<Partial<Video>>({})
  const [portfolioForm, setPortfolioForm] = useState<Partial<PortfolioItem>>({})
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({})
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({})

  // Data states
  const [videos, setVideos] = useState<Video[]>([])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [videosRes, portfolioRes, servicesRes, testimonialsRes] = await Promise.all([
        fetch("/api/admin/videos"),
        fetch("/api/admin/portfolio"),
        fetch("/api/admin/services"),
        fetch("/api/admin/testimonials"),
      ])

      if (videosRes.ok) setVideos(await videosRes.json())
      if (portfolioRes.ok) setPortfolioItems(await portfolioRes.json())
      if (servicesRes.ok) setServices(await servicesRes.json())
      if (testimonialsRes.ok) setTestimonials(await testimonialsRes.json())
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent, type: string) => {
    e.preventDefault()
    try {
      let response
      switch (type) {
        case "videos":
          response = await fetch("/api/admin/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(videoForm),
          })
          if (response.ok) {
            const newVideo = await response.json()
            setVideos([...videos, newVideo])
            setVideoForm({})
          }
          break

        case "portfolio":
          response = await fetch("/api/admin/portfolio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(portfolioForm),
          })
          if (response.ok) {
            const newItem = await response.json()
            setPortfolioItems([...portfolioItems, newItem])
            setPortfolioForm({})
          }
          break

        case "services":
          response = await fetch("/api/admin/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serviceForm),
          })
          if (response.ok) {
            const newService = await response.json()
            setServices([...services, newService])
            setServiceForm({})
          }
          break

        case "testimonials":
          response = await fetch("/api/admin/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testimonialForm),
          })
          if (response.ok) {
            const newTestimonial = await response.json()
            setTestimonials([...testimonials, newTestimonial])
            setTestimonialForm({})
          }
          break
      }
    } catch (error) {
      console.error("Failed to submit:", error)
    }
  }

  const handleDelete = async (id: string, type: string) => {
    try {
      const response = await fetch(`/api/admin/${type}?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        switch (type) {
          case "videos":
            setVideos(videos.filter((v) => v.id !== id))
            break
          case "portfolio":
            setPortfolioItems(portfolioItems.filter((p) => p.id !== id))
            break
          case "services":
            setServices(services.filter((s) => s.id !== id))
            break
          case "testimonials":
            setTestimonials(testimonials.filter((t) => t.id !== id))
            break
        }
      }
    } catch (error) {
      console.error("Failed to delete:", error)
    }
  }

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="admin-container">
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={`admin-tab ${activeTab === "portfolio" ? "active" : ""}`}
          onClick={() => setActiveTab("portfolio")}
        >
          Portfolio
        </button>
        <button
          className={`admin-tab ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
        <button
          className={`admin-tab ${activeTab === "testimonials" ? "active" : ""}`}
          onClick={() => setActiveTab("testimonials")}
        >
          Testimonials
        </button>
      </div>

      {activeTab === "videos" && (
        <div className="admin-form">
          <h2 className="text-xl font-semibold mb-4">Add New Video</h2>
          <form onSubmit={(e) => handleSubmit(e, "videos")} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={videoForm.title || ""}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                value={videoForm.category || ""}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, category: e.target.value as ContentType })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option value="">Select category</option>
                {Object.values(ContentType).map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">URL</label>
              <input
                type="url"
                value={videoForm.url || ""}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, url: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={videoForm.description || ""}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Thumbnail URL</label>
              <input
                type="url"
                value={videoForm.thumbnail || ""}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, thumbnail: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Video
            </button>
          </form>
        </div>
      )}

      {activeTab === "portfolio" && (
        <div className="admin-form">
          <h2 className="text-xl font-semibold mb-4">Add New Portfolio Item</h2>
          <form onSubmit={(e) => handleSubmit(e, "portfolio")} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={portfolioForm.title || ""}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={portfolioForm.description || ""}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="url"
                value={portfolioForm.imageUrl || ""}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, imageUrl: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Portfolio Item
            </button>
          </form>
        </div>
      )}

      {activeTab === "services" && (
        <div className="admin-form">
          <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
          <form onSubmit={(e) => handleSubmit(e, "services")} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={serviceForm.name || ""}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={serviceForm.description || ""}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                value={serviceForm.price || ""}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, price: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Service
            </button>
          </form>
        </div>
      )}

      {activeTab === "testimonials" && (
        <div className="admin-form">
          <h2 className="text-xl font-semibold mb-4">Add New Testimonial</h2>
          <form onSubmit={(e) => handleSubmit(e, "testimonials")} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={testimonialForm.name || ""}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Feedback</label>
              <textarea
                value={testimonialForm.feedback || ""}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, feedback: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                value={testimonialForm.rating || ""}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Testimonial
            </button>
          </form>
        </div>
      )}

      {/* List sections */}
      {activeTab === "videos" && (
        <div className="admin-list">
          {videos.map((video) => (
            <div key={video.id} className="admin-list-item">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{video.title}</h3>
                  <p className="text-gray-600">{video.description}</p>
                </div>
                <div className="admin-actions">
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={() => handleDelete(video.id, "videos")}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "portfolio" && (
        <div className="admin-list">
          {portfolioItems.map((item) => (
            <div key={item.id} className="admin-list-item">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="admin-actions">
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={() => handleDelete(item.id, "portfolio")}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "services" && (
        <div className="admin-list">
          {services.map((service) => (
            <div key={service.id} className="admin-list-item">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <div className="admin-actions">
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={() => handleDelete(service.id, "services")}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "testimonials" && (
        <div className="admin-list">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="admin-list-item">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.feedback}</p>
                </div>
                <div className="admin-actions">
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={() => handleDelete(testimonial.id, "testimonials")}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


