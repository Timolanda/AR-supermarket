'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ARView from './ARView'
import ProductDetails from './ProductDetails'
import ShoppingCart from './ShoppingCart'
import UserProfile from './UserProfile'
import Navbar from './Navbar'
import VoiceAssistant from './VoiceAssistant'
import ARControls from './ARControls'
import AdminPage from './AdminPage'

export default function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeView, setActiveView] = useState('landing')
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [coupons, setCoupons] = useState([])
  const [upcomingDeals, setUpcomingDeals] = useState([])
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      // Replace these with actual API calls in a real application
      const productsResponse = await fetch('/api/products')
      const productsData = await productsResponse.json()
      setProducts(productsData)

      const couponsResponse = await fetch('/api/coupons')
      const couponsData = await couponsResponse.json()
      setCoupons(couponsData)

      const dealsResponse = await fetch('/api/upcoming-deals')
      const dealsData = await dealsResponse.json()
      setUpcomingDeals(dealsData)
    }
    fetchInitialData()
  }, [])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleConnectWallet = async () => {
    // Implement wallet connection logic here
    // For example, using Web3 or a similar library
    try {
      // Simulating a wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsWalletConnected(true)
      alert('Wallet connected successfully!')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    }
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'landing':
        return (
          <div className="text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to AR Supermarket</h1>
            <p className="text-xl mb-8">Experience shopping in augmented reality!</p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-8"
              onClick={() => setActiveView('ar')}
            >
              Start Shopping
            </button>
            {!isWalletConnected && (
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-8 ml-4"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-gray-800 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-blue-400 font-bold mb-2">${product.price.toFixed(2)}</p>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-full"
                    onClick={() => {
                      setSelectedProduct(product)
                      setActiveView('product')
                    }}
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )
      case 'ar':
        return <ARView products={products} onProductSelect={(product) => { setSelectedProduct(product); setActiveView('product'); }} />
      case 'cart':
        return <ShoppingCart items={cartItems} setItems={setCartItems} />
      case 'product':
        return <ProductDetails product={selectedProduct} addToCart={addToCart} goBack={() => setActiveView('ar')} />
      case 'admin':
        return <AdminPage setProducts={setProducts} setCoupons={setCoupons} setUpcomingDeals={setUpcomingDeals} />
      case 'profile':
        return <UserProfile 
          coupons={coupons} 
          upcomingDeals={upcomingDeals} 
          addToCart={addToCart}
          setActiveView={setActiveView}
        />
      default:
        return null
    }
  }

  return (
    <div className="relative w-full min-h-screen p-4 overflow-hidden text-white">
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

