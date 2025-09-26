"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  ShoppingBag,
  ArrowRight,
  Star,
  ChevronRight,
  ShoppingCart,
  Award,
  Truck,
  RefreshCw,
  Check,
  Zap,
  Shield,
} from "lucide-react"

const Home = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      description: "Cutting-edge technology for modern life",
      items: "2000+ products",
      path: "/electronics",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      description: "Trending styles for every occasion",
      items: "1500+ items",
      path: "/fashion",
    },
    {
      name: "Stationery",
      image: "https://img.freepik.com/free-photo/parallel-fineliners-white-background_23-2148224274.jpg",
      description: "Premium supplies for productivity",
      items: "800+ products",
      path: "/stationery",
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.8,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      category: "electronics",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      category: "fashion",
      badge: "New"
    },
    {
      id: 3,
      name: "Professional Notebook Set",
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.7,
      reviews: 56,
      image:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      category: "stationery",
      badge: "Limited"
    },
    {
      id: 4,
      name: "Smart Watch Series 5",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      category: "electronics",
      badge: "Featured"
    },
  ]

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100",
      color: "bg-slate-900"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
      color: "bg-slate-900"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% protected checkout",
      color: "bg-slate-900"
    }
  ]

  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "10K+", label: "Products" },
    { value: "99.9%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support" }
  ]

  return (
    <div className="min-h-screen bg-white">
     {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden min-h-[65vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/new.avif')" }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Premium Shopping Experience</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Discover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                Premium Quality
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              Curated collection of the finest products across electronics, fashion, and stationery. 
              Experience excellence in every purchase.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 group shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="#categories"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Browse Categories
              </a>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-200 mb-2">{stat.value}</div>
                <div className="text-gray-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Kept as requested */}
      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover our carefully curated collections across premium categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-w-4 aspect-h-5 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90 mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/80">{category.items}</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Handpicked selections from our premium collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link
                to={`/product/${product.category}/${product.id}`}
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <ShoppingCart className="w-5 h-5 text-slate-900" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                      <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors duration-300 group"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-slate-300 mb-8">
            Subscribe to get special offers, exclusive deals, and first access to new products
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home