"use client"

import React from 'react'
import Link from "next/link"
import { useState, useEffect } from "react"

enum ContentType {
  YOUTUBE = "youtube",
  IMAGE = "image",
  SERVICE = "service",
  TESTIMONIAL = "testimonial"
}

// Remove if not used, or use it in your component
// interface Content {
//   id: string
//   type: ContentType
//   title: string
//   description: string
//   url?: string
//   imageUrl?: string
//   createdAt: Date
//   updatedAt: Date
// }

interface VideoItem {
  id: string
  title: string
  description: string
  url: string
  category: string
  createdAt: Date
}

interface ServiceItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  createdAt: Date
}

interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  createdAt: Date
}

interface TestimonialItem {
  id: string
  name: string
  content: string
  rating: number
  createdAt: Date
}

export default function AdminPage() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [services, setServices] = useState<ServiceItem[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          videosRes,
          servicesRes,
          portfolioRes,
          testimonialsRes
        ] = await Promise.all([
          fetch('/api/admin/videos'),
          fetch('/api/admin/services'),
          fetch('/api/admin/portfolio'),
          fetch('/api/admin/testimonials')
        ])

        const [
          videosData,
          servicesData,
          portfolioData,
          testimonialsData
        ] = await Promise.all([
          videosRes.json(),
          servicesRes.json(),
          portfolioRes.json(),
          testimonialsRes.json()
        ])

        setVideos(videosData)
        setServices(servicesData)
        setPortfolio(portfolioData)
        setTestimonials(testimonialsData)
      } catch (err) {
        setError('Failed to fetch data')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Videos Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Videos</h2>
            <p className="text-gray-600 mb-4">{videos.length} videos</p>
            <Link 
              href="/admin/videos"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Videos
            </Link>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <p className="text-gray-600 mb-4">{services.length} services</p>
            <Link 
              href="/admin/services"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Services
            </Link>
          </div>

          {/* Portfolio Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <p className="text-gray-600 mb-4">{portfolio.length} items</p>
            <Link 
              href="/admin/portfolio"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Portfolio
            </Link>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
            <p className="text-gray-600 mb-4">{testimonials.length} testimonials</p>
            <Link 
              href="/admin/testimonials"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Testimonials
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


