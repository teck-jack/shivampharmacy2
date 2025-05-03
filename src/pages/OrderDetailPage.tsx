"use client"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useOrders } from "../context/OrderContext"
import type { Order } from "../types/order"
import CartDrawer from "../components/CartDrawer"
import React from "react"

const OrderStatusSteps = ({ status }: { status: string }) => {
  const steps = [
    { id: "pending", label: "Order Placed", icon: Clock },
    { id: "processing", label: "Processing", icon: Package },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "delivered", label: "Delivered", icon: CheckCircle },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === status)
  const isCancelled = status === "cancelled"

  if (isCancelled) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 rounded-md border border-red-100 mb-6">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <span className="text-red-700 font-medium">This order has been cancelled</span>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${Math.max(((currentStepIndex + 1) / steps.length) * 100, 5)}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-500"
          ></div>
        </div>
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = index <= currentStepIndex
            const isCurrentStep = index === currentStepIndex

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                    isActive
                      ? isCurrentStep
                        ? "bg-primary-600 text-white"
                        : "bg-primary-100 text-primary-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <StepIcon className="h-5 w-5" />
                </div>
                <div className="text-xs text-center">
                  <p
                    className={`font-medium ${
                      isActive ? (isCurrentStep ? "text-primary-600" : "text-gray-900") : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const { getOrderById, updateOrderStatus } = useOrders()
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
          setError("Order not found")
          // Give user time to read the error before redirecting
          setTimeout(() => navigate("/orders"), 3000)
        }
      } catch (err) {
        setError("Failed to load order details")
      } finally {
        setLoading(false)
      }
    }
  }, [orderId, getOrderById, navigate])

  // Function to simulate order status update
  const handleUpdateStatus = (newStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled") => {
    if (order && orderId) {
      updateOrderStatus(orderId, newStatus)
      setOrder({ ...order, status: newStatus, updatedAt: new Date().toISOString() })
    }
  }

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
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Error Loading Order</h2>
          <p className="text-gray-600 mb-6">{error || "The requested order could not be found."}</p>
          <Link to="/orders" className="text-primary-600 hover:text-primary-700 font-medium">
            Return to Orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/orders" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                Order #{order.id.substring(order.id.lastIndexOf("-") + 1)}
              </h1>
              <p className="text-gray-600">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize bg-primary-100 text-primary-800">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <OrderStatusSteps status={order.status} />

          {/* Admin Controls (for demo purposes) */}
          <div className="mb-8 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Controls - Update Order Status</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleUpdateStatus("pending")}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
              >
                Set Pending
              </button>
              <button
                onClick={() => handleUpdateStatus("processing")}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
              >
                Set Processing
              </button>
              <button
                onClick={() => handleUpdateStatus("shipped")}
                className="px-3 py-1 text-xs bg-primary-100 text-primary-800 rounded-full hover:bg-primary-200"
              >
                Set Shipped
              </button>
              <button
                onClick={() => handleUpdateStatus("delivered")}
                className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200"
              >
                Set Delivered
              </button>
              <button
                onClick={() => handleUpdateStatus("cancelled")}
                className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200"
              >
                Set Cancelled
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Note: These controls are for demonstration purposes only.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-md p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <p className="mb-1">{order.address.street}</p>
              <p className="mb-1">
                {order.address.city}, {order.address.state} {order.address.postalCode}
              </p>
              <p>{order.address.country}</p>
            </div>

            <div className="bg-gray-50 rounded-md p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">₹{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Payment Method</span>
                  <p className="font-medium">Cash on Delivery (COD)</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
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
              </table>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer />
    </div>
  )
}

export default OrderDetailPage
