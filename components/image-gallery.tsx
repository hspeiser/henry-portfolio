"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageWithDescription {
  url: string
  description?: string
}

interface ImageGalleryProps {
  images: ImageWithDescription[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

  // Create portal element when component mounts
  useEffect(() => {
    // This ensures we're in the browser environment
    if (typeof document !== "undefined") {
      setPortalElement(document.body)
    }

    // Cleanup function
    return () => {
      setPortalElement(null)
    }
  }, [])

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
    // Prevent scrolling when modal is open
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden"
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Re-enable scrolling
    if (typeof document !== "undefined") {
      document.body.style.overflow = ""
    }
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return

      switch (e.key) {
        case "ArrowLeft":
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
          break
        case "ArrowRight":
          setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
          break
        case "Escape":
          closeModal()
          break
      }
    }

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isModalOpen, images.length])

  // Masonry gallery layout
  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="mb-4 break-inside-avoid">
            <div
              className="cursor-pointer rounded-lg overflow-hidden anduril-card gallery-item"
              onClick={() => openModal(index)}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={`${alt} - Image ${index + 1}`}
                className="w-full h-auto object-cover"
              />

              {/* Description shown on hover */}
              {image.description && (
                <div className="description-overlay">
                  <p className="text-sm uppercase tracking-wider text-white">{image.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal rendered directly to body via portal */}
      {isModalOpen &&
        portalElement &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
            onClick={closeModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close button */}
            <button
              className="absolute right-4 top-4 z-[10000] bg-black/80 hover:bg-black text-white p-2 rounded-full border border-white/30"
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
              style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 10000,
              }}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image container with navigation */}
            <div
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
              }}
            >
              {/* Previous button */}
              <button
                className="absolute left-4 z-[10000] bg-black/80 hover:bg-black text-white p-2 rounded-full border border-white/30"
                onClick={goToPrevious}
                style={{
                  position: "absolute",
                  left: "-60px",
                  zIndex: 10000,
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Image - much larger now */}
              <div>
                <img
                  src={images[currentIndex].url || "/placeholder.svg"}
                  alt={`${alt} - Image ${currentIndex + 1}`}
                  style={{
                    maxWidth: "80vw",
                    maxHeight: "70vh",
                    display: "block",
                  }}
                />

                {/* Description below the image - width matched to image */}
                {images[currentIndex].description && (
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      padding: "12px",
                      textAlign: "center",
                      marginTop: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <p className="text-sm text-white uppercase tracking-wider">{images[currentIndex].description}</p>
                  </div>
                )}
              </div>

              {/* Next button */}
              <button
                className="absolute right-4 z-[10000] bg-black/80 hover:bg-black text-white p-2 rounded-full border border-white/30"
                onClick={goToNext}
                style={{
                  position: "absolute",
                  right: "-60px",
                  zIndex: 10000,
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>,
          portalElement,
        )}
    </>
  )
}

