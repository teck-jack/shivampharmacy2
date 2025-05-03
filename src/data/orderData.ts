import type { Order } from "../types/order"
import { products } from "./productData"

export const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    items: [
      { product: products[0], quantity: 2 },
      { product: products[2], quantity: 1 },
    ],
    totalAmount: 1120,
    status: "delivered",
    paymentMethod: "COD",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    createdAt: "2023-12-15T10:30:00Z",
    updatedAt: "2023-12-20T14:45:00Z",
  },
  {
    id: "order-2",
    userId: "user-1",
    items: [
      { product: products[3], quantity: 1 },
      { product: products[6] || products[1], quantity: 2 },
    ],
    totalAmount: 1030,
    status: "shipped",
    paymentMethod: "COD",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    createdAt: "2024-01-05T09:15:00Z",
    updatedAt: "2024-01-08T11:20:00Z",
  },
  {
    id: "order-3",
    userId: "user-2",
    items: [
      { product: products[4], quantity: 1 },
      { product: products[1], quantity: 2 },
    ],
    totalAmount: 1620,
    status: "processing",
    paymentMethod: "COD",
    address: {
      street: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India",
    },
    createdAt: "2024-02-10T14:20:00Z",
    updatedAt: "2024-02-11T08:30:00Z",
  },
  {
    id: "order-4",
    userId: "user-1",
    items: [
      { product: products[5], quantity: 1 },
      { product: products[0], quantity: 1 },
    ],
    totalAmount: 715,
    status: "pending",
    paymentMethod: "COD",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    createdAt: "2024-04-25T11:30:00Z",
    updatedAt: "2024-04-25T11:30:00Z",
  },
]
