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

    // Dimensions
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Scene, camera, renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000)
    camera.position.set(0, 0, 100)
    camera.up.set(0, 1, 0) // Ensure Y is "up"

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(backgroundColor)
    containerRef.current.appendChild(renderer.domElement)

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableRotate = true
    controls.rotateSpeed = 1.0
    controls.enableZoom = true
    controls.zoomSpeed = 1.2
    controls.enablePan = true
    controls.panSpeed = 0.8
    controls.enableDamping = true
    controls.dampingFactor = 0.2

    // IMPORTANT: Don’t lock polar angles to the same value. 
    // Let them default or set them to something broad:
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight1.position.set(10, 10, 10)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    dirLight2.position.set(-10, -5, -10)
    scene.add(dirLight2)

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5)
    scene.add(hemiLight)

    // Load STL
    const loader = new STLLoader()
    loader.load(
      modelUrl,
      (geometry: THREE.BufferGeometry) => {
        // Mesh
        const material = new THREE.MeshPhongMaterial({
          color: 0x6ca6cd,
          specular: 0x111111,
          shininess: 200,
        })
        const mesh = new THREE.Mesh(geometry, material)

        // Center model
        geometry.computeBoundingBox()
        if (geometry.boundingBox) {
          const center = new THREE.Vector3()
          geometry.boundingBox.getCenter(center)
          mesh.position.set(-center.x, -center.y, -center.z)

          // Fit camera to bounding box
          const size = new THREE.Vector3()
          geometry.boundingBox.getSize(size)
          const maxDim = Math.max(size.x, size.y, size.z)
          const fov = camera.fov * (Math.PI / 180)
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
          cameraZ *= 1.5
          camera.position.set(0, 0, cameraZ)

          controls.target.set(0, 0, 0)
          controls.update()
        }

        scene.add(mesh)

        // Optional edges
        const edgesGeometry = new THREE.EdgesGeometry(geometry, 15)
        const edgesMaterial = new THREE.LineBasicMaterial({
          color: 0x000000,
          linewidth: 1,
          opacity: 0.5,
          transparent: true,
        })
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)
        edges.position.copy(mesh.position)
        scene.add(edges)
      },
      undefined,
      (error) => {
        console.error("Error loading STL:", error)
      }
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener("resize", handleResize)

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
