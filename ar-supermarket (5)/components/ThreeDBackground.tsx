"use client"

import { ShoppingCart } from "lucide-react"

export default function ThreeDBackground() {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <ShoppingCart size={120} className="text-white opacity-10" />
    </div>
  )
}

