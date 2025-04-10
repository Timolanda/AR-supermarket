"use client"

import { useState, useEffect } from "react"
import type { Contract } from "starknet"
import { Button } from "@/components/ui/button"

interface Product {
  name: string
  price: string
  quantity: number
}

interface ProductListProps {
  contract: Contract | null
  account: any
}

export default function ProductList({ contract, account }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (contract && account) {
      fetchProducts()
    }
  }, [contract, account])

  const fetchProducts = async () => {
    if (!contract) return
    try {
      const productCount = 5 // Assume we have 5 products for this example
      const fetchedProducts = []
      for (let i = 0; i < productCount; i++) {
        const result = await contract.call("get_product", [i])
        fetchedProducts.push({
          name: result.product.name,
          price: result.product.price.low.toString(),
          quantity: result.product.quantity.toNumber(),
        })
      }
      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handlePurchase = async (productId: number, quantity: number) => {
    if (!contract || !account) return
    try {
      await contract.invoke("purchase_product", [productId, quantity])
      fetchProducts() // Refresh product list after purchase
    } catch (error) {
      console.error("Error purchasing product:", error)
    }
  }

  return (
    <div>
      {products.map((product, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>Price: {product.price} ETH</p>
          <p>Quantity: {product.quantity}</p>
          <Button onClick={() => handlePurchase(index, 1)} disabled={!account || product.quantity === 0}>
            Purchase
          </Button>
        </div>
      ))}
    </div>
  )
}

