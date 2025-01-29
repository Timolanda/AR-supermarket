"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Image from "next/image"

export default function ARView({ products, onProductSelect }) {
  const [arEnabled, setArEnabled] = useState(false)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    const loader = new GLTFLoader()

    products.forEach((product, index) => {
      loader.load(
        product.model,
        (gltf) => {
          const model = gltf.scene
          model.position.set(index * 2 - 2, 0, -5)
          model.scale.set(0.5, 0.5, 0.5)
          scene.add(model)
        },
        undefined,
        (error) => {
          console.error(`Error loading model for ${product.name}:`, error)
          setError(`Failed to load 3D model for ${product.name}`)
        },
      )
    })

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 10, 10)
    scene.add(light)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (containerRef.current) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    const timer = setTimeout(() => setArEnabled(true), 2000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [products])

  return (
    <div className="w-full">
      <div className="bg-gray-900 rounded-lg p-4 mb-4 text-center">
        <a
          href="https://adobeaero.app.link/bOej1QXlWzb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Launch Full AR Experience
        </a>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 h-64 relative overflow-hidden" ref={containerRef}>
        {!arEnabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 border-t-4 border-blue-500 rounded-full"
            />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-red-600 text-white p-4 rounded-lg">
              <p>{error}</p>
              <button className="mt-2 bg-white text-red-600 px-4 py-2 rounded" onClick={() => setError(null)}>
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onProductSelect(product)}
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-blue-400 font-bold">${product.price.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

