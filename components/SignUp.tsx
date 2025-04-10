"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"

export default function SignUp({ onSignUp, onSignIn }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the sign-up data to your backend
    console.log("Signing up with:", email, password)
    onSignUp()
  }

  const handleGoogleSignUp = () => {
    // Implement Google Sign Up logic here
    console.log("Signing up with Google")
    onSignUp()
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
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
          Sign Up
        </Button>
      </form>
      <div className="mt-4">
        <Button onClick={handleGoogleSignUp} variant="outline" className="w-full">
          <FcGoogle className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>
      </div>
      <p className="mt-4 text-center text-gray-400">
        Already have an account?{" "}
        <button onClick={onSignIn} className="text-blue-400 hover:underline">
          Sign In
        </button>
      </p>
    </div>
  )
}

