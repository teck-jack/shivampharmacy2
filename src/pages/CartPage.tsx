import { Link } from "react-router-dom"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from "../context/CartContext"
import CartDrawer from "../components/CartDrawer"
import React from "react"

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const cartTotal = getCartTotal()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link
            to="/"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center"
          >
            Continue Shopping
          </Link>
        </div>
        <CartDrawer />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4">Product</th>
                    <th className="text-center pb-4">Quantity</th>
                    <th className="text-right pb-4">Price</th>
                    <th className="text-right pb-4">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => {
                    const { product, quantity } = item
                    const discountedPrice =
                      product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price
                    const itemTotal = discountedPrice * quantity

                    return (
                      <tr key={product.id} className="py-4">
                        <td className="py-4">
                          <div className="flex items-center">
                            <Link to={`/products/${product.id}`}>
                              
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-16 w-16 object-cover rounded-md mr-4"
                            />
                            </Link>
                            <div>
                              <h3 className="font-medium text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-2 w-8 text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right">₹{discountedPrice.toFixed(2)}</td>
                        <td className="py-4 text-right font-medium">₹{itemTotal.toFixed(2)}</td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center font-medium mt-6"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                to="/"
                className="w-full text-center block mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer />
    </div>
  )
}

export default CartPage
