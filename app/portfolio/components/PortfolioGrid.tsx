"use client";

import { useState } from "react";
import Image from "next/image";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: Date;
}

interface PortfolioGridProps {
  initialItems: PortfolioItem[];
  categories: string[];
}

export default function PortfolioGrid({ initialItems, categories }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items] = useState(initialItems);

  // Filter items based on selected category
  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-center">{item.description}</p>
                  <span className="mt-2 px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Items Message */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No items found in {selectedCategory} category.
          </p>
        </div>
      )}
    </div>
  );
} 