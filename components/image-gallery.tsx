"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface ImageGalleryProps {
  images: { url: string; description: string }[]
  projectSlug?: string
}

export default function ImageGallery({ images, projectSlug }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    setIsLightboxOpen(true)

    // Track image view
    if (projectSlug) {
      trackEvent.imageView(projectSlug, index)
    }
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const goToPrevious = () => {
    if (selectedImage === null) return
    const newIndex = selectedImage === 0 ? images.length - 1 : selectedImage - 1
    setSelectedImage(newIndex)

    // Track image view
    if (projectSlug) {
      trackEvent.imageView(projectSlug, newIndex)
    }
  }

  const goToNext = () => {
    if (selectedImage === null) return
    const newIndex = selectedImage === images.length - 1 ? 0 : selectedImage + 1
    setSelectedImage(newIndex)

    // Track image view
    if (projectSlug) {
      trackEvent.imageView(projectSlug, newIndex)
    }
  }

  return (
    <div>
      {/* True CSS columns-based masonry layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid mb-4 rounded-lg overflow-hidden border cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="relative">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.description}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="p-3 text-base text-muted-foreground bg-background">{image.description}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent
          className="!max-w-none !w-[95vw] h-[95vh] !max-h-[95vh] p-0 gap-0 bg-black/95 backdrop-blur-sm border-none [&>button]:hidden"
          style={{ width: "95vw", maxWidth: "95vw" }}
        >
          {/* Dedicated header area for the close button */}
          <div className="w-full bg-black/60 py-3 px-4 flex justify-end sticky top-0 z-20">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 bg-black/40 rounded-full h-10 w-10 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center p-4 pt-2 h-full w-full" onClick={closeLightbox}>
            {selectedImage !== null && (
              <>
                <div className="relative w-full h-[75vh] flex justify-center items-center">
                  <img
                    src={images[selectedImage].url || "/placeholder.svg"}
                    alt={images[selectedImage].description}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <p
                  className="text-center text-white mt-4 max-w-4xl text-base sm:text-lg px-4 bg-black/60 py-3 rounded-lg backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  {images[selectedImage].description}
                </p>

                <div
                  className="flex justify-between w-full max-w-4xl mt-4 px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="bg-black/20 hover:bg-black/40 text-white border-white/20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-base text-white/80">
                    {selectedImage + 1} / {images.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="bg-black/20 hover:bg-black/40 text-white border-white/20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
