import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Share2 } from "lucide-react"

interface ReferralModalProps {
  isOpen: boolean
  onClose: () => void
  referralCode: string
}

export default function ReferralModal({ isOpen, onClose, referralCode }: ReferralModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferral = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join AR Supermarket",
          text: `Use my referral code ${referralCode} to sign up for AR Supermarket and get a special bonus!`,
          url: "https://arsupermarket.com",
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      alert("Web Share API not supported in your browser")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative"
          >
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">Share Your Referral Code</h3>
            <p className="text-gray-300 mb-4">Share this code with your friends and earn rewards when they sign up!</p>
            <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between mb-4">
              <span className="text-xl font-mono text-white">{referralCode}</span>
              <button onClick={copyToClipboard} className="text-blue-400 hover:text-blue-300 transition-colors">
                {copied ? "Copied!" : <Copy size={20} />}
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={shareReferral}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
              >
                <Share2 size={20} className="mr-2" />
                Share Referral Link
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

