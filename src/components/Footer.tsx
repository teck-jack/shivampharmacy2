import React from "react"
import { Leaf, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-700 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.webp" alt="Logo" className="h-15 w-20"></img>
              <span className="text-xl font-serif font-bold">Shivam Pharmacy</span>
            </div>
            <p className="text-primary-100 mb-6 leading-relaxed">
              Welcome to Shivam Pharmacy, with our premium, natural products crafted with care for holistic
              well-being and balance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-accent-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-primary-100 hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Ayurvedic Practices
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-accent-200">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-200 mt-0.5" />
                <span className="text-primary-100">
                  Chhatri Bazar Fruit Market Lashkar Gwalior
                  <br />
                  Gwalior Madhya Pradesh 474001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-200" />
                <span className="text-primary-100">+91 9926731210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-200" />
                <span className="text-primary-100">bharatsinghk841@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-accent-200">Subscribe</h3>
            <p className="text-primary-100 mb-4">Get the latest updates about new products and special offers.</p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-primary-800 border border-primary-600 rounded-l-md px-4 py-2 w-full placeholder:text-primary-400 text-white focus:outline-none focus:ring-2 focus:ring-accent-300"
                />
                <button
                  type="submit"
                  className="bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-r-md px-4 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
            <p className="text-primary-300 text-sm">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-600 mt-12 pt-8 text-center text-primary-300 text-sm">
          <p>© {new Date().getFullYear()} Ayurveda Essence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
