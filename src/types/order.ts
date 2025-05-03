import type { Address } from "./user"
import type { CartItem } from "./cart"

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: OrderStatus
  paymentMethod: "COD"
  address: Address
  createdAt: string
  updatedAt: string
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"
