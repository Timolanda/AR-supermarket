"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function AdminPage({ setProducts, setCoupons, setUpcomingDeals }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [products, setLocalProducts] = useState([
    {
      id: 1,
      name: "Futuristic Cereal",
      price: 9.99,
      inStock: true,
      quantity: 50,
      image: "/placeholder.svg",
      model: "/models/cereal.glb",
    },
    {
      id: 2,
      name: "Holo-Milk",
      price: 5.99,
      inStock: true,
      quantity: 100,
      image: "/placeholder.svg",
      model: "/models/milk.glb",
    },
    {
      id: 3,
      name: "Quantum Coffee",
      price: 15.99,
      inStock: false,
      quantity: 0,
      image: "/placeholder.svg",
      model: "/models/coffee.glb",
    },
  ])
  const [localCoupons, setLocalCoupons] = useState([
    { id: 1, code: "SUMMER10", discount: "10% off", expiryDate: "2023-07-31" },
    { id: 2, code: "ARSPECIAL", discount: "15% off AR products", expiryDate: "2023-08-15" },
  ])
  const [localUpcomingDeals, setLocalUpcomingDeals] = useState([
    { id: 1, name: "AR Exclusive: Virtual Pantry Tour", discount: "20% off", date: "2023-07-10" },
    { id: 2, name: "Holographic Recipe Bundle", discount: "25% off", date: "2023-07-15" },
  ])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid password")
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newProduct = {
      id: products.length + 1,
      name: formData.get("name"),
      price: Number.parseFloat(formData.get("price")),
      inStock: formData.get("inStock") === "on",
      quantity: Number.parseInt(formData.get("quantity")),
      image: "/placeholder.svg", // Replace with actual image upload
      model: "/placeholder.glb", // Replace with actual model upload
    }
    const updatedProducts = [...products, newProduct]
    setLocalProducts(updatedProducts)
    setProducts(updatedProducts) // Update global products state
    e.target.reset()
  }

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id)
    setLocalProducts(updatedProducts)
    setProducts(updatedProducts) // Update global products state
  }

  const handleRestockProduct = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, inStock: true, quantity: 50 } : product,
    )
    setLocalProducts(updatedProducts)
    setProducts(updatedProducts) // Update global products state
  }

  const handleAddCoupon = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newCoupon = {
      id: localCoupons.length + 1,
      code: formData.get("code"),
      discount: formData.get("discount"),
      expiryDate: formData.get("expiryDate"),
    }
    const updatedCoupons = [...localCoupons, newCoupon]
    setLocalCoupons(updatedCoupons)
    setCoupons(updatedCoupons) // Update global coupons state
    e.target.reset()
  }

  const handleDeleteCoupon = (id) => {
    const updatedCoupons = localCoupons.filter((coupon) => coupon.id !== id)
    setLocalCoupons(updatedCoupons)
    setCoupons(updatedCoupons) // Update global coupons state
  }

  const handleAddDeal = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newDeal = {
      id: localUpcomingDeals.length + 1,
      name: formData.get("name"),
      discount: formData.get("discount"),
      date: formData.get("date"),
    }
    const updatedDeals = [...localUpcomingDeals, newDeal]
    setLocalUpcomingDeals(updatedDeals)
    setUpcomingDeals(updatedDeals) // Update global upcoming deals state
    e.target.reset()
  }

  const handleDeleteDeal = (id) => {
    const updatedDeals = localUpcomingDeals.filter((deal) => deal.id !== id)
    setLocalUpcomingDeals(updatedDeals)
    setUpcomingDeals(updatedDeals) // Update global upcoming deals state
  }

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      if (type === "image" && file.size <= 5 * 1024 * 1024) {
        // 5MB limit for images
        console.log("Image uploaded:", file.name)
      } else if (type === "model" && file.size <= 20 * 1024 * 1024) {
        // 20MB limit for 3D models
        console.log("3D model uploaded:", file.name)
      } else {
        alert(`File too large. ${type === "image" ? "5MB" : "20MB"} maximum.`)
        e.target.value = ""
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Product Management */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Add New Product</h3>
        <form onSubmit={handleAddProduct} className="space-y-2">
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity in Stock"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <div className="flex items-center">
            <input name="inStock" type="checkbox" id="inStock" className="mr-2" />
            <label htmlFor="inStock" className="text-white">
              In Stock
            </label>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm">Product Image (max 5MB)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              className="text-sm text-gray-400"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm">3D Model (.obj or .fbx, max 20MB)</label>
            <input
              type="file"
              accept=".obj,.fbx"
              onChange={(e) => handleFileUpload(e, "model")}
              className="text-sm text-gray-400"
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
            Add Product
          </button>
        </form>
      </div>

      {/* Coupon Management */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Add New Coupon</h3>
        <form onSubmit={handleAddCoupon} className="space-y-2">
          <input
            name="code"
            type="text"
            placeholder="Coupon Code"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            name="discount"
            type="text"
            placeholder="Discount (e.g., 10% off)"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input name="expiryDate" type="date" className="w-full p-2 rounded bg-gray-700 text-white" required />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
            Add Coupon
          </button>
        </form>
      </div>

      {/* Upcoming Deals Management */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Add Upcoming Deal</h3>
        <form onSubmit={handleAddDeal} className="space-y-2">
          <input
            name="name"
            type="text"
            placeholder="Deal Name"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            name="discount"
            type="text"
            placeholder="Discount (e.g., 20% off)"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input name="date" type="date" className="w-full p-2 rounded bg-gray-700 text-white" required />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
            Add Deal
          </button>
        </form>
      </div>

      {/* Product Inventory */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Product Inventory</h3>
        <div className="space-y-2">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div>
                <h4 className="font-semibold">{product.name}</h4>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p className={product.inStock ? "text-green-500" : "text-red-500"}>
                  {product.inStock ? `${product.quantity} in Stock` : "Out of Stock"}
                </p>
              </div>
              <div>
                {!product.inStock && (
                  <button
                    onClick={() => handleRestockProduct(product.id)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Restock
                  </button>
                )}
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coupon List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Active Coupons</h3>
        <div className="space-y-2">
          {localCoupons.map((coupon) => (
            <motion.div
              key={coupon.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div>
                <h4 className="font-semibold">{coupon.code}</h4>
                <p>{coupon.discount}</p>
                <p>Expires: {coupon.expiryDate}</p>
              </div>
              <button onClick={() => handleDeleteCoupon(coupon.id)} className="bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Deals List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Upcoming Deals</h3>
        <div className="space-y-2">
          {localUpcomingDeals.map((deal) => (
            <motion.div
              key={deal.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div>
                <h4 className="font-semibold">{deal.name}</h4>
                <p>{deal.discount}</p>
                <p>Date: {deal.date}</p>
              </div>
              <button onClick={() => handleDeleteDeal(deal.id)} className="bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

