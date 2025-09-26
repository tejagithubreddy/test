// Fashion.jsx
"use client"
import { useState, useEffect } from "react"
import { ShoppingCart, Minus, Plus, Sparkles, Star, Heart } from "lucide-react"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"

const Fashion = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = [
          "mens-shirts",
          "mens-shoes",
          "mens-watches",
          "womens-dresses",
          "womens-shoes",
          "womens-watches",
          "sunglasses",
          "tops",
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
            colors: ["black", "blue", "red"],
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

  const increaseQuantity = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }))
  }

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      if (!prevCart[productId]) return prevCart
      const updatedCart = { ...prevCart }
      if (updatedCart[productId] === 1) {
        delete updatedCart[productId]
      } else {
        updatedCart[productId]--
      }
      return updatedCart
    })
  }

  const addToCart = (productId) => {
    if (!cart[productId]) {
      setCart((prevCart) => ({
        ...prevCart,
        [productId]: 1,
      }))
    }
    toast.success("Added to Cart")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-bold mb-4 shadow-xl shadow-pink-500/30 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              FASHION ZONE
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-4">
              Fashion
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <span className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
                {products.length} STYLES
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                TRENDING NOW
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-r from-pink-400/20 via-purple-400/20 via-rose-400/20 to-indigo-400/20 blur-3xl opacity-60 animate-pulse"></div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-5 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-pink-300 transition-all duration-500 transform hover:scale-105 hover:-translate-y-3"
              >
                <Link to={`/product/fashion/${product.id}`} className="block mb-5">
                  <div className="relative overflow-hidden rounded-2xl mb-5 bg-gradient-to-br from-pink-50 to-purple-50">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.originalPrice > product.price && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                        🔥 SALE
                      </span>
                    )}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                      TRENDY
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-3 line-clamp-2">
                    {product.name}
                  </h2>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.originalPrice > product.price && (
                        <p className="text-gray-500 text-sm line-through">${product.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                    <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full shadow-lg">
                      <Star className="w-3 h-3 text-white mr-1 fill-current" />
                      <span className="text-xs font-bold text-white">{product.rating}</span>
                    </div>
                  </div>
                </Link>

                {cart[product.id] ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border-2 border-pink-200 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className="p-2 hover:bg-pink-100 hover:text-pink-600 transition-colors rounded-l-xl"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-1 font-bold text-gray-900">{cart[product.id]}</span>
                      <button
                        onClick={() => increaseQuantity(product.id)}
                        className="p-2 hover:bg-pink-100 hover:text-pink-600 transition-colors rounded-r-xl"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {product.features[0]}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {product.features[0]}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="group/btn flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                    >
                      <ShoppingCart className="h-4 w-4 group-hover/btn:animate-bounce" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fashion
