'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    const icosahedron = new THREE.Mesh(geometry, material)
    scene.add(icosahedron)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      icosahedron.rotation.x += 0.005
      icosahedron.rotation.y += 0.005
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 bg-gradient-to-r from-black via-blue-900 to-purple-900" />
}

