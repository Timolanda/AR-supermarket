'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, X } from 'lucide-react'

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
      // Stop listening logic here
    } else {
      setIsListening(true)
      // Start listening logic here
      setTimeout(() => {
        setTranscript('How can I assist you with your shopping today?')
      }, 1000)
    }
  }

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.button
        className={`p-4 rounded-full ${isListening ? 'bg-red-600' : 'bg-blue-600'} text-white shadow-lg`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
      >
        <Mic size={24} />
      </motion.button>
      <AnimatePresence>
        {isListening && (
          <motion.div
            className="absolute bottom-full right-0 mb-4 p-4 bg-gray-800 rounded-lg shadow-lg w-64"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setIsListening(false)}
            >
              <X size={16} />
            </button>
            <p className="text-sm text-white">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

