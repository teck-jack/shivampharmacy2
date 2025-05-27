import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrderConfirmationPage from "./pages/OrderConformationPage"
import OrderHistoryPage from "./pages/OrderHistoryPage"
import OrderDetailPage from "./pages/OrderDetailPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SighnupPage"
import ProfilePage from "./pages/ProfilePage"
import ContactPage from "./pages/ContactPage"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { OrderProvider } from "./context/OrderContext"
import ProtectedRoute from "./components/ProtectedRoute"
import ProductDetail from "./components/ProductDetail"
import About from './components/About'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <div className="min-h-screen bg-accent-50 flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/product/:id" element={<ProductDetail product={undefined} />} />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order-confirmation/:orderId"
                    element={
                      <ProtectedRoute>
                        <OrderConfirmationPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <OrderHistoryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders/:orderId"
                    element={
                      <ProtectedRoute>
                        <OrderDetailPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/About" element={<About />} />
                  
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
