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
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000)
    camera.position.set(0, 0, 100)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(backgroundColor)
    containerRef.current.appendChild(renderer.domElement)

    // Setup orbit controls with full rotation capability
    const controls = new OrbitControls(camera, renderer.domElement)
    
    // Enable all rotations and improve responsiveness
    controls.enableRotate = true
    controls.rotateSpeed = 1.0
    controls.enableZoom = true
    controls.zoomSpeed = 1.2
    controls.enablePan = true
    controls.panSpeed = 0.8
    controls.enableDamping = true
    controls.dampingFactor = 0.2
    
    // Allow rotation in all directions
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI
    
    // Set initial rotation target to origin
    controls.target.set(0, 0, 0)
    controls.update()

    // Improved lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight1.position.set(10, 10, 10)
    scene.add(dirLight1)
    
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    dirLight2.position.set(-10, -5, -10)
    scene.add(dirLight2)

    // Add subtle hemisphere light for better shading
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5)
    scene.add(hemiLight)

    // Load STL with centering and scaling
    const loader = new STLLoader()
    loader.load(
      modelUrl,
      (geometry: THREE.BufferGeometry) => {
        // Create the main mesh with improved material
        const material = new THREE.MeshPhongMaterial({ 
          color: 0x6CA6CD,
          specular: 0x111111,
          shininess: 200
        })
        const mesh = new THREE.Mesh(geometry, material)
    
        // Center the model based on its bounding box
        geometry.computeBoundingBox()
        if (geometry.boundingBox) {
          const center = new THREE.Vector3()
          geometry.boundingBox.getCenter(center)
          mesh.position.set(-center.x, -center.y, -center.z)
          
          // Update the controls target to the center of the model
          controls.target.copy(new THREE.Vector3(0, 0, 0))
          
          // Calculate appropriate camera distance based on model size
          const size = new THREE.Vector3()
          geometry.boundingBox.getSize(size)
          const maxDim = Math.max(size.x, size.y, size.z)
          const fov = camera.fov * (Math.PI / 180)
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
          cameraZ *= 1.5 // Add some margin
          
          // Position camera
          camera.position.set(0, 0, cameraZ)
          controls.update()
        }
        
        // Add the main mesh to the scene
        scene.add(mesh)
        
        // Create edges for better visibility
        const edgesGeometry = new THREE.EdgesGeometry(geometry, 15) // 15 degree threshold
        const edgesMaterial = new THREE.LineBasicMaterial({ 
          color: 0x000000, 
          linewidth: 1,
          opacity: 0.5,
          transparent: true
        })
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)
        
        // Position edges to match the main mesh
        edges.position.copy(mesh.position)
        
        // Add edges to the scene
        scene.add(edges)
      },
      undefined, // No progress callback
      (error: Error | ErrorEvent) => {
        console.error("Error loading STL:", error)
      }
    )

    // Render loop with controls update
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update() // Important for smooth damping
      renderer.render(scene, camera)
    }
    animate()

    // Better resize handling
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
      controls.dispose()
      scene.clear()
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