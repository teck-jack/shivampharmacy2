import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft, Star, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import { products } from "../data/productData"; // Import your products data
import { useNavigate } from "react-router-dom";


const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);



  // Find the product by id
  const product = products.find(p => p.id === Number(id));

  // If product isn't found, show loading state
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

  // Calculate discounted price

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/checkout");
    }, 1500);
  };

  // Add this somewhere in your return JSX:
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    showSuccess && (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
        Item added to cart! Redirecting to checkout...
      </div>
    )
  }

  // Create an array with the main image (since your data has single image)
  const productImages = [product.image || "/placeholder.svg"];

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
                  src={`/${product.image?.split('?')[0] ?? "placeholder.svg"}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (!img.dataset.fallback) {
                      img.src = "/placeholder.svg";
                      img.dataset.fallback = "true"; // prevents looping
                    }
                  }}
                />

              </div>

              {/* Thumbnail Gallery - Only show if multiple images exist */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {productImages.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 
                        ${activeImage === index ? 'border-primary-600' : 'border-transparent'}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    In Stock
                  </span>
                </div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mt-2">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    ({(Math.floor(Math.random() * 100) + 10)} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                {product.discount > 0 && (
                  <span className="ml-2 text-gray-500 line-through">
                    ₹{Math.round(product.price / (1 - product.discount / 100))}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Weight */}
              <div className="flex items-center">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Weight: {product.waight}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Purchase Links */}
              {product.purchaseLinks && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Buy from</h3>
                  <div className="flex gap-2">
                    {product.purchaseLinks.amazon && (
                      <a
                        href={product.purchaseLinks.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded flex items-center gap-1"
                      >
                        <span>Amazon</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {product.purchaseLinks.meesho && (
                      <a
                        href={product.purchaseLinks.meesho}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded flex items-center gap-1"
                      >
                        <span>Meesho</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
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
        </div>
      </div>
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;