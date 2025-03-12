"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import type { BufferGeometry } from "three"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

type OrbitControls = InstanceType<typeof ThreeOrbitControls>

interface STLModelViewerProps {
  modelUrl: string
  backgroundColor?: string
}

export default function STLModelViewer({ modelUrl, backgroundColor = "#0a0c14" }: STLModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  // OrbitControls reference with the derived type
  const controlsRef = useRef<OrbitControls | null>(null)

  // Reset camera view
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
      controlsRef.current.update()
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ""
    setLoading(true)

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Scene and camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000)
    camera.position.set(0, 0, 100)

    // WebGL renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setClearColor(backgroundColor, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // OrbitControls constructor
    const controls = new ThreeOrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.screenSpacePanning = false
    controls.maxPolarAngle = Math.PI
    controls.target.set(0, 0, 0)
    controlsRef.current = controls

    // Basic lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4)
    backLight.position.set(-1, -1, -1).normalize()
    scene.add(backLight)

    // Load STL
    const loader = new STLLoader()
    loader.load(
      modelUrl,
      (geometry: BufferGeometry) => {
        // Create a mesh with a simple Phong material
        const material = new THREE.MeshPhongMaterial({
          color: 0x6ca6cd,
          specular: 0x111111,
          shininess: 100,
          flatShading: false,
        })

        const mesh = new THREE.Mesh(geometry, material)

        // Center the geometry
        geometry.computeBoundingBox()
        if (geometry.boundingBox) {
          const boundingBox = geometry.boundingBox

          // Center
          const center = new THREE.Vector3()
          boundingBox.getCenter(center)
          mesh.position.set(-center.x, -center.y, -center.z)

          // Figure out how far camera should be
          const size = new THREE.Vector3()
          boundingBox.getSize(size)
          const maxDim = Math.max(size.x, size.y, size.z)
          const fov = camera.fov * (Math.PI / 180)
          let cameraDistance = Math.abs(maxDim / (2 * Math.tan(fov / 2)))

          // Extra margin
          cameraDistance *= 1.5
          camera.position.set(0, 0, cameraDistance)
          camera.lookAt(0, 0, 0)
          controls.target.set(0, 0, 0)
          controls.update()
        }

        scene.add(mesh)
        setLoading(false)

        // ADD OUTLINE / EDGES
        // 1. Create edges geometry from the same STL geometry
        const edgesGeometry = new THREE.EdgesGeometry(geometry)
        // 2. Give it a black line material
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
        // 3. Combine geometry + material into a LineSegments object
        const edgesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial)
        // 4. Position the edges the same as the mesh
        edgesMesh.position.copy(mesh.position)
        scene.add(edgesMesh)
      },
      undefined, // onProgress, optional
      (error: ErrorEvent) => {
        console.error("Error loading STL:", error)
        setLoading(false)
      },
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resizing
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
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild)
        }
      }
      controls.dispose()
      renderer.dispose()
    }
  }, [modelUrl, backgroundColor])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "600px",
          position: "relative",
          backgroundColor,
        }}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading 3D Model...</p>
          </div>
        </div>
      )}

      <Button onClick={resetView} className="absolute top-4 right-4 bg-background/80 hover:bg-background" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Reset View
      </Button>
    </div>
  )
}