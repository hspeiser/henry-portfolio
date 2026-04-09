import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const pdfUrl = "https://pub-23ed2f7e90c646778e7f318e43b4e788.r2.dev/public/[Resume] Henry Speiser.docx (4).pdf"

  try {
    // Fetch the PDF from Cloudflare R2 (server-side, no CORS issues)
    const response = await fetch(pdfUrl, {
      headers: {
        // Forward some headers if needed
        Accept: "application/pdf",
      },
    })

    if (!response.ok) {
      return new NextResponse(`Failed to fetch PDF: ${response.statusText}`, {
        status: response.status,
      })
    }

    // Get the PDF as an ArrayBuffer
    const buffer = await response.arrayBuffer()

    // Return the PDF with proper headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=Henry_Speiser_Resume.pdf",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error proxying PDF:", error)
    return new NextResponse(`Error proxying PDF: ${error instanceof Error ? error.message : "Unknown error"}`, {
      status: 500,
    })
  }
}
