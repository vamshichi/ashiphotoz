"use client"

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Pencil, Trash2, Eye, Youtube } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Video {
  id: string
  title: string
  description: string | null
  url: string
  category: string
  createdAt: string
}

const VIDEO_CATEGORIES = [
  "Wedding Videos",
  "Pre-Wedding Videos",
  "Housewarming Videos",
  "Birthday Videos",
  "Corporate Videos",
  "Other"
]

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/admin/videos')
      if (!response.ok) throw new Error('Failed to fetch videos')
      const data = await response.json()
      setVideos(data)
    } catch (error) {
      toast.error('Failed to load videos')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/videos?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete video')
      
      toast.success('Video deleted successfully')
      fetchVideos()
      setIsDeleteConfirmOpen(false)
    } catch (error) {
      toast.error('Failed to delete video')
      console.error('Error:', error)
    }
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedVideo) return

    const formData = new FormData(e.currentTarget)
    const data = {
      id: selectedVideo.id,
      title: formData.get('title'),
      url: formData.get('url'),
      category: formData.get('category'),
    }

    try {
      const response = await fetch(`/api/admin/videos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update video')
      }
      
      toast.success('Video updated successfully')
      setIsEditOpen(false)
      fetchVideos()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update video')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {videos.map((video) => (
              <tr key={video.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Youtube className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm text-gray-900">{video.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {video.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate text-sm text-gray-500">
                    {video.url}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedVideo(video)
                        setIsViewOpen(true)
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedVideo(video)
                        setIsEditOpen(true)
                      }}
                      className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedVideo(video)
                        setIsDeleteConfirmOpen(true)
                      }}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              View Video
            </DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Title</h3>
                <p className="text-lg text-gray-900">{selectedVideo.title}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Category</h3>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                  {selectedVideo.category}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">URL</h3>
                <a 
                  href={selectedVideo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 break-all"
                >
                  {selectedVideo.url}
                </a>
              </div>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsViewOpen(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Edit Video
            </DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <form onSubmit={handleEdit} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={selectedVideo.title}
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select name="category" defaultValue={selectedVideo.category}>
                  <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YOUTUBE">YouTube</SelectItem>
                    <SelectItem value="IMAGE">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <Input
                  type="url"
                  id="url"
                  name="url"
                  defaultValue={selectedVideo.url}
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <DialogFooter className="mt-6 space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                  className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Confirm Delete
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete this video? This action cannot be undone.
            </p>
          </div>
          <DialogFooter className="mt-6 space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedVideo && handleDelete(selectedVideo.id)}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 