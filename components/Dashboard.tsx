"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "./Navbar"
import ARView from "./ARView"
import ProductDetails from "./ProductDetails"
import ShoppingCart from "./ShoppingCart"
import UserProfile from "./UserProfile"
import AdminPage from "./AdminPage"
import NeonMatcher from "./game/NeonMatcher"
import ThreeDBackground from "./ThreeDBackground"
import SignUp from "./SignUp"
import SignIn from "./SignIn"

export default function Dashboard() {
  const [activeView, setActiveView] = useState("landing")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [coupons, setCoupons] = useState([])
  const [upcomingDeals, setUpcomingDeals] = useState([])
  const [isSignedIn, setIsSignedIn] = useState(false)

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product])
  }

  const onGameComplete = (points) => {
    setLoyaltyPoints((prevPoints) => prevPoints + points)
  }

  const handleInvitation = () => {
    setLoyaltyPoints((prevPoints) => prevPoints + 50)
    alert("Invitation sent! You've earned 50 loyalty points.")
  }

  const handleSignIn = () => {
    setIsSignedIn(true)
    setActiveView("shop")
  }

  const handleSignUp = () => {
    setIsSignedIn(true)
    setActiveView("shop")
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    setActiveView("landing")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeView={activeView} setActiveView={setActiveView} isSignedIn={isSignedIn} onSignOut={handleSignOut} />
      <ThreeDBackground />
      <div className="container mx-auto p-4 relative z-10 pt-20">
        {activeView === "landing" && (
          <div className="text-center mt-20">
            <h1 className="text-4xl font-bold mb-6">Welcome to AR Supermarket</h1>
            {isSignedIn ? (
              <Button onClick={() => setActiveView("shop")} className="mb-6">
                Start Shopping
              </Button>
            ) : (
              <div className="space-x-4">
                <Button onClick={() => setActiveView("signin")} className="mb-6">
                  Sign In
                </Button>
                <Button onClick={() => setActiveView("signup")} className="mb-6">
                  Sign Up
                </Button>
              </div>
            )}
            <NeonMatcher onGameComplete={onGameComplete} initialLoyaltyPoints={loyaltyPoints} />
            <Button onClick={handleInvitation} className="mt-4">
              Send Invitation (Earn 50 Points)
            </Button>
          </div>
        )}
        {activeView === "signup" && <SignUp onSignUp={handleSignUp} onSignIn={() => setActiveView("signin")} />}
        {activeView === "signin" && <SignIn onSignIn={handleSignIn} onSignUp={() => setActiveView("signup")} />}
        {activeView === "shop" && <ARView products={[]} onProductSelect={setSelectedProduct} />}
        {activeView === "ar" && <ARView products={[]} onProductSelect={setSelectedProduct} />}
        {activeView === "product" && selectedProduct && (
          <ProductDetails product={selectedProduct} addToCart={addToCart} />
        )}
        {activeView === "cart" && (
          <ShoppingCart
            items={cartItems}
            setItems={setCartItems}
            loyaltyPoints={loyaltyPoints}
            setLoyaltyPoints={setLoyaltyPoints}
          />
        )}
        {activeView === "profile" && (
          <UserProfile
            addToCart={addToCart}
            setActiveView={setActiveView}
            coupons={coupons}
            upcomingDeals={upcomingDeals}
            loyaltyPoints={loyaltyPoints}
            handleInvitation={handleInvitation}
          />
        )}
        {activeView === "admin" && (
          <AdminPage setProducts={() => {}} setCoupons={setCoupons} setUpcomingDeals={setUpcomingDeals} />
        )}
        {activeView === "game" && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold mb-6">Neon Matcher Game</h2>
            <NeonMatcher onGameComplete={onGameComplete} initialLoyaltyPoints={loyaltyPoints} />
          </div>
        )}
      </div>
    </div>
  )
}

