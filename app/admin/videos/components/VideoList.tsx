"use client"

import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Pencil, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  description: string
  url: string
  category: string
  createdAt: Date
}

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/admin/videos')
      if (!response.ok) {
        throw new Error('Failed to fetch videos')
      }
      const data = await response.json()
      setVideos(data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch videos')
      setLoading(false)
      console.error('Error fetching videos:', err)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const handleEdit = (video: Video) => {
    setSelectedVideo(video)
    setIsDialogOpen(true)
  }

  const handleDelete = (video: Video) => {
    setSelectedVideo(video)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedVideo) return

    try {
      const response = await fetch(`/api/admin/videos?id=${selectedVideo.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete video')
      }

      toast.success('Video deleted successfully')
      setIsDeleteDialogOpen(false)
      fetchVideos()
    } catch (err) {
      toast.error('Failed to delete video')
      console.error('Error deleting video:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedVideo) return

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const url = formData.get('url') as string
    const category = formData.get('category') as string

    try {
      const response = await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedVideo.id,
          title,
          description,
          url,
          category,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update video')
      }

      toast.success('Video updated successfully')
      setIsDialogOpen(false)
      fetchVideos()
    } catch (err) {
      toast.error('Failed to update video')
      console.error('Error updating video:', err)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map((video) => (
                <tr key={video.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{video.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{video.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(video)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(video)}
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
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>
              Make changes to the video details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={selectedVideo?.title}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={selectedVideo?.description}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="url">URL</label>
                <Input
                  id="url"
                  name="url"
                  defaultValue={selectedVideo?.url}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category">Category</label>
                <Select name="category" defaultValue={selectedVideo?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="prewedding">Pre-Wedding</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 