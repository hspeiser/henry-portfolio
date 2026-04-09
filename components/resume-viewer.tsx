"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Download, FileText } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface ResumeViewerProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
}

export default function ResumeViewer({ isOpen, onClose, pdfUrl }: ResumeViewerProps) {
  const [loading, setLoading] = useState(true)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = "Henry_Speiser_Resume.pdf"
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenNewTab = () => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-none !w-[95vw] h-[95vh] !max-h-[95vh] p-0 gap-0 bg-background border-border [&>button]:hidden"
        style={{ width: "95vw", maxWidth: "95vw" }}
      >
        <VisuallyHidden>
          <DialogTitle>Resume Viewer</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col h-full w-full">
          {/* Header with controls */}
          <div className="px-4 sm:px-6 py-3 flex justify-between items-center border-b shrink-0 bg-background">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Resume</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>

              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleOpenNewTab}>
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Open</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/80 hover:text-red-500 transition-colors"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 w-full overflow-auto bg-gray-100 relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  <p className="text-sm text-muted-foreground">Loading PDF...</p>
                </div>
              </div>
            )}
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              onLoad={() => setLoading(false)}
              title="Resume PDF"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
