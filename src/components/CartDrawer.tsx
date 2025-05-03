"use client"

import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"
import React from "react"

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()

  if (!isOpen) return null

  const cartTotal = getCartTotal()
  const itemCount = getCartCount()

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={closeCart} />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-medium">Your Cart ({itemCount})</h2>
          </div>
          <button onClick={closeCart} className="rounded-full p-1 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Looks like you haven't added any products yet.</p>
              <button
                onClick={closeCart}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((item) => {
                const { product, quantity } = item
                const discountedPrice =
                  product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price

                return (
                  <li key={product.id} className="py-4 flex">
                    {/* Product Image */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-1">{product.name}</h3>
                          <p className="ml-4">₹{discountedPrice.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{product.category}</p>
                      </div>

                      <div className="flex flex-1 items-end justify-between text-sm">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="font-medium text-primary-600 hover:text-primary-500 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>₹{cartTotal.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={closeCart}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center font-medium"
            >
              Checkout
            </Link>

            {/* Continue Shopping */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={closeCart}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartDrawer
