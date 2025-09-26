"use client"
import { useState, useEffect } from "react"
import { ShoppingCart, Zap, Star, TrendingUp } from "lucide-react"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"

const Electronics = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = [
          "smartphones",
          "laptops",
          "tablets",
          "gaming-consoles",
          "headphones",
          "speakers",
          "smart-watches",
          "televisions",
        ]

        const categoryRequests = categories.map((category) =>
          fetch(`https://dummyjson.com/products/category/${category}`).then((res) => res.json()),
        )

        const categoryData = await Promise.all(categoryRequests)

        const combinedProducts = categoryData.flatMap(({ products }) =>
          products.map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.thumbnail,
            description: item.description,
            features: [item.brand, `${item.rating}/5 Rating`, `${item.stock} in Stock`],
            colors: ["black", "white", "gray"],
            rating: item.rating,
            reviews: item.stock,
            originalPrice: item.price + (item.discountPercentage * item.price) / 100,
          })),
        )

        setProducts(combinedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold mb-4 shadow-xl shadow-blue-500/30 animate-pulse">
              <Zap className="w-4 h-4 mr-2 animate-bounce" />
              TECH ZONE
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 mb-4">
              Electronics
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-lg">
                {products.length} PRODUCTS
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                FREE SHIPPING
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-3xl opacity-60 animate-pulse"></div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-blue-300 transition-all duration-500 transform hover:scale-105 hover:-translate-y-3"
              >
                <Link to={`/product/electronics/${product.id}`} className="block mb-6">
                  <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.rating >= 4.5 && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                        ⭐ TOP RATED
                      </span>
                    )}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                      HOT DEAL
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {product.name}
                  </h2>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.originalPrice > product.price && (
                        <p className="text-gray-500 text-sm line-through">${product.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                    <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full shadow-lg">
                      <Star className="w-4 h-4 text-white mr-1 fill-current" />
                      <span className="text-sm font-bold text-white">{product.rating}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {product.features[0]}
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <button className="group/btn flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                    <ShoppingCart className="h-5 w-5 group-hover/btn:animate-bounce" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Electronics
