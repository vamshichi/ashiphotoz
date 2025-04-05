"use client"

import Link from "next/link"
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
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard.</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Videos Card */}
          <Link href="/admin/videos" 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <svg 
                className="w-12 h-12 text-red-600 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Videos</h2>
              <p className="text-gray-600">Manage your video content</p>
            </div>
          </Link>

          {/* Portfolio Card */}
          <Link href="/admin/portfolio" 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <svg 
                className="w-12 h-12 text-red-600 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Portfolio</h2>
              <p className="text-gray-600">Manage your portfolio items</p>
            </div>
          </Link>

          {/* Services Card */}
          <Link href="/admin/services" 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <svg 
                className="w-12 h-12 text-red-600 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Services</h2>
              <p className="text-gray-600">Manage your services</p>
            </div>
          </Link>

          {/* Testimonials Card */}
          <Link href="/admin/testimonials" 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <svg 
                className="w-12 h-12 text-red-600 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Testimonials</h2>
              <p className="text-gray-600">Manage your testimonials</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}


