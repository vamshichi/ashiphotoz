"use client"
//hi

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Pencil, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'
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

interface Service {
  id: string
  title: string
  description: string
  imageUrl: string
  createdAt: string
}

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      toast.error('Failed to fetch services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedService) return

    const formData = new FormData(e.currentTarget)
    
    formData.append('id', selectedService.id)

    try {
      const response = await fetch(`/api/admin/services`, {
        method: 'PUT',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update service')
      }
      
      toast.success('Service updated successfully')
      setIsEditOpen(false)
      fetchServices()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update service')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/services`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error('Failed to delete service')

      toast.success('Service deleted successfully')
      setIsDeleteConfirmOpen(false)
      fetchServices()
    } catch (error) {
      toast.error('Failed to delete service')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-[200px]">Loading...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">{service.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedService(service)
                        setIsViewOpen(true)
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedService(service)
                        setIsEditOpen(true)
                      }}
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedService(service)
                        setIsDeleteConfirmOpen(true)
                      }}
                      className="text-red-600 hover:text-red-800"
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
              View Service
            </DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Image</h3>
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedService.imageUrl}
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Title</h3>
                <p className="text-lg text-gray-900">{selectedService.title}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <p className="text-gray-900 whitespace-pre-wrap">
                  {selectedService.description}
                </p>
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
              Edit Service
            </DialogTitle>
          </DialogHeader>
          {selectedService && (
            <form onSubmit={handleEdit} className="space-y-6" encType="multipart/form-data">
              <input type="hidden" name="id" value={selectedService?.id} />
              <div className="bg-gray-50 p-4 rounded-lg">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={selectedService.title}
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={selectedService.description}
                  rows={4}
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Leave empty to keep the current image
                </p>
              </div>
              <DialogFooter className="mt-6 space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                  className="w-full sm:w-auto"
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
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
          </div>
          <DialogFooter className="mt-6 space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedService && handleDelete(selectedService.id)}
              className="w-full sm:w-auto"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 