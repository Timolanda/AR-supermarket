'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HandIcon as Gesture, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

export default function ARControls() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div 
      className="absolute bottom-4 left-4 bg-black bg-opacity-50 backdrop-blur-md rounded-full p-2"
      whileHover={{ scale: 1.05 }}
    >
      <motion.button
        className="p-2 rounded-full bg-blue-600 text-white"
        onClick={() => setIsExpanded(!isExpanded)}
        whileTap={{ scale: 0.95 }}
      >
        <Gesture size={24} />
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute left-full ml-2 flex space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ARControlButton icon={<ZoomIn size={24} />} onClick={() => console.log('Zoom In')} />
            <ARControlButton icon={<ZoomOut size={24} />} onClick={() => console.log('Zoom Out')} />
            <ARControlButton icon={<RotateCcw size={24} />} onClick={() => console.log('Rotate')} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ARControlButton({ icon, onClick }) {
  return (
    <motion.button
      className="p-2 rounded-full bg-gray-800 text-white"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.button>
  )
}

