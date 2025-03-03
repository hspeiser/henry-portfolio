"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"

interface STLModelViewerProps {
  modelUrl: string
  backgroundColor?: string
}

export default function STLModelViewer({ modelUrl, backgroundColor = "#ffffff" }: STLModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Get initial container dimensions
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Create scene, camera, and renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 5000)
    camera.position.set(0, 0, 100)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(backgroundColor)
    containerRef.current.appendChild(renderer.domElement)

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(10, 10, 10)
    scene.add(dirLight)

    // Load STL
    const loader = new STLLoader()
    loader.load(
      modelUrl,
      (geometry: THREE.BufferGeometry) => {
        const material = new THREE.MeshStandardMaterial({ color: 0x6CA6CD })
        const mesh = new THREE.Mesh(geometry, material)
    
        // Compute bounding box to center the model
        geometry.computeBoundingBox()
        if (geometry.boundingBox) {
          const centerX = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2
          const centerY = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2
          const centerZ = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2
          mesh.position.set(-centerX, -centerY, -centerZ)
        }
    
        scene.add(mesh)
      },
      undefined, // No progress callback
      (error: Error | ErrorEvent) => {
        console.error("Error loading STL:", error)
      }
    )
    
    

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize to maintain aspect ratio
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [modelUrl, backgroundColor])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "600px",
        position: "relative"
      }}
    />
  )
}