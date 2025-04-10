"use client"

import { useState, useEffect } from "react"
import type { Contract } from "starknet"

interface LoyaltyPointsProps {
  contract: Contract | null
  account: any
}

export default function LoyaltyPoints({ contract, account }: LoyaltyPointsProps) {
  const [points, setPoints] = useState<number | null>(null)

  useEffect(() => {
    if (contract && account) {
      fetchLoyaltyPoints()
    }
  }, [contract, account])

  const fetchLoyaltyPoints = async () => {
    if (!contract || !account) return
    try {
      const result = await contract.call("get_loyalty_points", [account.address])
      setPoints(result.points.toNumber())
    } catch (error) {
      console.error("Error fetching loyalty points:", error)
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Your Loyalty Points</h3>
      {points !== null ? (
        <p className="text-2xl font-bold">{points} points</p>
      ) : (
        <p>Connect your wallet to view loyalty points</p>
      )}
    </div>
  )
}

