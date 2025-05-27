// Updated ProductCard component
"use client"

import React from "react"
import { Star, ShoppingCart, Heart, ExternalLink } from "lucide-react"
import type { Product } from "../types/product"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, image, price, rating, category, description, waight, isNew, discount, purchaseLinks } = product
  const { addToCart, openCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product, 1)
    openCart()
  }

  return (
    <Link
      to={`product/${id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Product Image Container - Fixed height removed and replaced with aspect ratio */}
      <div className="relative overflow-hidden aspect-[4/4]">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-secondary-500 text-white text-sm font-medium px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white text-sm font-medium px-2 py-1 rounded">
            NEW
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            className="bg-white text-primary-700 p-2 rounded-full mx-2 hover:bg-primary-50 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              // Add wishlist functionality here
            }}
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            className="bg-primary-600 text-white p-3 rounded-full mx-2 hover:bg-primary-700 transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-1">
          <span className="text-xs text-primary-600 font-medium uppercase tracking-wider">{category}</span>
        </div>
        <h3 className="font-medium text-gray-900 text-lg mb-1 line-clamp-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center mb-3 mt-auto">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 100) + 10})</span>
        </div>

        {/* Product Weight UI Block */}
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
            Weight: {waight}
          </span>
        </div>

        {/* Purchase Links - Added this new section */}
        {purchaseLinks && (
          <div className="mb-3 flex gap-2">
            {purchaseLinks.amazon && (
              <a 
                href={purchaseLinks.amazon} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Amazon</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {purchaseLinks.meesho && (
              <a 
                href={purchaseLinks.meesho} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs bg-pink-500 hover:bg-pink-600 text-white px-2 py-1 rounded flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Meesho</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            {discount > 0 && (
              <span className="text-gray-500 text-sm line-through mr-2">
                ₹{Math.round(price / (1 - discount / 100))}
              </span>
            )}
            <span className="text-primary-700 font-bold text-lg">₹{price}</span>
          </div>
          <button
            className="text-sm bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-full transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard