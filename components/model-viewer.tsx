"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, RotateCw, ZoomIn, RotateCcw, AlertTriangle } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import dynamic from "next/dynamic"
import * as THREE from "three"

// Dynamically import the 3D components to avoid SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-[#111111] rounded-lg flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  ),
})

const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), { ssr: false })
const PerspectiveCamera = dynamic(() => import("@react-three/drei").then((mod) => mod.PerspectiveCamera), {
  ssr: false,
})
const Environment = dynamic(() => import("@react-three/drei").then((mod) => mod.Environment), { ssr: false })
const Center = dynamic(() => import("@react-three/drei").then((mod) => mod.Center), { ssr: false })
const Html = dynamic(() => import("@react-three/drei").then((mod) => mod.Html), { ssr: false })

// Fallback component for when 3D fails to load
function ModelViewerFallback({ modelUrl, projectSlug }: { modelUrl: string; projectSlug?: string }) {
  const handleDownload = () => {
    if (projectSlug) {
      trackEvent.modelView(projectSlug, modelUrl)
    }
    window.open(modelUrl, "_blank")
  }

  return (
    <div className="w-full aspect-video rounded-lg border bg-card flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">3D Viewer Unavailable</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        The 3D model viewer couldn't load in your browser. You can still download the model file to view it in your
        preferred 3D software.
      </p>
      <Button onClick={handleDownload} className="gap-2">
        <ZoomIn className="h-4 w-4" />
        Download 3D Model
      </Button>
    </div>
  )
}

// STL Loader Component
function STLModel({
  modelUrl,
  wireframe,
  onBoundsCalculated,
}: { modelUrl: string; wireframe: boolean; onBoundsCalculated?: (radius: number) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    // Function to parse STL file
    const loadSTL = async () => {
      try {
        // Fetch the STL file using proxy
        const response = await fetch(`/api/model-proxy?url=${encodeURIComponent(modelUrl)}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch STL file: ${response.statusText}`)
        }

        const arrayBuffer = await response.arrayBuffer()
        const dataView = new DataView(arrayBuffer)

        // Check if it's binary STL (starts with 80-byte header, then 4-byte triangle count)
        const isBinary = arrayBuffer.byteLength >= 84

        let geometry: THREE.BufferGeometry

        if (isBinary) {
          // Parse binary STL
          const triangleCount = dataView.getUint32(80, true)
          const vertexCount = triangleCount * 3

          const vertices = new Float32Array(vertexCount * 3)
          const normals = new Float32Array(vertexCount * 3)

          let offset = 84 // Skip header and triangle count

          for (let i = 0; i < triangleCount; i++) {
            // Read normal (3 floats)
            const nx = dataView.getFloat32(offset, true)
            const ny = dataView.getFloat32(offset + 4, true)
            const nz = dataView.getFloat32(offset + 8, true)
            offset += 12

            // Read 3 vertices (9 floats)
            for (let j = 0; j < 3; j++) {
              const vIndex = (i * 3 + j) * 3
              vertices[vIndex] = dataView.getFloat32(offset, true)
              vertices[vIndex + 1] = dataView.getFloat32(offset + 4, true)
              vertices[vIndex + 2] = dataView.getFloat32(offset + 8, true)
              offset += 12

              // Set normal for this vertex
              normals[vIndex] = nx
              normals[vIndex + 1] = ny
              normals[vIndex + 2] = nz
            }

            offset += 2 // Skip attribute byte count
          }

          geometry = new THREE.BufferGeometry()
          geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
          geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3))
        } else {
          // Parse ASCII STL (fallback)
          const text = new TextDecoder().decode(arrayBuffer)
          const vertices: number[] = []
          const normals: number[] = []

          const vertexPattern = /vertex\s+([-+]?[\d.eE]+)\s+([-+]?[\d.eE]+)\s+([-+]?[\d.eE]+)/g
          const normalPattern = /facet\s+normal\s+([-+]?[\d.eE]+)\s+([-+]?[\d.eE]+)\s+([-+]?[\d.eE]+)/g

          let normalMatch
          while ((normalMatch = normalPattern.exec(text)) !== null) {
            const nx = Number.parseFloat(normalMatch[1])
            const ny = Number.parseFloat(normalMatch[2])
            const nz = Number.parseFloat(normalMatch[3])

            // Each facet has 3 vertices with the same normal
            for (let i = 0; i < 3; i++) {
              normals.push(nx, ny, nz)
            }
          }

          let vertexMatch
          while ((vertexMatch = vertexPattern.exec(text)) !== null) {
            vertices.push(
              Number.parseFloat(vertexMatch[1]),
              Number.parseFloat(vertexMatch[2]),
              Number.parseFloat(vertexMatch[3]),
            )
          }

          geometry = new THREE.BufferGeometry()
          geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
          geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3))
        }

        // Compute bounding sphere for proper camera positioning
        geometry.computeBoundingSphere()

        // Notify parent of the model's size
        if (geometry.boundingSphere && onBoundsCalculated) {
          onBoundsCalculated(geometry.boundingSphere.radius)
        }

        if (isMounted) {
          setGeometry(geometry)
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Error loading STL:", err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load STL file")
          setIsLoading(false)
        }
      }
    }

    loadSTL()

    return () => {
      isMounted = false
      if (geometry) {
        geometry.dispose()
      }
    }
  }, [modelUrl])

  if (error) {
    return (
      <Html center>
        <div className="bg-black/80 text-white p-4 rounded text-center max-w-xs">
          <p className="mb-2">{error}</p>
          <button className="px-3 py-1 bg-primary text-white rounded text-sm" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </Html>
    )
  }

  if (isLoading || !geometry) {
    return (
      <Html center>
        <div className="bg-black/80 text-white p-4 rounded-lg text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p>Loading 3D model...</p>
        </div>
      </Html>
    )
  }

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial
        color={wireframe ? "white" : "#3f88c5"}
        wireframe={wireframe}
        side={THREE.DoubleSide}
        flatShading={!wireframe}
      />
    </mesh>
  )
}

