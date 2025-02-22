"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, Users, Zap, Mic } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function UserProfile({
  addToCart,
  setActiveView,
  coupons,
  upcomingDeals,
  loyaltyPoints,
  handleInvitation,
}) {
  const [isListening, setIsListening] = useState(false)

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    purchaseHistory: [
      { id: 1, name: "Futuristic Cereal", date: "2023-06-01", price: 9.99, image: "/placeholder.svg" },
      { id: 2, name: "Holo-Milk", date: "2023-06-02", price: 5.99, image: "/placeholder.svg" },
    ],
  }

  const [activeTab, setActiveTab] = useState("profile")

  const recommendations = [
    { id: 1, name: "Quantum Coffee", price: 15.99, image: "/placeholder.svg" },
    { id: 2, name: "Nano-Nutrient Bar", price: 7.99, image: "/placeholder.svg" },
  ]

  const handleVoiceAssistant = () => {
    setIsListening(!isListening)
    // Here you would typically implement the actual voice recognition logic
    if (!isListening) {
      alert("AR Voice Assistant is now listening. (This is a placeholder for actual voice recognition)")
    } else {
      alert("AR Voice Assistant has stopped listening.")
    }
  }

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <nav className="flex flex-col space-y-2">
            <button
              className={`text-left p-2 rounded ${activeTab === "profile" ? "bg-blue-600" : "hover:bg-gray-700"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`text-left p-2 rounded ${activeTab === "coupons" ? "bg-blue-600" : "hover:bg-gray-700"}`}
              onClick={() => setActiveTab("coupons")}
            >
              Coupons & Discounts
            </button>
            <button
              className={`text-left p-2 rounded ${activeTab === "orders" ? "bg-blue-600" : "hover:bg-gray-700"}`}
              onClick={() => setActiveTab("orders")}
            >
              Order History
            </button>
            <button
              className={`text-left p-2 rounded ${activeTab === "recommendations" ? "bg-blue-600" : "hover:bg-gray-700"}`}
              onClick={() => setActiveTab("recommendations")}
            >
              Recommendations
            </button>
          </nav>
        </div>
        <div className="w-full md:w-2/3">
          {activeTab === "profile" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <Gift className="text-green-400 mr-2" />
                  <p>
                    Loyalty Points: <span className="font-bold">{loyaltyPoints}</span>
                  </p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">Redeem</button>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Users className="mr-2" /> Referral Program
                </h3>
                <p className="mb-2">Invite friends and earn rewards!</p>
                <input type="text" value="JOHNDOE10" readOnly className="bg-gray-800 p-2 rounded w-full mb-2" />
                <Button
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm w-full"
                  onClick={handleInvitation}
                >
                  Share Referral Code
                </Button>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Mic className="mr-2" /> AR Voice Assistant
                </h3>
                <Button
                  className={`${isListening ? "bg-red-600" : "bg-blue-600"} text-white px-4 py-2 rounded-full text-sm w-full`}
                  onClick={handleVoiceAssistant}
                >
                  {isListening ? "Stop Listening" : "Start Voice Assistant"}
                </Button>
              </div>
            </div>
          )}
          {activeTab === "coupons" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Coupons</h3>
              <div className="space-y-4">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold">{coupon.code}</p>
                      <p className="text-sm text-gray-400">{coupon.discount}</p>
                      <p className="text-xs text-gray-500">Expires: {coupon.expiryDate}</p>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">Use</button>
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-4">Upcoming AR Exclusive Deals</h3>
              <div className="space-y-4">
                {upcomingDeals.map((deal) => (
                  <div key={deal.id} className="bg-gray-700 p-4 rounded-lg">
                    <p className="font-bold">{deal.name}</p>
                    <p className="text-sm text-blue-400">{deal.discount}</p>
                    <p className="text-xs text-gray-500">Available from: {deal.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "orders" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {user.purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Image
                        src={purchase.image || "/placeholder.svg"}
                        alt={purchase.name}
                        width={50}
                        height={50}
                        className="rounded-md mr-4"
                      />
                      <div>
                        <p className="font-semibold">{purchase.name}</p>
                        <p className="text-sm text-gray-400">{purchase.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${purchase.price.toFixed(2)}</p>
                      <button
                        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs"
                        onClick={() => addToCart(purchase)}
                      >
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full text-sm w-full"
                onClick={() => setActiveView("cart")}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
          {activeTab === "recommendations" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Recommended for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((product) => (
                  <div key={product.id} className="bg-gray-700 p-4 rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-md mb-2"
                    />
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-blue-400 font-bold">${product.price.toFixed(2)}</p>
                    <button
                      className="mt-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm w-full"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <Zap className="mr-2 text-yellow-400" /> AR Shopping Assistant
                </h4>
                <p className="mb-2">Get personalized product recommendations in AR!</p>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm w-full">
                  Launch AR Assistant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

