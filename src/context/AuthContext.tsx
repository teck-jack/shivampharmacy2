"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, AuthState } from "../types/user"
import { mockUsers } from "../data/userData"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUserProfile: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setAuthState({
          user: parsedUser,
          isAuthenticated: true,
          loading: false,
          error: null,
        })
      } catch (error) {
        localStorage.removeItem("user")
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        })
      }
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }))
    }
  }, [])

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      // Simulate API call with mock data
      const user = mockUsers.find((u) => u.email === email)

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // In a real app, you would verify the password here

      localStorage.setItem("user", JSON.stringify(user))

      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      })
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }))
      throw error
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      // Check if user already exists
      if (mockUsers.some((u) => u.email === email)) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
      }

      // In a real app, you would save the user to your database
      mockUsers.push(newUser)

      localStorage.setItem("user", JSON.stringify(newUser))

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        loading: false,
        error: null,
      })
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }))
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    })
  }

  const updateUserProfile = (userData: Partial<User>) => {
    if (!authState.user) return

    const updatedUser = { ...authState.user, ...userData }

    // Update in mock data
    const userIndex = mockUsers.findIndex((u) => u.id === authState.user?.id)
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser
    }

    localStorage.setItem("user", JSON.stringify(updatedUser))

    setAuthState((prev) => ({
      ...prev,
      user: updatedUser,
    }))
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
