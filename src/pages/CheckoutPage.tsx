"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useOrders } from "../context/OrderContext"
import type { Address } from "../types/user"
import CartDrawer from "../components/CartDrawer"
import React from "react"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, getCartTotal, clearCart } = useCart()
  const { user, updateUserProfile } = useAuth()
  const { createOrder } = useOrders()

  const [address, setAddress] = useState<Address>(
    user?.address || {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
  )
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const cartTotal = getCartTotal()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!address.street.trim()) newErrors.street = "Street address is required"
    if (!address.city.trim()) newErrors.city = "City is required"
    if (!address.state.trim()) newErrors.state = "State is required"
    if (!address.postalCode.trim()) newErrors.postalCode = "Postal code is required"
    if (!phone.trim()) newErrors.phone = "Phone number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Save address to user profile
      if (user) {
        updateUserProfile({
          name,
          phone,
          address,
        })
      }

      // Create deep copies of items to avoid reference issues
      const itemsToSave = items.map((item) => ({
        product: { ...item.product },
        quantity: item.quantity,
      }))

      // Create order
      const order = await createOrder(itemsToSave, { ...address }, cartTotal)
      console.log("Order created successfully:", order)

      // Clear cart
      clearCart()

      // Set session storage flag for order history page
      sessionStorage.setItem("fromOrderConfirmation", "true")

      // Redirect to order confirmation with proper error handling
      navigate(`/order-confirmation/${order.id}`)
    } catch (error) {
      console.error("Error creating order:", error)
      setIsSubmitting(false)
      // Show error to user
      alert("There was an error processing your order. Please try again.")
    }
  }

  // Check if cart is empty at the beginning of the component
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart")
    }
  }, [items.length, navigate])

  // Remove the existing check that might be causing issues
  // if (items.length === 0) {
  //   navigate("/cart");
  //   return null;
  // }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Information</h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="e.g., John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="e.g., you@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="e.g., +91 98765 43210"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address*
                        </label>
                        <input
                          type="text"
                          id="street"
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.street ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="House number and street name"
                        />
                        {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City*
                          </label>
                          <input
                            type="text"
                            id="city"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.city ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State/Province*
                          </label>
                          <input
                            type="text"
                            id="state"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.state ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Postal Code*
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            value={address.postalCode}
                            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.postalCode ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            value={address.country}
                            onChange={(e) => setAddress({ ...address, country: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          checked
                          readOnly
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="cod" className="ml-2 block text-sm font-medium text-gray-700">
                          Cash on Delivery (COD)
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Pay with cash when your order is delivered.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center font-medium mt-8 disabled:bg-primary-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

            <div className="max-h-80 overflow-y-auto mb-4">
              {items.map((item) => {
                const { product, quantity } = item
                const discountedPrice =
                  product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price
                return (
                  <div key={product.id} className="flex py-4 border-b border-gray-200">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-1">{product.name}</h3>
                          <p className="ml-4">₹{discountedPrice.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{product.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {quantity}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer />
    </div>
  )
}

export default CheckoutPage
