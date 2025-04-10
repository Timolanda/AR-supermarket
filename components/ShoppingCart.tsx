"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { connect } from "@argent/get-starknet"

export default function ShoppingCart({
  items,
  setItems,
  loyaltyPoints,
  setLoyaltyPoints,
  isWalletConnected,
  setIsWalletConnected,
}) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [usePoints, setUsePoints] = useState(false)
  const [pointsToUse, setPointsToUse] = useState(0)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const maxPointsToUse = Math.min(loyaltyPoints, total * 100) // Assuming 1 point = $0.01

  const handleQuantityChange = (id, newQuantity) => {
    setItems(
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method")
      return
    }

    if (paymentMethod === "Wallet" && !isWalletConnected) {
      try {
        const starknet = await connect()
        if (starknet && starknet.isConnected) {
          setIsWalletConnected(true)
        }
      } catch (error) {
        console.error("Error connecting wallet:", error)
        alert("Failed to connect wallet. Please try again.")
        return
      }
    }

    // Calculate final total after applying loyalty points
    const finalTotal = total - pointsToUse / 100

    // Implement checkout logic here
    console.log(`Checking out with ${paymentMethod}`)
    console.log(`Total: $${finalTotal.toFixed(2)}`)
    console.log(`Loyalty points used: ${pointsToUse}`)

    // Update loyalty points
    setLoyaltyPoints((prevPoints) => prevPoints - pointsToUse)

    // Clear cart after successful checkout
    setItems([])
    setPointsToUse(0)
    setUsePoints(false)
  }

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 h-full overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center mb-4 bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">
                  Quantity:
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="mx-2">
                    -
                  </button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="mx-2">
                    +
                  </button>
                </p>
              </div>
              <p className="text-blue-400 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </motion.div>
          ))}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl text-blue-400 font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Use Loyalty Points</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => setUsePoints(e.target.checked)}
                  className="form-checkbox"
                />
                <label>Use points (Available: {loyaltyPoints})</label>
              </div>
              {usePoints && (
                <input
                  type="number"
                  value={pointsToUse}
                  onChange={(e) => setPointsToUse(Math.min(maxPointsToUse, Number.parseInt(e.target.value) || 0))}
                  max={maxPointsToUse}
                  className="mt-2 w-full p-2 rounded bg-gray-700 text-white"
                />
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
              <div className="space-y-2">
                {["M-Pesa", "Crypto", "Credit Card", "Visa", "Wallet"].map((method) => (
                  <label key={method} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>
            <motion.button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
            >
              Checkout (${(total - pointsToUse / 100).toFixed(2)})
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  )
}

