"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Order, OrderStatus } from "../types/order"
import type { CartItem } from "../types/cart"
import type { Address } from "../types/user"
import { useAuth } from "./AuthContext"
import { mockOrders } from "../data/orderData"

interface OrderContextType {
  orders: Order[]
  loading: boolean
  error: string | null
  createOrder: (items: CartItem[], address: Address, totalAmount: number) => Promise<Order>
  getOrderById: (orderId: string) => Order | undefined
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

// Add a key for localStorage
const ORDERS_STORAGE_KEY = "ayurveda_orders"

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load orders from localStorage and merge with mock data
  useEffect(() => {
    const loadOrders = () => {
      setLoading(true)
      try {
        // Load saved orders from localStorage
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
        let userOrders = [...mockOrders] // Create a copy of mock orders

        if (user) {
          // Filter mock orders for current user
          userOrders = userOrders.filter((order) => order.userId === user.id)

          if (savedOrders) {
            const parsedOrders = JSON.parse(savedOrders) as Order[]
            // Filter orders for current user
            const savedUserOrders = parsedOrders.filter((order) => order.userId === user.id)

            // Combine saved orders with mock orders, avoiding duplicates
            const orderIds = new Set(savedUserOrders.map((order) => order.id))
            const filteredMockOrders = userOrders.filter((order) => !orderIds.has(order.id))

            userOrders = [...savedUserOrders, ...filteredMockOrders]
          }
        } else {
          // If no user is logged in, don't show any orders
          userOrders = []
        }

        setOrders(userOrders)
        setError(null)
      } catch (error) {
        console.error("Failed to load orders:", error)
        setError("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [user])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      try {
        // Get existing orders from localStorage
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
        let allOrders: Order[] = []

        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders) as Order[]
          // Filter out orders for current user (we'll replace them)
          const otherUserOrders = user ? parsedOrders.filter((order) => order.userId !== user.id) : parsedOrders
          allOrders = [...otherUserOrders, ...orders]
        } else {
          allOrders = orders
        }

        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(allOrders))
      } catch (error) {
        console.error("Failed to save orders:", error)
      }
    }
  }, [orders, user])

  const createOrder = async (items: CartItem[], address: Address, totalAmount: number): Promise<Order> => {
    if (!user) {
      console.error("User not authenticated")
      throw new Error("User must be logged in to create an order")
    }

    setLoading(true)

    try {
      // Create new order with deep cloned items to avoid reference issues
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        userId: user.id,
        items: items.map((item) => ({
          product: { ...item.product },
          quantity: item.quantity,
        })),
        totalAmount,
        status: "pending",
        paymentMethod: "COD",
        address: { ...address }, // Clone address to avoid reference issues
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log("Creating new order:", newOrder)

      // Update state with new order
      setOrders((prev) => [newOrder, ...prev])

      // Add to mock data for this session
      mockOrders.push(newOrder)

      // Save to localStorage immediately to prevent data loss
      try {
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
        let allOrders: Order[] = []

        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders) as Order[]
          // Filter out orders for current user (we'll replace them)
          const otherUserOrders = parsedOrders.filter((order) => order.userId !== user.id)
          allOrders = [...otherUserOrders, newOrder, ...orders]
        } else {
          allOrders = [newOrder, ...orders]
        }

        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(allOrders))
      } catch (storageError) {
        console.error("Failed to save order to localStorage:", storageError)
        // Continue execution even if localStorage fails
      }

      setLoading(false)
      return newOrder
    } catch (error) {
      console.error("Error in createOrder:", error)
      setError("Failed to create order")
      setLoading(false)
      throw error
    }
  }

  const getOrderById = (orderId: string) => {
    const foundOrder = orders.find((order) => order.id === orderId)
    console.log(`Looking for order ${orderId}:`, foundOrder ? "Found" : "Not found")
    return foundOrder
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order)),
    )

    // Update in mock data
    const orderIndex = mockOrders.findIndex((order) => order.id === orderId)
    if (orderIndex !== -1) {
      mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        status,
        updatedAt: new Date().toISOString(),
      }
    }

    // Update in localStorage
    try {
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders) as Order[]
        const updatedOrders = parsedOrders.map((order) =>
          order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order,
        )
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders))
      }
    } catch (error) {
      console.error("Failed to update order status in localStorage:", error)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
