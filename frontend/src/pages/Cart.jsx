"use client"

import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Truck,
  CreditCard,
  ShieldCheck,
  Heart,
  ChevronRight,
  Clock,
  Sparkles,
  Award,
} from "lucide-react"
import {ArrowRight} from "lucide-react" // Import ArrowRight

export default function Cart() {
  const { cart, setCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCart(savedCart)
  }, [])

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setDiscount(subtotal * 0.2)
      setPromoApplied(true)
    } else {
      setDiscount(0)
      setPromoApplied(false)
      alert("Invalid promo code")
    }
  }

  const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping - discount

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
        <div className="bg-white rounded-3xl shadow-2xl shadow-purple-200/50 p-12 text-center border-2 border-purple-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-2xl"></div>

          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse relative z-10">
            <ShoppingBag className="h-16 w-16 text-purple-600" />
          </div>
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg">
            Looks like you haven't added anything to your cart yet. Explore our amazing products and find something
            you'll love!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl shadow-purple-500/30 transform hover:scale-105 hover:-translate-y-1"
          >
            <Sparkles className="mr-3 h-6 w-6 animate-spin" />
            Start Shopping
            <ArrowRight className="ml-3 h-6 w-6" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-3xl shadow-2xl shadow-purple-200/50 p-8 border-2 border-purple-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Shopping Cart
                </h2>
                <p className="text-gray-600 mt-1">Review your selected items</p>
              </div>
              <span className="px-6 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg shadow-purple-500/30 animate-pulse">
                {cart.length} {cart.length === 1 ? "ITEM" : "ITEMS"}
              </span>
            </div>

            <div className="space-y-6 relative z-10">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 border-2 border-purple-100 rounded-3xl hover:border-purple-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30"
                >
                  <div className="relative w-full sm:w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-110"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex-grow w-full sm:w-auto">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{item.description}</p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center border-2 border-purple-200 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 shadow-md">
                        <button
                          className="w-10 h-10 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors rounded-l-2xl"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          disabled={(item.quantity || 1) <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 h-10 flex items-center justify-center text-gray-900 font-bold text-lg">
                          {item.quantity || 1}
                        </span>
                        <button
                          className="w-10 h-10 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors rounded-r-2xl"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors bg-red-50 px-3 py-1 rounded-full">
                          <Heart className="h-4 w-4 mr-1" />
                          Save for later
                        </button>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <Clock className="h-4 w-4 mr-1" />
                          Fast delivery
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center relative z-10">
              <Link
                to="/"
                className="text-purple-600 hover:text-purple-700 font-bold flex items-center group bg-purple-50 px-6 py-3 rounded-2xl transition-all duration-300 hover:bg-purple-100"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-3xl shadow-2xl shadow-purple-200/50 p-8 sticky top-24 border-2 border-purple-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>

            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 relative z-10">
              Order Summary
            </h3>

            <div className="mb-8 relative z-10">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow px-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-colors font-medium"
                  disabled={promoApplied}
                />
                <button
                  onClick={applyPromoCode}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    promoApplied
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 transform hover:scale-105"
                  }`}
                  disabled={promoApplied}
                >
                  {promoApplied ? "Applied!" : "Apply"}
                </button>
              </div>
              {promoApplied && (
                <div className="mt-3 text-sm text-green-600 flex items-center bg-green-50 px-4 py-2 rounded-2xl">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Promo code applied successfully!
                </div>
              )}
            </div>

            <div className="space-y-4 border-t-2 border-purple-100 pt-6 mb-8 relative z-10">
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 text-lg">
                  <span>Discount</span>
                  <span className="font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Shipping</span>
                <span className="font-bold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 border-t-2 border-purple-100 pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl shadow-purple-500/30 flex items-center justify-center text-lg transform hover:scale-105 hover:-translate-y-1 relative z-10">
              <Sparkles className="mr-3 h-6 w-6 animate-spin" />
              Proceed to Checkout
              <ChevronRight className="ml-3 h-6 w-6" />
            </button>

            <div className="mt-8 space-y-4 relative z-10">
              <div className="flex items-center text-gray-600 text-sm bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
                <Truck className="h-6 w-6 text-blue-600 mr-3" />
                <span className="font-medium">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                <span className="font-medium">Secure payment processing</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200">
                <Award className="h-6 w-6 text-purple-600 mr-3" />
                <span className="font-medium">30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
