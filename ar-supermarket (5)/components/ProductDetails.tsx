import { motion } from 'framer-motion'
import { ViewIcon as View360, CuboidIcon as Cube } from 'lucide-react'

export default function ProductDetails({ product, addToCart }) {
  if (!product) return null

  return (
    <motion.div 
      className="bg-gray-800 rounded-lg p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <div className="relative h-48 mb-4 bg-gray-700 rounded-lg flex items-center justify-center">
        <Cube size={64} className="text-blue-400" />
        <motion.button 
          className="absolute top-2 right-2 bg-blue-600 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <View360 size={24} />
        </motion.button>
      </div>
      <p className="text-2xl font-bold text-blue-400 mb-4">${product.price.toFixed(2)}</p>
      <motion.button 
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full text-lg mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </motion.button>
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Product Details:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Futuristic design</li>
          <li>AR-enhanced packaging</li>
          <li>Smart nutritional tracking</li>
        </ul>
      </div>
    </motion.div>
  )
}

