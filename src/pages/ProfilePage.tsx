import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useOrders } from "../context/OrderContext"
import { Link } from "react-router-dom"
import { User, MapPin, Phone, Package, ChevronRight, CheckCircle, Mail } from 'lucide-react'
import CartDrawer from "../components/CartDrawer"
import { type Address } from "../types/user"

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth()
  const { orders } = useOrders()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [address, setAddress] = useState<Address>(
    user?.address || {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserProfile({
      name,
      phone,
      address,
    })
    setIsEditing(false)
  }

  const recentOrders = orders.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium text-gray-900">Personal Information</h2>
                <p className="text-gray-600">Update your personal details</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                      <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., +91 98765 43210"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            id="street"
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="House number and street name"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              value={address.city}
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                              State/Province
                            </label>
                            <input
                              type="text"
                              id="state"
                              value={address.state}
                              onChange={(e) => setAddress({ ...address, state: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Postal Code
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              value={address.postalCode}
                              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                              Country
                            </label>
                            <input
                              type="text"
                              id="country"
                              value={address.country}
                              onChange={(e) => setAddress({ ...address, country: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-primary-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{user?.name || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium">{user?.email || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{user?.phone || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
                        {user?.address?.street ? (
                          <>
                            <p className="mb-1">{user.address.street}</p>
                            <p className="mb-1">
                              {user.address.city}, {user.address.state} {user.address.postalCode}
                            </p>
                            <p>{user.address.country}</p>
                          </>
                        ) : (
                          <p className="text-gray-500">No address provided</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">Recent Orders</h2>
              <p className="text-gray-600">Your recent purchases</p>
            </div>

            <div className="p-6">
              {recentOrders.length === 0 ? (
                <div className="text-center py-6">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                  <Link
                    to="/"
                    className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Start shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          {order.status === "delivered" ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <Package className="h-5 w-5 text-primary-600 mr-2" />
                          )}
                          <span className="text-sm font-medium capitalize">{order.status}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2">
                        Order #{order.id.substring(order.id.lastIndexOf("-") + 1)}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">{order.items.length} items</p>
                      <p className="text-sm font-medium mb-3">₹{order.totalAmount.toFixed(2)}</p>
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        View details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  ))}

                  <Link
                    to="/orders"
                    className="block text-center mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View all orders
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CartDrawer />
    </div>
  )
}

export default ProfilePage
