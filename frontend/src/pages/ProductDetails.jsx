"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Star,
  ShoppingCart,
  CheckCircle,
  Heart,
  Share2,
  ArrowLeft,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  ChevronRight,
  Award,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react"
import { useCart } from "../context/CartContext"
import Loader from "../components/Loader"

export default function ProductDetails() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { id } = useParams()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) throw new Error("Product fetch failed")
        const data = await response.json()

        setProduct({
          id: data.id,
          name: data.title,
          price: data.price,
          images: data.images || [],
          description: data.description,
          category: data.category,
          rating: data.rating || 0,
          stock: data.stock,
          originalPrice: (data.price * 1.2).toFixed(2),
          brand: data.brand || "Generic",
          features: ["Premium quality materials", "Designed for durability", "Modern aesthetic appeal"],
        })
      } catch (error) {
        console.error("Error:", error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()

    return () => setAdded(false)
  }, [id])

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + value))
    setQuantity(newQuantity)
  }

  const handleAddToCart = (e) => {
    addToCart({ ...product, quantity })
    setAdded(true)

    setTimeout(() => setAdded(false), 3000)

    const button = e.currentTarget
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()

    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
    ripple.style.width = "100px"
    ripple.style.height = "100px"
    ripple.style.transform = "translate(-50%, -50%) scale(0)"
    ripple.style.animation = "ripple 0.6s linear"
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top = `${e.clientY - rect.top}px`

    button.appendChild(ripple)
    setTimeout(() => button.removeChild(ripple), 600)
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  if (loading) return <Loader />
  if (!product)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl border-2 border-red-200">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl font-bold transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-3 text-sm">
            <li>
              <Link
                to="/"
                className="flex items-center hover:text-purple-600 transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-md"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link
                to={`/category/${product.category}`}
                className="hover:text-purple-600 transition-colors capitalize font-medium bg-purple-100 px-3 py-1 rounded-full"
              >
                {product.category}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-gray-700 truncate max-w-[200px] font-bold bg-gray-100 px-3 py-1 rounded-full">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl shadow-purple-200/50 border-2 border-purple-100 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 relative z-10">
            <div className="space-y-8">
              <div className="aspect-square relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
                <img
                  src={product.images[selectedImage] || "/fallback.jpg"}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 hover:scale-105"
                />
                <button
                  onClick={toggleWishlist}
                  className={`absolute top-6 right-6 w-12 h-12 rounded-2xl ${isWishlisted ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30" : "bg-white/90 backdrop-blur-sm text-gray-500 hover:text-red-500 shadow-lg"} flex items-center justify-center transition-all duration-300 transform hover:scale-110`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>

                <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-green-500/30 animate-pulse">
                  <Zap className="w-4 h-4 inline mr-1" />
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {product.images.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-2xl overflow-hidden border-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      selectedImage === index
                        ? "border-purple-500 shadow-purple-500/30 ring-4 ring-purple-200"
                        : "border-transparent hover:border-purple-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    {product.brand}
                  </span>
                  <span className="flex items-center text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-1" />
                    Fast Delivery
                  </span>
                </div>

                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-6 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-2xl shadow-lg">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-white fill-white" : "text-white/50"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-bold text-white">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">Based on customer reviews</span>
                </div>

                <div className="flex items-baseline mb-8 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-4 text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  <span className="ml-3 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </div>

                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{product.description}</p>

                <div className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Award className="w-6 h-6 text-purple-600 mr-2" />
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col space-y-8">
                  <div className="flex items-center bg-gray-50 p-4 rounded-2xl">
                    <div className="flex items-center border-2 border-gray-200 rounded-2xl bg-white shadow-md">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-l-2xl"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-16 text-center font-bold text-gray-900 text-lg">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-r-2xl"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="ml-6 text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-full shadow-md">
                      {product.stock} items available
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <button
                      onClick={handleAddToCart}
                      disabled={added}
                      className={`relative overflow-hidden flex-1 flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                        added
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/30"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/30 hover:shadow-purple-500/50"
                      }`}
                    >
                      {added ? (
                        <>
                          <CheckCircle className="w-6 h-6 mr-3 animate-bounce" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-6 h-6 mr-3" />
                          Add to Cart
                        </>
                      )}
                    </button>

                    <button className="flex-1 sm:flex-none px-8 py-4 border-2 border-purple-200 rounded-2xl font-bold text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Share2 className="w-6 h-6 mr-3" />
                      Share Product
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl shadow-blue-500/30 text-white transform hover:scale-105 transition-all duration-300">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                    <Truck className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">FREE SHIPPING</h4>
                    <p className="text-blue-100">On orders over $100</p>
                  </div>
                </div>

                <div className="flex items-center p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl shadow-xl shadow-green-500/30 text-white transform hover:scale-105 transition-all duration-300">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                    <Shield className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">SECURE PAYMENT</h4>
                    <p className="text-green-100">100% secure checkout</p>
                  </div>
                </div>

                <div className="flex items-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl shadow-purple-500/30 text-white transform hover:scale-105 transition-all duration-300">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                    <RefreshCw className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">EASY RETURNS</h4>
                    <p className="text-purple-100">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
