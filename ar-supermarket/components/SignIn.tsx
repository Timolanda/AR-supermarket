"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"

export default function SignIn({ onSignIn, onSignUp }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the sign-in data to your backend
    console.log("Signing in with:", email, password)
    onSignIn()
  }

  const handleGoogleSignIn = () => {
    // Implement Google Sign In logic here
    console.log("Signing in with Google")
    onSignIn()
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 bg-gray-700 text-white"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Sign In
        </Button>
      </form>
      <div className="mt-4">
        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
          <FcGoogle className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </div>
      <p className="mt-4 text-center text-gray-400">
        Don't have an account?{" "}
        <button onClick={onSignUp} className="text-blue-400 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  )
}

