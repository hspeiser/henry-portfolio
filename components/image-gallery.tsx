"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <>
      {/* Masonry layout container */}
      {/*
         1) "columns-1 sm:columns-2 md:columns-3" 
            means:
              - 1 column on extra-small screens,
              - 2 columns on small/medium,
              - 3 columns on md+ screens.
         2) "gap-4" sets spacing between columns.
         3) Each item will use "break-inside-avoid" to prevent images from splitting.
      */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="mb-4 break-inside-avoid"
          >
            <div
              className="cursor-pointer rounded-lg overflow-hidden"
              onClick={() => openModal(index)}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={`${alt} - Image ${index + 1}`}
                className="w-full h-auto object-cover transition-transform hover:scale-105"
              />
            </div>
            {/* Description shown below the thumbnail */}
            {image.description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {image.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Modal for enlarged images */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white"
            onClick={closeModal}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>

          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Previous</span>
          </Button>

          {/* Enlarged image */}
          <div className="max-h-[80vh] max-w-[90vw] flex flex-col items-center justify-center">
            <img
              src={images[currentIndex].url || "/placeholder.svg"}
              alt={`${alt} - Image ${currentIndex + 1}`}
              className="max-h-[70vh] w-auto object-contain"
            />
            {images[currentIndex].description && (
              <p className="mt-4 text-sm text-gray-300 text-center max-w-[80%]">
                {images[currentIndex].description}
              </p>
            )}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </>
  )
}
