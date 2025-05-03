"use client"

import React from "react"
import { useState } from "react"
import ProductCard from "./ProductCard"
import { products } from "../data/productData"
import { Filter, ArrowUpDown } from "lucide-react"

const ProductSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = ["all", ...new Set(products.map((product) => product.category))]

  const filteredProducts = products.filter((product) => activeCategory === "all" || product.category === activeCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0 // featured - maintain original order
    }
  })

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-accent-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">Our Ayurvedic Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our natural, authentic ayurvedic products made with traditional recipes and modern quality
            standards for holistic well-being.
          </p>
        </div>

        {/* Filter and Sort Controls - Desktop */}
        <div className="hidden md:flex justify-between items-center mb-8">
          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-primary-50"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          </div>
        </div>

        {/* Filter and Sort Controls - Mobile */}
        <div className="md:hidden mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm"
            >
              <Filter className="h-4 w-4 text-primary-600" />
              <span className="text-sm">Filters</span>
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            </div>
          </div>

          {isFilterOpen && (
            <div className="bg-white p-4 rounded-md shadow-md mb-4 animate-fade-in">
              <h3 className="font-medium text-gray-800 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category)
                      setIsFilterOpen(false)
                    }}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      activeCategory === category
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-primary-50"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-md transition-colors font-medium">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
