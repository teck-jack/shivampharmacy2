import type { User } from "../types/user"

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 87654 32109",
    address: {
      street: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India",
    },
  },
]
