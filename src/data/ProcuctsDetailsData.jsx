import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Create a context for product data
const ProductContext = createContext();

// Sample product data (in a real app, this would come from an API or database)
const sampleProducts = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    category: "Clothing",
    price: 599.99,
    discount: 10,
    rating: 4.5,
    reviews: 120,
    image: "/api/placeholder/600/600",
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    description: "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this t-shirt offers breathability and softness that lasts all day.",
    features: [
      "100% organic cotton",
      "Pre-shrunk fabric",
      "Reinforced stitching",
      "Available in multiple colors",
      "Machine washable"
    ],
    inStock: true,
    specifications: {
      "Material": "100% Organic Cotton",
      "Fit": "Regular",
      "Care": "Machine wash cold",
      "Origin": "Made in India",
      "Weight": "160 GSM"
    }
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1499.99,
    discount: 15,
    rating: 4.2,
    reviews: 85,
    image: "/api/placeholder/600/600",
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    description: "Immerse yourself in superior sound quality with our wireless bluetooth headphones. Featuring active noise cancellation and up to 30 hours of battery life.",
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Quick charge - 10 min for 5 hours playback",
      "Bluetooth 5.0",
      "Built-in microphone for calls"
    ],
    inStock: true,
    specifications: {
      "Connectivity": "Bluetooth 5.0",
      "Battery": "30 hours",
      "Charging": "USB-C",
      "Weight": "250g",
      "Frequency": "20Hz-20kHz"
    }
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    price: 349.99,
    discount: 0,
    rating: 4.8,
    reviews: 210,
    image: "/api/placeholder/600/600",
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    description: "Stay hydrated in style with our vacuum-insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
    features: [
      "Double-walled vacuum insulation",
      "BPA-free and non-toxic",
      "Leak-proof design",
      "Durable powder coating",
      "Available in multiple colors and sizes"
    ],
    inStock: true,
    specifications: {
      "Material": "18/8 Food-grade Stainless Steel",
      "Capacity": "750ml",
      "Insulation": "24hr cold / 12hr hot",
      "Lid Type": "Screw cap with silicone seal",
      "Weight": "350g"
    }
  }
];

// In a real application, you would fetch product data from an API
export const ProductProvider = ({ children }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchProduct = () => {
      setLoading(true);
      
      // In a real app, this would be an API call
      setTimeout(() => {
        try {
          // Find product by ID from our sample data
          const foundProduct = sampleProducts.find(p => p.id === id);
          
          if (foundProduct) {
            setProduct(foundProduct);
            setError(null);
          } else {
            setError("Product not found");
            setProduct(null);
          }
        } catch (err) {
          setError("Failed to fetch product");
          setProduct(null);
        } finally {
          setLoading(false);
        }
      }, 800); // Simulate network delay
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // For related products (a simple implementation)
  const getRelatedProducts = () => {
    if (!product) return [];
    // Return products in the same category, excluding the current product
    return sampleProducts.filter(p => p.category === product.category && p.id !== product.id);
  };

  return (
    <ProductContext.Provider value={{ product, loading, error, getRelatedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

// ProductPage component that uses both ProductProvider and ProductDetail
import ProductDetail from "./ProductDetail";

const ProductPage = () => {
  return (
    <ProductProvider>
      <ProductDetailContainer />
    </ProductProvider>
  );
};

// Container component that consumes the product context
const ProductDetailContainer = () => {
  const { product, loading, error } = useProduct();
  
  if (loading) {
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
};

export default ProductPage;