export interface User {
  id: string
  name?: string
  email?: string
  phone?: string
  address?: Address
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}
