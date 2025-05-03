"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartState } from "../types/cart"
import type { Product } from "../types/product"

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  openCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    isOpen: false,
  })

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartState((prev) => ({ ...prev, items: parsedCart }))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState.items))
  }, [cartState.items])

  const addToCart = (product: Product, quantity = 1) => {
    setCartState((prev) => {
      const existingItemIndex = prev.items.findIndex((item) => item.product.id === product.id)

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        const updatedItems = [...prev.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return { ...prev, items: updatedItems }
      } else {
        // Add new item
        return { ...prev, items: [...prev.items, { product, quantity }] }
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCartState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.product.id !== productId),
    }))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartState((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    }))
  }

  const clearCart = () => {
    setCartState((prev) => ({ ...prev, items: [] }))
  }

  const toggleCart = () => {
    setCartState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
  }

  const closeCart = () => {
    setCartState((prev) => ({ ...prev, isOpen: false }))
  }

  const openCart = () => {
    setCartState((prev) => ({ ...prev, isOpen: true }))
  }

  const getCartTotal = () => {
    return cartState.items.reduce((total, item) => {
      const price = item.product.price
      const discountedPrice = item.product.discount > 0 ? price * (1 - item.product.discount / 100) : price
      return total + discountedPrice * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cartState.items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        openCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
