"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create a simple shopping cart model
    const cartGroup = new THREE.Group()

    // Cart base
    const baseGeometry = new THREE.BoxGeometry(2, 0.1, 1.5)
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    cartGroup.add(base)

    // Cart sides
    const sideGeometry = new THREE.BoxGeometry(0.1, 1, 1.5)
    const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 })
    const leftSide = new THREE.Mesh(sideGeometry, sideMaterial)
    leftSide.position.set(-0.95, 0.5, 0)
    cartGroup.add(leftSide)

    const rightSide = new THREE.Mesh(sideGeometry, sideMaterial)
    rightSide.position.set(0.95, 0.5, 0)
    cartGroup.add(rightSide)

    // Cart front and back
    const frontBackGeometry = new THREE.BoxGeometry(2, 1, 0.1)
    const frontBackMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 })
    const front = new THREE.Mesh(frontBackGeometry, frontBackMaterial)
    front.position.set(0, 0.5, 0.7)
    cartGroup.add(front)

    const back = new THREE.Mesh(frontBackGeometry, frontBackMaterial)
    back.position.set(0, 0.5, -0.7)
    cartGroup.add(back)

    // Cart handle
    const handleGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 100, Math.PI)
    const handleMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 })
    const handle = new THREE.Mesh(handleGeometry, handleMaterial)
    handle.rotation.x = Math.PI / 2
    handle.position.set(0, 1.25, -0.7)
    cartGroup.add(handle)

    // Add the cart to the scene
    scene.add(cartGroup)

    camera.position.z = 5

    // Render the scene once
    renderer.render(scene, camera)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    }

