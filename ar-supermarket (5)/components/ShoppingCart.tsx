'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ShoppingCart({ items, setItems }) {
  const [paymentMethod, setPaymentMethod] = useState('')

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleQuantityChange = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0))
  }

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }
    // Implement checkout logic here
    console.log(`Checking out with ${paymentMethod}`)
    // Clear cart after successful checkout
    setItems([])
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
          {items.map(item => (
            <motion.div 
              key={item.id} 
              className="flex items-center mb-4 bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={item.image || '/placeholder.svg'} alt={item.name} width={50} height={50} className="rounded-md mr-4" />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">
                  Quantity: 
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="mx-2">-</button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="mx-2">+</button>
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
              <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
              <div className="space-y-2">
                {['M-Pesa', 'Crypto', 'Credit Card', 'Visa'].map(method => (
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
                  </label>))}
              </div>
            </div>
            <motion.button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
            >
              Checkout
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  )
}

