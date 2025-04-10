"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

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
    <div className="bg-gray-900 rounded-lg p-4 h-full relative overflow-hidden" ref={containerRef}>
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: arEnabled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2"
      >
        {products.map((product) => (
          <motion.button
            key={product.id}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onProductSelect(product)}
          >
            {product.name}
          </motion.button>
        ))}
      </motion.div>
      <a
        href="https://adobeaero.app.link/bOej1QXlWzb"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold hover:bg-green-700 transition-colors"
      >
        Full AR Experience
      </a>
    </div>
  )
}

