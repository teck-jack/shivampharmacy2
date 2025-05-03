"use client"

import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { CheckCircle, ArrowRight, Truck, ShoppingBag, AlertCircle } from "lucide-react"
import { useOrders } from "../context/OrderContext"
import type { Order } from "../types/order"
import CartDrawer from "../components/CartDrawer"
import React from "react"

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const { getOrderById } = useOrders()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (orderId) {
      setLoading(true)
      try {
        const foundOrder = getOrderById(orderId)
        if (foundOrder) {
          setOrder(foundOrder)
          setError(null)
        } else {
          console.error(`Order not found: ${orderId}`)
          setError("Order not found")
          // Give user time to read the error before redirecting
          setTimeout(() => navigate("/orders"), 3000)
        }
      } catch (err) {
        console.error("Error loading order:", err)
        setError("Failed to load order details")
      } finally {
        setLoading(false)
      }
    }
  }, [orderId, getOrderById, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-red-50 rounded-lg shadow-md p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The requested order could not be found."}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="w-full sm:w-auto bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center"
            >
              View All Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-primary-50 border-b border-primary-100 flex items-center">
          <CheckCircle className="h-10 w-10 text-primary-600 mr-4" />
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your order. We've received your request.</p>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
              <span className="text-sm text-gray-500">Order #{order.id.substring(order.id.lastIndexOf("-") + 1)}</span>
            </div>

            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">Cash on Delivery (COD)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Status</p>
                  <p className="font-medium capitalize">{order.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">Shipping Address</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="mb-1">{order.address.street}</p>
                <p className="mb-1">
                  {order.address.city}, {order.address.state} {order.address.postalCode}
                </p>
                <p>{order.address.country}</p>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Order Items</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => {
                      const { product, quantity } = item
                      const discountedPrice =
                        product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price
                      const itemTotal = discountedPrice * quantity

                      return (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            ₹{discountedPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            ₹{itemTotal.toFixed(2)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <th scope="row" colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        Subtotal
                      </th>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        ₹{order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        Shipping
                      </th>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900">Free</td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        Total
                      </th>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        ₹{order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Link
              to="/"
              className="w-full sm:w-auto bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center"
            >
              View All Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="p-6 bg-primary-50 border-t border-primary-100">
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-primary-600 mr-2" />
            <p className="text-sm text-gray-600">
              Your order will be processed and shipped within 1-2 business days. You'll receive updates on your order
              status via email.
            </p>
          </div>
        </div>
      </div>
      <CartDrawer />
    </div>
  )
}

export default OrderConfirmationPage
