"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface TestimonialFormData {
  name: string;
  content: string;
  rating: number;
}

export default function TestimonialForm() {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    content: "",
    rating: 5, // Default rating
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create testimonial");
      }

      toast.success("Testimonial added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        content: "",
        rating: 5,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add testimonial");
      console.error("Error adding testimonial:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          placeholder="Enter client name"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Testimonial
        </label>
        <textarea
          id="content"
          name="content"
          required
          value={formData.content}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          placeholder="Enter testimonial content"
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          required
          value={formData.rating}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num !== 1 ? 's' : ''}
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
          {loading ? 'Adding Testimonial...' : 'Add Testimonial'}
        </button>
      </div>
    </form>
  );
} 