interface ModelViewerProps {
  modelUrl: string
  projectSlug?: string
}

export default function ModelViewer({ modelUrl, projectSlug }: ModelViewerProps) {
  const [wireframe, setWireframe] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasTrackedView, setHasTrackedView] = useState(false)
  const [modelRadius, setModelRadius] = useState<number>(5)

  useEffect(() => {
    setIsClient(true)

    // Track model view (only once per model)
    if (!hasTrackedView && projectSlug) {
      trackEvent.modelView(projectSlug, modelUrl)
      setHasTrackedView(true)
    }
  }, [modelUrl, projectSlug, hasTrackedView])

  // Function to reset camera position
  const handleReset = () => {
    setResetKey((prev) => prev + 1)
  }

  // If not client-side or has error, show fallback
  if (!isClient || hasError) {
    return <ModelViewerFallback modelUrl={modelUrl} projectSlug={projectSlug} />
  }

  const cameraDistance = modelRadius * 2.5 // 2.5x the model radius for good framing

  return (
    <div className="flex flex-col">
      <div className="w-full aspect-video rounded-lg overflow-hidden border bg-[#111111] relative">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          }
        >
          <Canvas
            key={resetKey}
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, cameraDistance], fov: 50 }}
            onError={() => setHasError(true)}
          >
            <PerspectiveCamera makeDefault position={[0, 0, cameraDistance]} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* STL Model */}
            <Center>
              <STLModel modelUrl={modelUrl} wireframe={wireframe} onBoundsCalculated={setModelRadius} />
            </Center>

            {/* Environment and controls */}
            <Environment preset="studio" />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={modelRadius * 0.5}
              maxDistance={modelRadius * 10}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
              makeDefault
            />
          </Canvas>
        </Suspense>

        {/* Overlay instructions */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-center pointer-events-none">
          <div className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            Drag to rotate • Scroll to zoom • Shift+drag to pan
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent" onClick={handleReset}>
          <RotateCw className="h-4 w-4" />
          <span>Reset View</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-transparent"
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? (
            <>
              <RotateCcw className="h-4 w-4" />
              <span>Stop Rotation</span>
            </>
          ) : (
            <>
              <RotateCcw className="h-4 w-4" />
              <span>Auto Rotate</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-transparent"
          onClick={() => setWireframe(!wireframe)}
        >
          {wireframe ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span>Hide Wireframe</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Show Wireframe</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-transparent"
          onClick={() => window.open(modelUrl, "_blank")}
        >
          <ZoomIn className="h-4 w-4" />
          <span>Download Model</span>
        </Button>
      </div>
    </div>
  )
}
