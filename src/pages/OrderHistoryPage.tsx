"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Package, ChevronRight, ShoppingBag, Clock, CheckCircle, Truck, AlertCircle, RefreshCw } from "lucide-react"
import { useOrders } from "../context/OrderContext"
import CartDrawer from "../components/CartDrawer"

const OrderStatusIcon = ({ status }) => {
  switch (status) {
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />
    case "processing":
      return <Package className="h-5 w-5 text-blue-500" />
    case "shipped":
      return <Truck className="h-5 w-5 text-primary-600" />
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "cancelled":
      return <AlertCircle className="h-5 w-5 text-red-500" />
    default:
      return <Clock className="h-5 w-5 text-gray-500" />
  }
}

const OrderHistoryPage = () => {
  const { orders, loading, error } = useOrders()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showNewOrderBanner, setShowNewOrderBanner] = useState(false)

  // Check if we're coming from order confirmation
  useEffect(() => {
    const fromOrderConfirmation = sessionStorage.getItem("fromOrderConfirmation")
    if (fromOrderConfirmation === "true") {
      setShowNewOrderBanner(true)
      sessionStorage.removeItem("fromOrderConfirmation")

      // Auto-hide the banner after 5 seconds
      const timer = setTimeout(() => {
        setShowNewOrderBanner(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Function to simulate refreshing orders
  const refreshOrders = () => {
    setIsRefreshing(true)
    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading orders...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-center">Error loading orders: {error}</div>
  }

  // Sort orders by date (newest first)
  const sortedOrders = Array.isArray(orders)
    ? [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : []

  if (!sortedOrders || sortedOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to place your first order!
          </p>
          <Link
            to="/"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center"
          >
            Browse Products
          </Link>
        </div>
        <CartDrawer />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {showNewOrderBanner && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-800">
              Your order has been successfully placed and is now visible in your order history.
            </p>
          </div>
          <button onClick={() => setShowNewOrderBanner(false)} className="text-green-500 hover:text-green-700">
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Your Orders</h1>
        <button
          onClick={refreshOrders}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Order History</h2>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        <div className="divide-y divide-gray-200">
          {sortedOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <OrderStatusIcon status={order.status} />
                    <span className="ml-2 text-sm font-medium capitalize">{order.status}</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mt-2">
                    Order #{order.id && order.id.includes("-") ? order.id.substring(order.id.lastIndexOf("-") + 1) : order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end">
                  <p className="text-lg font-medium text-gray-900">₹{order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}</p>
                  <p className="text-sm text-gray-500 mb-4 md:mb-2">{order.items ? order.items.length : 0} items</p>
                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700"
                  >
                    View Order Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items && order.items.slice(0, 3).map((item) => (
                  <div key={item.product?.id || `item-${Math.random()}`} className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item?.product?.image ?? "/placeholder.svg"}
                        alt={item?.product?.name ?? "Product image"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product?.name || "Product"}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
                {order.items && order.items.length > 3 && (
                  <div className="flex items-center justify-center">
                    <p className="text-sm text-gray-500">+{order.items.length - 3} more items</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CartDrawer />
    </div>
  )
}

export default OrderHistoryPage