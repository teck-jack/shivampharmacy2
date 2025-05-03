"use client"

import { useState, useEffect } from "react"
import { Menu, X, Leaf, ShoppingCart, Search, User, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import React from "react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { getCartCount, toggleCart } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const cartCount = getCartCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate("/")
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-6">
            <img src="logo.webp" alt="Shivam Pharmacy" className="h-8 w-8 "></img>
            <span className="text-2xl font-bold text-primary-600">Shivam Pharmacy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-primary-700 hover:text-primary-500 font-medium transition-colors">
              Home
            </Link>
            <Link to="/#products" className="text-primary-700 hover:text-primary-500 font-medium transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-primary-700 hover:text-primary-500 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-primary-700 hover:text-primary-500 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-primary-700 hover:text-primary-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                className="text-primary-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="h-5 w-5" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Create account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button className="text-primary-700 hover:text-primary-500 transition-colors relative" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#products"
                className="text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="text-left text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-primary-700 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create account
                  </Link>
                </>
              )}
            </nav>
            <div className="flex justify-between mt-4 pt-4 border-t border-primary-100">
              <button className="p-2 text-primary-700 hover:bg-primary-50 rounded-full transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-primary-700 hover:bg-primary-50 rounded-full transition-colors relative"
                onClick={() => {
                  toggleCart()
                  setIsMenuOpen(false)
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
