"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Plus, Eye } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

// Define types based on Prisma schema
interface Video {
  id: string
  title: string
  category: string
  url: string
  createdAt: string
}

interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl: string
  createdAt: string
}

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("videos")
  const [videos, setVideos] = useState<Video[]>([])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [previewContent, setPreviewContent] = useState<{ type: "video" | "image"; src: string }>({
    type: "video",
    src: "",
  })

  // Form states for each model
  const [videoForm, setVideoForm] = useState({ title: "", category: "", url: "" })
  const [portfolioForm, setPortfolioForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const videoRes = await fetch("/api?model=video")
      const portfolioRes = await fetch("/api?model=portfolio")

      const videoData = await videoRes.json()
      let portfolioData = { data: [] }

      try {
        portfolioData = await portfolioRes.json()
      } catch (error) {
        console.error("Error parsing portfolio data:", error)
      }

      setVideos(videoData.data || [])
      setPortfolioItems(portfolioData.data || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to fetch data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (model: string, data: any) => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, data }),
      })

      if (!response.ok) {
        throw new Error("Failed to create item")
      }

      fetchData()
      resetForms()
      setIsDialogOpen(false)
      toast.success("Item created successfully")
    } catch (error) {
      console.error("Error creating item:", error)
      toast.error("Failed to create item")
    }
  }

  const handleUpdate = async (model: string, id: string, data: any) => {
    try {
      const response = await fetch("/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, id, data }),
      })

      if (!response.ok) {
        throw new Error("Failed to update item")
      }

      fetchData()
      resetForms()
      setIsDialogOpen(false)
      setIsEditing(false)
      setCurrentItem(null)
      toast.success("Item updated successfully")
    } catch (error) {
      console.error("Error updating item:", error)
      toast.error("Failed to update item")
    }
  }

  const handleDelete = async (model: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return
    }

    try {
      const response = await fetch(`/api?model=${model}&id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete item")
      }

      fetchData()
      toast.success("Item deleted successfully")
    } catch (error) {
      console.error("Error deleting item:", error)
      toast.error("Failed to delete item")
    }
  }

  const resetForms = () => {
    setVideoForm({ title: "", category: "", url: "" })
    setPortfolioForm({ title: "", description: "", imageUrl: "" })
  }

  const openEditDialog = (model: string, item: any) => {
    setCurrentItem(item)
    setIsEditing(true)

    switch (model) {
      case "video":
        setVideoForm({
          title: item.title,
          category: item.category,
          url: item.url,
        })
        break
      case "portfolio":
        setPortfolioForm({
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
        })
        break
    }

    setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
    setIsEditing(false)
    setCurrentItem(null)
    resetForms()
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let model, data

    switch (activeTab) {
      case "videos":
        model = "video"
        data = videoForm
        break
      case "portfolio":
        model = "portfolio"
        data = portfolioForm
        break
      default:
        return
    }

    if (isEditing && currentItem) {
      handleUpdate(model, currentItem.id, data)
    } else {
      handleCreate(model, data)
    }
  }

  const openPreview = (type: "video" | "image", src: string) => {
    setPreviewContent({ type, src })
    setPreviewDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
          <CardDescription>Manage your website content</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Videos</CardTitle>
              <CardDescription>Manage your video content</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {videos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No videos found
                        </TableCell>
                      </TableRow>
                    ) : (
                      videos.map((video) => (
                        <TableRow key={video.id}>
                          <TableCell>{video.title}</TableCell>
                          <TableCell>{video.category}</TableCell>
                          <TableCell className="truncate max-w-[200px]">{video.url}</TableCell>
                          <TableCell>{new Date(video.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openPreview("video", video.url)}
                              title="Preview Video"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog("video", video)}
                              title="Edit Video"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete("video", video.id)}
                              title="Delete Video"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Manage your portfolio items</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No portfolio items found
                        </TableCell>
                      </TableRow>
                    ) : (
                      portfolioItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.title}</TableCell>
                          <TableCell className="truncate max-w-[200px]">{item.description}</TableCell>
                          <TableCell>
                            <div
                              className="relative h-12 w-12 cursor-pointer"
                              onClick={() => openPreview("image", item.imageUrl)}
                            >
                              <Image
                                src={item.imageUrl || "/placeholder.svg?height=48&width=48"}
                                alt={item.title}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          </TableCell>
                          <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openPreview("image", item.imageUrl)}
                              title="Preview Image"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog("portfolio", item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete("portfolio", item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? `Edit ${activeTab.slice(0, -1)}` : `Add new ${activeTab.slice(0, -1)}`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "videos" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category">Category</label>
                  <Input
                    id="category"
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="url">YouTube URL</label>
                  <Input
                    id="url"
                    value={videoForm.url}
                    onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                {videoForm.url && getYouTubeVideoId(videoForm.url) && (
                  <div className="space-y-2">
                    <label>Video Preview</label>
                    <div className="aspect-video w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoForm.url)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "portfolio" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    value={portfolioForm.title}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category">Category</label>
                  <Input
                    id="category"
                    value={portfolioForm.description}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="imageUrl">Image URL</label>
                  <p>https://drive.google.com/uc?export=view&id=</p>
                  <Input
                    id="imageUrl"
                    value={portfolioForm.imageUrl}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, imageUrl: e.target.value })}
                    required
                    placeholder="https://drive.google.com/uc?export=view&id=19ivc7G2-uXtlerH-g7mPbbcfz5FtE0Xm"
                  />
                </div>
                {portfolioForm.imageUrl && (
                  <div className="space-y-2">
                    <label>Image Preview</label>
                    <div className="relative aspect-video w-full max-h-[200px] overflow-hidden rounded-md border">
                      <Image
                        src={portfolioForm.imageUrl || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=200&width=400" // Handle image load error
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{previewContent.type === "video" ? "Video Preview" : "Image Preview"}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {previewContent.type === "video" && getYouTubeVideoId(previewContent.src) && (
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(previewContent.src)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {previewContent.type === "image" && (
              <div className="relative aspect-video w-full">
                <Image
                  src={previewContent.src || "/placeholder.svg?height=400&width=600"}
                  alt="Preview"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // Handle image load error
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=400&width=600"
                  }}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

