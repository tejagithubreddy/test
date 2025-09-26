"use client"

import { Sparkles, ShoppingBag } from "lucide-react"

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping opacity-30 animation-delay-200"></div>

        {/* Main loader container */}
        <div className="relative w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/30">
          <ShoppingBag className="w-10 h-10 text-white animate-bounce" />
        </div>

        {/* Floating sparkles */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
          Loading Amazing Products
        </h3>
        <p className="text-gray-600 font-medium">Please wait while we prepare something special for you...</p>

        {/* Animated dots */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
