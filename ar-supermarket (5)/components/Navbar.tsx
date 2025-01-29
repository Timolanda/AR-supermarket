"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, User, CuboidIcon as Cube, Search, Settings, Menu, Zap } from "lucide-react"

export default function Navbar({ activeView, setActiveView, isWalletConnected }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const navItems = [
    { icon: <Cube />, label: "AR View", view: "ar" },
    { icon: <ShoppingCart />, label: "Cart", view: "cart" },
    { icon: <User />, label: "Profile", view: "profile" },
    { icon: <Settings />, label: "Admin", view: "admin" },
    { icon: <Zap />, label: "Play & Earn", view: "play" },
  ]

  const handleNavigation = (view) => {
    setActiveView(view)
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-white cursor-pointer" onClick={() => handleNavigation("landing")}>
              AR Supermarket
            </span>
          </div>
          {isMobile ? (
            <div className="flex items-center">
              <button
                className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <NavButton
                  key={item.view}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeView === item.view}
                  onClick={() => handleNavigation(item.view)}
                />
              ))}
              <motion.button
                className="p-2 rounded-full bg-blue-600 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="bg-gray-800 p-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <button
                key={item.view}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                  activeView === item.view
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => handleNavigation(item.view)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button
              className="flex items-center space-x-2 w-full p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
              <span>Search</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="bg-gray-800 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavButton({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
        isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

