"use client"

import { useState } from "react"
import type { Contract } from "starknet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AdminInventoryProps {
  contract: Contract | null
  account: any
}

export default function AdminInventory({ contract, account }: AdminInventoryProps) {
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productQuantity, setProductQuantity] = useState("")

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contract || !account) return

    try {
      const productId = Math.floor(Math.random() * 1000000) // Generate a random product ID
      await contract.invoke("add_product", [
        productId,
        productName,
        { low: productPrice, high: 0 }, // Assuming price is in wei
        productQuantity,
      ])

      // Clear form after successful addition
      setProductName("")
      setProductPrice("")
      setProductQuantity("")

      alert("Product added successfully!")
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Failed to add product. Check console for details.")
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin: Add New Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <Input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Price (in wei)"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          required
        />
        <Button type="submit" disabled={!account}>
          Add Product
        </Button>
      </form>
    </div>
  )
}

