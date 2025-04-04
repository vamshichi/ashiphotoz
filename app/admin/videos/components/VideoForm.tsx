"use client"

import { useState } from 'react'
import { toast } from 'react-hot-toast'

// Define video categories
const VIDEO_CATEGORIES = [
  "Wedding Videos",
  "Pre-Wedding Videos",
  "Housewarming Videos"
] as const

type VideoCategory = typeof VIDEO_CATEGORIES[number]

interface VideoFormData {
  title: string
  description: string
  url: string
  category: VideoCategory
}

export default function VideoForm() {
  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    description: '',
    url: '',
    category: 'Wedding Videos'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add video')
      }

      toast.success('Video added successfully!')
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        url: '',
        category: 'Wedding Videos'
      })

      // Optionally refresh the page or update the video list
      window.location.href = '/admin/videos'
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add video')
      console.error('Error adding video:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          placeholder="Enter video title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          placeholder="Enter video description"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          YouTube URL
        </label>
        <input
          type="url"
          id="url"
          name="url"
          required
          value={formData.url}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          placeholder="Enter YouTube video URL"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
        >
          {VIDEO_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Adding Video...' : 'Add Video'}
        </button>
      </div>
    </form>
  )
} 