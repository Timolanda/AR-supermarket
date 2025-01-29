"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ARView from "./ARView"
import ProductDetails from "./ProductDetails"
import ShoppingCart from "./ShoppingCart"
import UserProfile from "./UserProfile"
import Navbar from "./Navbar"
import VoiceAssistant from "./VoiceAssistant"
import ARControls from "./ARControls"
import AdminPage from "./AdminPage"
import NeonMatcher from "./game/NeonMatcher"
import Image from "next/image"
import ThreeDBackground from "./ThreeDBackground"

export default function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeView, setActiveView] = useState("landing")
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [coupons, setCoupons] = useState([])
  const [upcomingDeals, setUpcomingDeals] = useState([])
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      // Replace these with actual API calls in a real application
      const productsResponse = await fetch("/api/products")
      const productsData = await productsResponse.json()
      setProducts(productsData)

      const couponsResponse = await fetch("/api/coupons")
      const couponsData = await couponsResponse.json()
      setCoupons(couponsData)

      const dealsResponse = await fetch("/api/upcoming-deals")
      const dealsData = await dealsResponse.json()
      setUpcomingDeals(dealsData)
    }
    fetchInitialData()
  }, [])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleConnectWallet = async () => {
    try {
      // Simulating a wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsWalletConnected(true)
      alert("Wallet connected successfully!")
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    }
  }

  const handleGameComplete = (points) => {
    setLoyaltyPoints(points)
    setActiveView("landing")
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "landing":
        return (
          <div className="text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to AR Supermarket</h1>
            <p className="text-xl mb-8">Experience shopping in augmented reality!</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
                onClick={() => setActiveView("ar")}
              >
                Start Shopping
              </button>
              {!isWalletConnected && (
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button>
              )}
              <button
                className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
                onClick={() => setActiveView("play")}
              >
                Play & Earn Points
              </button>
            </div>
            {loyaltyPoints > 0 && (
              <div className="mb-8 p-4 bg-purple-600 text-white rounded-lg">
                <p className="text-lg">🎉 Your current loyalty points: {loyaltyPoints}</p>
              </div>
            )}
            {showGame ? (
              <NeonMatcher onGameComplete={handleGameComplete} initialLoyaltyPoints={loyaltyPoints} />
            ) : (
              <>
                <ARView
                  products={products}
                  onProductSelect={(product) => {
                    setSelectedProduct(product)
                    setActiveView("product")
                  }}
                />
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.slice(0, 6).map((product) => (
                      <motion.div
                        key={product.id}
                        className="bg-gray-800 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-48 object-cover mb-4 rounded"
                        />
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-blue-400 font-bold mb-2">${product.price.toFixed(2)}</p>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-full w-full"
                          onClick={() => {
                            setSelectedProduct(product)
                            setActiveView("product")
                          }}
                        >
                          View Details
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Current Coupons</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coupons.map((coupon) => (
                      <motion.div
                        key={coupon.id}
                        className="bg-gray-800 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold mb-2">{coupon.code}</h3>
                        <p className="text-green-400 mb-2">{coupon.discount}</p>
                        <p className="text-sm text-gray-400">Expires: {coupon.expiryDate}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Upcoming Deals</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingDeals.map((deal) => (
                      <motion.div
                        key={deal.id}
                        className="bg-gray-800 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold mb-2">{deal.name}</h3>
                        <p className="text-yellow-400 mb-2">{deal.discount}</p>
                        <p className="text-sm text-gray-400">Available from: {deal.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )
      case "ar":
        return (
          <ARView
            products={products}
            onProductSelect={(product) => {
              setSelectedProduct(product)
              setActiveView("product")
            }}
          />
        )
      case "cart":
        return <ShoppingCart items={cartItems} setItems={setCartItems} />
      case "product":
        return <ProductDetails product={selectedProduct} addToCart={addToCart} goBack={() => setActiveView("ar")} />
      case "admin":
        return <AdminPage setProducts={setProducts} setCoupons={setCoupons} setUpcomingDeals={setUpcomingDeals} />
      case "profile":
        return (
          <UserProfile
            coupons={coupons}
            upcomingDeals={upcomingDeals}
            addToCart={addToCart}
            setActiveView={setActiveView}
            loyaltyPoints={loyaltyPoints}
          />
        )
      case "play":
        return <NeonMatcher onGameComplete={handleGameComplete} initialLoyaltyPoints={loyaltyPoints} />
      default:
        return null
    }
  }

  return (
    <div className="relative w-full min-h-screen p-4 overflow-hidden text-white">
      <ThreeDBackground />
      <Navbar activeView={activeView} setActiveView={setActiveView} isWalletConnected={isWalletConnected} />
      <div className="mt-16 container mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </div>
      <VoiceAssistant />
    </div>
  )
}

