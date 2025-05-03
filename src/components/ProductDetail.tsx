import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

const ProductDetail = ({ product }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // If product isn't passed through props, show loading state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-md mb-6"></div>
              <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md mb-6"></div>
              <div className="h-12 bg-gray-200 rounded-md w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate discounted price if there's a discount
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Create an array of product images (assuming product has multiple images)
  // If not, use the main image multiple times for the gallery
  const productImages = product.images 
    ? product.images 
    : Array(4).fill(product.image || "/placeholder.svg");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="text-gray-500 hover:text-primary-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={productImages[activeImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.slice(0, 4).map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 
                      ${activeImage === index ? 'border-primary-600' : 'border-transparent'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image || "/placeholder.svg"} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  {product.inStock && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      In Stock
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mt-2">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {product.reviews ? `(${product.reviews} reviews)` : "(No reviews yet)"}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">₹{discountedPrice.toFixed(2)}</span>
                {product.discount > 0 && (
                  <span className="ml-2 text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
                )}
                {product.discount > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description || "No description available."}</p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Features</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Add to Cart */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-24">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center font-medium"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                  <div>
                    <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info (Specifications, Reviews, etc.) */}
          <div className="border-t border-gray-200 p-6">
            <div className="max-w-3xl mx-auto">
              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="font-medium text-gray-900 w-1/3">{key}</span>
                        <span className="text-gray-600 w-2/3">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* More product details can be added here */}
            </div>
          </div>
        </div>
      </div>
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;