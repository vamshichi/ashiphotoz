"use client";

import { useState } from "react";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("role", formData.role);
      submitData.append("content", formData.content);
      
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create testimonial");
      }

      // Reset form
      setFormData({ name: "", role: "", content: "", image: null });
      setPreviewUrl(null);
      setMessage({ type: 'success', text: 'Testimonial added successfully!' });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : "Something went wrong" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Testimonial</h1>

      {message && (
        <div className={`p-4 rounded-md mb-4 ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
            placeholder="Enter client name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role/Position
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
            placeholder="Enter client role or position"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Testimonial Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
            placeholder="Enter testimonial content"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
            required
          />
          {previewUrl && (
            <div className="mt-2">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Selected: {formData.image?.name}
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Testimonial"}
        </button>
      </form>
    </div>
  );
} 